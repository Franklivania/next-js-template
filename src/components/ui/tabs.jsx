"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const TabsContext = React.createContext({
  variant: "enclosed",
  color: "primary",
});

function Tabs({
  className,
  variant = "enclosed", // "enclosed" | "underline"
  color = "primary",
  // Backward compatible: `persistParam` still supported.
  // New API: set `persist` to true to enable persistence and optionally provide `persistKey` (defaults to "tab").
  persistParam,
  persist,
  persistKey,
  defaultValue,
  value,
  onValueChange,
  ...props
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isControlled = value !== undefined;
  // Resolve the persistence key
  const persistenceKey = React.useMemo(() => {
    if (persistParam) return persistParam; // legacy prop takes precedence if provided
    if (!persist) return undefined;
    return persistKey || "tab";
  }, [persistParam, persist, persistKey]);

  const persistedValue = React.useMemo(() => {
    if (!persistenceKey) return undefined;
    return searchParams?.get(persistenceKey) || undefined;
  }, [persistenceKey, searchParams]);

  const [internalValue, setInternalValue] = React.useState(
    persistedValue ?? defaultValue
  );

  // Keep internal in sync with external/control
  React.useEffect(() => {
    if (isControlled) return;
    if (persistedValue && persistedValue !== internalValue) {
      setInternalValue(persistedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedValue]);

  React.useEffect(() => {
    if (
      !isControlled &&
      defaultValue !== undefined &&
      internalValue === undefined
    ) {
      setInternalValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleChange = React.useCallback(
    (next) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
      if (persistenceKey) {
        const params = new URLSearchParams(searchParams?.toString());
        if (next) params.set(persistenceKey, next);
        else params.delete(persistenceKey);
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }
    },
    [
      isControlled,
      onValueChange,
      persistenceKey,
      router,
      pathname,
      searchParams,
    ]
  );

  const providedValue = isControlled ? value : internalValue;

  return (
    <TabsContext.Provider value={{ variant, color }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex flex-col gap-2", className)}
        value={providedValue}
        defaultValue={undefined}
        onValueChange={handleChange}
        {...props}
      />
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }) {
  const { variant } = React.useContext(TabsContext);
  const base =
    variant === "underline"
      ? "inline-flex h-10 w-fit items-center gap-1 border-b"
      : "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]";
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(base, className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  const { variant, color } = React.useContext(TabsContext);

  const colorStyles = {
    primary: {
      underline:
        "text-muted-foreground data-[state=active]:text-primary border-transparent data-[state=active]:border-primary",
      enclosed:
        "data-[state=active]:bg-background data-[state=active]:text-foreground",
    },
    secondary: {
      underline:
        "text-muted-foreground data-[state=active]:text-secondary border-transparent data-[state=active]:border-secondary",
      enclosed:
        "data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground",
    },
    accent: {
      underline:
        "text-muted-foreground data-[state=active]:text-accent-foreground border-none data-[state=active]:border-accent",
      enclosed:
        "data-[state=active]:bg-accent data-[state=active]:text-accent-foreground",
    },
    destructive: {
      underline:
        "text-muted-foreground data-[state=active]:text-destructive border-transparent data-[state=active]:border-destructive",
      enclosed:
        "data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive",
    },
  };

  const baseUnderline =
    "inline-flex h-10 flex-1 items-center justify-center gap-1.5 px-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-none";

  const baseEnclosed =
    "text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm";

  const variantClass = variant === "underline" ? baseUnderline : baseEnclosed;
  const colorClass = (colorStyles[color] || colorStyles.primary)[
    variant === "underline" ? "underline" : "enclosed"
  ];

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(variantClass, colorClass, className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
