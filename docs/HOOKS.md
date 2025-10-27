# Custom Hooks Documentation

Complete guide to all custom React hooks included in the starter template.

## 📚 Available Hooks

### useMobile

Detects if the current device is mobile.

**Usage:**

```jsx
"use client";
import useMobile from "@/hooks/use-mobile";

function MyComponent() {
  const isMobile = useMobile();

  return <div>{isMobile ? <MobileView /> : <DesktopView />}</div>;
}
```

**Returns:**

- `boolean` - true if device width is <= 768px

**Features:**

- Responsive to window resize
- Uses `matchMedia` for better performance
- Automatically updates on screen size change

---

### useClickOutside

Detects clicks outside of a specified element.

**Usage:**

```jsx
"use client";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";

function Dropdown() {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown content</div>}
    </div>
  );
}
```

**Parameters:**

- `ref`: React ref object
- `callback`: Function to call when click outside is detected

**Use Cases:**

- Closing dropdowns
- Dismissing modals
- Hiding tooltips
- Closing context menus

---

### useDeviceSize

Comprehensive device size detection with breakpoints.

**Usage:**

```jsx
"use client";
import useDeviceSize from "@/hooks/useDeviceSize";

function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, width } =
    useDeviceSize();

  return (
    <div>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
      {isLargeDesktop && <LargeDesktopLayout />}
      <p>Current width: {width}px</p>
    </div>
  );
}
```

**Returns:**

```typescript
{
  isMobile: boolean; // width < 768px
  isTablet: boolean; // 768px <= width < 1024px
  isDesktop: boolean; // 1024px <= width < 1440px
  isLargeDesktop: boolean; // width >= 1440px
  width: number; // Current window width
}
```

**Breakpoints:**

- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large Desktop: >= 1440px

**Features:**

- Server-side rendering safe
- Debounced resize handler
- Real-time width tracking

---

### useFilterSort

Advanced filtering and sorting for data arrays.

**Usage:**

```jsx
"use client";
import useFilterSort from "@/hooks/useFilterSort";

function ProductList() {
  const {
    data,
    sortedData,
    filters,
    sortBy,
    setFilter,
    setSortBy,
    clearFilters,
  } = useFilterSort(products, {
    initialFilters: {
      category: "",
      priceRange: { min: 0, max: 10000 },
    },
    initialSortBy: "price",
  });

  return (
    <div>
      <button onClick={() => setFilter("category", "electronics")}>
        Electronics
      </button>
      <button onClick={() => setSortBy("price")}>Sort by Price</button>
      <button onClick={clearFilters}>Clear Filters</button>

      {sortedData.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </div>
  );
}
```

**Parameters:**

```typescript
useFilterSort(
  data: Array,
  options?: {
    initialFilters?: Object,
    initialSortBy?: string,
    sortOrder?: "asc" | "desc"
  }
)
```

**Returns:**

```typescript
{
  data: Array;              // Original data
  sortedData: Array;        // Filtered and sorted data
  filters: Object;          // Current filters
  sortBy: string;           // Current sort field
  sortOrder: string;        // "asc" | "desc"
  setFilter: (key, value) => void;
  setSortBy: (field) => void;
  toggleSortOrder: () => void;
  clearFilters: () => void;
}
```

---

### useGlobalWebSocket

WebSocket connection management.

**Usage:**

```jsx
"use client";
import useGlobalWebSocket from "@/hooks/useGlobalWebSocket";

function RealtimeComponent() {
  const { isConnected, lastMessage, sendMessage, connect, disconnect } =
    useGlobalWebSocket("wss://your-websocket-url");

  useEffect(() => {
    if (lastMessage) {
      console.log("Received:", lastMessage);
    }
  }, [lastMessage]);

  return (
    <div>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <button onClick={() => sendMessage({ type: "ping" })}>
        Send Message
      </button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

**Parameters:**

- `url`: string - WebSocket URL
- `options?`: Object - Connection options

**Returns:**

```typescript
{
  isConnected: boolean;
  lastMessage: any;
  error: Error | null;
  sendMessage: (data: any) => void;
  connect: () => void;
  disconnect: () => void;
}
```

**Features:**

- Automatic reconnection
- Message queue for offline messages
- Error handling
- Connection state management

---

### useSearch

Advanced search functionality with debouncing.

**Usage:**

```jsx
"use client";
import useSearch from "@/hooks/useSearch";

function SearchComponent() {
  const { query, results, isSearching, setQuery, clearSearch } = useSearch(
    products,
    {
      keys: ["title", "description"],
      debounceMs: 300,
    }
  );

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />

      {isSearching && <p>Searching...</p>}

      <div>
        {results.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>

      <button onClick={clearSearch}>Clear</button>
    </div>
  );
}
```

**Parameters:**

```typescript
useSearch(
  data: Array,
  options?: {
    keys?: string[];        // Fields to search in
    debounceMs?: number;    // Debounce delay (default: 300)
    caseSensitive?: boolean; // Case sensitive search
    exactMatch?: boolean;    // Exact match only
  }
)
```

**Returns:**

```typescript
{
  query: string;
  results: Array;
  isSearching: boolean;
  setQuery: (query: string) => void;
  clearSearch: () => void;
}
```

**Features:**

- Debounced search
- Multi-field search
- Case insensitive by default
- Fuzzy matching support

---

## 🎯 Hook Best Practices

### 1. Client Components

All hooks must be used in client components:

```jsx
"use client"; // Required!

import useDeviceSize from "@/hooks/useDeviceSize";

function MyComponent() {
  const { isMobile } = useDeviceSize();
  // ...
}
```

### 2. Cleanup

Hooks automatically cleanup on unmount. For manual cleanup:

```jsx
useEffect(() => {
  const { disconnect } = useGlobalWebSocket(url);

  return () => {
    disconnect();
  };
}, []);
```

### 3. Performance

Use hooks wisely to avoid unnecessary re-renders:

```jsx
// Good - Memoize callbacks
const handleClick = useCallback(() => {
  // ...
}, []);

// Good - Memoize values
const filteredData = useMemo(() => {
  return useFilterSort(data);
}, [data]);
```

### 4. Error Handling

Always handle potential errors:

```jsx
const { error } = useGlobalWebSocket(url);

useEffect(() => {
  if (error) {
    console.error("WebSocket error:", error);
    // Handle error
  }
}, [error]);
```

---

## 🔗 Related Documentation

- [Components Documentation](./COMPONENTS.md)
- [Utilities Documentation](./UTILITIES.md)
