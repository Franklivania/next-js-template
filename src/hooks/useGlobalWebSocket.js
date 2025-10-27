"use client";
import websocket_services from "@/services/websocket_services";
import { useEffect, useState, useCallback, useRef } from "react";
import { useBusiness } from "@/hooks/useBusiness";

// Helper to log only in development
const devLog = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};
const devWarn = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(...args);
  }
};
const devError = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.error(...args);
  }
};

// Global WebSocket hook that maintains a single connection instance
export const useGlobalWebSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const lastSessionIdRef = useRef(null);
  const { currentUser } = useBusiness();

  useEffect(() => {
    const unsubscribe = websocket_services.subscribe((event) => {
      devLog("WebSocket event received:", event);

      switch (event.type) {
        case "connection":
          setConnectionStatus(event.status);
          setIsConnecting(false);

          if (event.status === "disconnected") {
            setCurrentSessionId(null);
            setMessages([]); // Clear messages when disconnected
            setError(null);
          }
          break;

        case "connection_established":
          setConnectionStatus("connected");
          setCurrentSessionId(event.sessionId);
          setIsConnecting(false);
          setError(null);

          // Clear messages when connecting to a new session
          if (lastSessionIdRef.current !== event.sessionId) {
            setMessages([]);
            lastSessionIdRef.current = event.sessionId;
          }

          devLog(
            "Global WebSocket: Connection established for session:",
            event.sessionId
          );
          break;

        case "message":
          // Only add messages for the current session
          if (event.data) {
            const messageSessionId =
              event.data.session_id || event.data.session;

            if (!currentSessionId || messageSessionId === currentSessionId) {
              setMessages((prev) => {
                // Avoid duplicate messages
                const existingMessage = prev.find(
                  (msg) =>
                    msg.id === event.data.id ||
                    (msg.content === event.data.content &&
                      Math.abs(
                        new Date(msg.timestamp) - new Date(event.data.timestamp)
                      ) < 1000)
                );

                if (existingMessage) {
                  return prev;
                }

                return [
                  ...prev,
                  {
                    ...event.data,
                    id: event.data.id || `ws-${Date.now()}-${Math.random()}`,
                    timestamp: event.data.timestamp || new Date().toISOString(),
                  },
                ];
              });
            }
          }
          break;

        case "error":
          setError(event.error?.message || "WebSocket connection error");
          setIsConnecting(false);
          break;

        default:
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentSessionId]);

  const connectToSession = useCallback(async (sessionId, token) => {
    if (!sessionId || !token) {
      devError("Cannot connect: missing sessionId or token");
      setError("Missing session ID or authentication token");
      return;
    }

    devLog("Global WebSocket: Attempting to connect to session:", sessionId);
    setIsConnecting(true);
    setError(null);

    try {
      await websocket_services.connect(sessionId, token);
      devLog("Global WebSocket: Successfully connected to session:", sessionId);
    } catch (error) {
      devError("Global WebSocket: Failed to connect:", error);
      setError(error.message || "Failed to connect to chat session");
      setIsConnecting(false);
    }
  }, []);

  const sendTextMessage = useCallback((content) => {
    if (!content || !content.trim()) {
      devWarn("Cannot send empty message");
      return false;
    }

    const success = websocket_services.sendMessage({
      type: "text",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    });

    if (!success) {
      setError("Failed to send message: WebSocket not connected");
    }

    return success;
  }, []);

  const sendFileMessage = useCallback((fileUrl, fileName, isAudio = false) => {
    if (!fileUrl) {
      devWarn("Cannot send file message: missing file URL");
      return false;
    }

    const success = websocket_services.sendMessage({
      type: "file",
      file: fileUrl,
      file_name: fileName,
      is_audio: isAudio,
      timestamp: new Date().toISOString(),
    });

    if (!success) {
      setError("Failed to send file: WebSocket not connected");
    }

    return success;
  }, []);

  const disconnect = useCallback(async () => {
    devLog("Global WebSocket: Disconnecting...");
    setIsConnecting(false);
    await websocket_services.disconnect();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);
  // Function to add optimistic message (called from chat-input)
  const addOptimisticMessage = useCallback(
    (messageData) => {
      const tempId = `temp-${Date.now()}-${Math.random()}`;
      const optimisticMessage = {
        id: tempId,
        ...messageData,
        timestamp: messageData.timestamp || new Date().toISOString(),
        from_agent: currentUser,
        messageStatus: "sending", // Single tick
        tempId: tempId,
      };

      setMessages((prev) => [...prev, optimisticMessage]);
      return tempId;
    },
    [currentUser]
  );

  // Function to remove optimistic message (called when sending fails)
  const removeOptimisticMessage = useCallback((tempId) => {
    setMessages((prev) => prev.filter((msg) => msg.tempId !== tempId));
  }, []);

  return {
    connectionStatus,
    currentSessionId,
    messages,
    error,
    isConnecting,
    connectToSession,
    sendTextMessage,
    sendFileMessage,
    disconnect,
    clearError,
    clearMessages,
    addOptimisticMessage,
    removeOptimisticMessage,
  };
};
