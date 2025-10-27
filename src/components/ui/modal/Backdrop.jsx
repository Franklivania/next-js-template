import { useEffect, useState } from "react";

export default function Backdrop({ show, onClose }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setVisible(false), 200);
      // Restore body scroll when modal is closed
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  // Don't render anything if not visible
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen transition-all duration-300 ease-in-out z-[99]
        ${show ? "bg-black/50 backdrop-blur-sm" : "bg-transparent backdrop-blur-none"}
      `}
      onClick={onClose}
    />
  );
}
