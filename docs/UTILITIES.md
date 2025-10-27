# Utilities Documentation

Guide to utility functions included in the starter template.

## 🛠️ Available Utilities

### Price Formatter

Format currency values in Nigerian Naira (NGN).

**Location:** `/utils/price-formatter.js`

#### Usage

```javascript
import { formatNaira } from "@/utils/price-formatter";

// Basic usage
formatNaira(5000); // "₦5,000"
formatNaira(15000.5); // "₦15,000.50"
formatNaira(1500000); // "₦1,500,000"

// With custom options
formatNaira(5000, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}); // "₦5,000.00"

// Handle invalid input
formatNaira(null); // ""
formatNaira("invalid"); // ""
formatNaira(NaN); // ""
```

#### Component Example

```jsx
import { formatNaira } from "@/utils/price-formatter";

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.title}</h3>
      <p className="text-xl font-bold">{formatNaira(product.price)}</p>
      {product.discount && (
        <p className="line-through text-gray-500">
          {formatNaira(product.originalPrice)}
        </p>
      )}
    </div>
  );
}
```

#### Custom Currency

Adapt for other currencies:

```javascript
export function formatUSD(amount, options = {}) {
  if (typeof amount !== "number" || isNaN(amount)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}
```

---

### Search Utility

Advanced search with fuzzy matching and debouncing.

**Location:** `/utils/search.js`

#### searchData Function

```javascript
import { searchData } from "@/utils/search";

const products = [
  { id: 1, title: "Laptop", description: "Gaming laptop", price: 50000 },
  { id: 2, title: "Mouse", description: "Wireless mouse", price: 5000 },
  {
    id: 3,
    title: "Keyboard",
    description: "Mechanical keyboard",
    price: 12000,
  },
];

// Basic search
const results = searchData(products, "laptop");
// Returns: [{ id: 1, title: "Laptop", ... }]

// Search multiple fields
const results = searchData(products, "gaming", {
  keys: {
    title: "title",
    description: "description",
  },
});

// Case-sensitive search
const results = searchData(products, "Laptop", {
  caseSensitive: true,
});

// Exact match only
const results = searchData(products, "laptop", {
  exactMatch: true,
});

// Search nested fields
const results = searchData(products, "electronics", {
  keys: {
    category: "metadata.category",
  },
});
```

#### Options

```typescript
{
  keys?: {
    [key: string]: string;  // Field mapping
  };
  caseSensitive?: boolean;   // Default: false
  exactMatch?: boolean;      // Default: false
}
```

#### Debounce Function

```javascript
import { debounce } from "@/utils/search";

// Create debounced function
const debouncedSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 300);

// Use in component
function SearchInput() {
  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return <input onChange={handleChange} />;
}
```

#### Complete Search Component

```jsx
"use client";
import { useState, useMemo, useCallback, useRef } from "react";
import { searchData, debounce } from "@/utils/search";

function SearchableList({ data }) {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  // Debounced query update
  const debouncedUpdateQuery = useRef(debounce((val) => setQuery(val), 300));

  const handleSearchChange = useCallback((e) => {
    const val = e.target.value;
    setSearchInput(val);
    debouncedUpdateQuery.current?.(val);
  }, []);

  // Search results
  const results = useMemo(() => {
    if (!query) return data;
    return searchData(data, query, {
      keys: {
        title: "title",
        description: "description",
      },
      caseSensitive: false,
    });
  }, [data, query]);

  return (
    <div>
      <input
        type="search"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <div>
        {results.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    </div>
  );
}
```

---

### Slugify

Convert strings to URL-friendly slugs.

**Location:** `/utils/slugify.js`

#### Usage

```javascript
import { slugify } from "@/utils/slugify";

// Basic usage
slugify("Hello World"); // "hello-world"
slugify("Product Name 123"); // "product-name-123"
slugify("Special @#$ Characters!"); // "special-characters"

// Use in navigation
const productSlug = slugify(product.title);
router.push(`/products/${productSlug}`);

// Create unique IDs
const id = slugify(user.name + "-" + Date.now());
```

#### Component Example

```jsx
import { slugify } from "@/utils/slugify";
import Link from "next/link";

function ProductLink({ product }) {
  const slug = slugify(product.title);

  return <Link href={`/products/${slug}`}>{product.title}</Link>;
}
```

#### Custom Slugify Options

```javascript
export function slugify(text, options = {}) {
  const { separator = "-", lowercase = true } = options;

  let slug = text.toString();

  if (lowercase) {
    slug = slug.toLowerCase();
  }

  slug = slug
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, separator)
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  return slug;
}
```

---

### Render Stars

Generate star rating displays.

**Location:** `/utils/render-stars.js`

#### Usage

```javascript
import { renderStars } from "@/utils/render-stars";

// Basic usage (returns array of star components)
const stars = renderStars(4.5);

// In component
function ProductRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {renderStars(rating)}
      <span className="ml-2">{rating.toFixed(1)}</span>
    </div>
  );
}
```

#### Customization

```jsx
// Custom star colors
export function renderStars(rating, maxStars = 5) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Icon
        key={`full-${i}`}
        icon="mdi:star"
        className="text-yellow-400"
        width={20}
        height={20}
      />
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <Icon
        key="half"
        icon="mdi:star-half-full"
        className="text-yellow-400"
        width={20}
        height={20}
      />
    );
  }

  // Empty stars
  const emptyStars = maxStars - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Icon
        key={`empty-${i}`}
        icon="mdi:star-outline"
        className="text-gray-300"
        width={20}
        height={20}
      />
    );
  }

  return stars;
}
```

---

## 🎨 Styling Utilities

### cn (Class Name Merge)

Merge Tailwind CSS classes efficiently.

**Location:** `/lib/utils.js`

#### Usage

```javascript
import { cn } from "@/lib/utils";

// Basic merge
cn("px-4 py-2", "bg-blue-500");
// "px-4 py-2 bg-blue-500"

// Conditional classes
cn("px-4 py-2", isActive && "bg-blue-500", isDisabled && "opacity-50");

// Override classes
cn("text-sm", "text-lg");
// "text-lg" (overrides text-sm)

// In component
function Button({ className, variant }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded",
        variant === "primary" && "bg-blue-500 text-white",
        variant === "outline" && "border border-blue-500",
        className
      )}
    >
      Button
    </button>
  );
}
```

---

## 🔧 Creating Custom Utilities

### Template for New Utilities

```javascript
/**
 * Utility description
 * @param {type} param - Parameter description
 * @returns {type} Return value description
 */
export function myUtility(param, options = {}) {
  // Validate input
  if (!param) {
    console.warn("Invalid input");
    return null;
  }

  // Apply options
  const { option1 = "default" } = options;

  // Implement logic
  const result = param + option1;

  return result;
}
```

### Example: Date Formatter

```javascript
/**
 * Format date to readable string
 * @param {Date|string|number} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  const { locale = "en-US", format = "long" } = options;

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const formats = {
    short: { month: "numeric", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
  };

  return new Intl.DateTimeFormat(locale, formats[format]).format(dateObj);
}
```

---

## 📖 Best Practices

### 1. Input Validation

Always validate inputs:

```javascript
export function myUtility(input) {
  // Validate
  if (typeof input !== "string") {
    console.warn("Expected string input");
    return "";
  }

  // Process
  return input.trim();
}
```

### 2. Default Values

Provide sensible defaults:

```javascript
export function myUtility(value, options = {}) {
  const { defaultOption = "default", anotherOption = true } = options;

  // Use options...
}
```

### 3. Documentation

Document your utilities:

```javascript
/**
 * Description of what the function does
 *
 * @param {string} param1 - Description of param1
 * @param {Object} options - Optional configuration
 * @param {boolean} options.option1 - Description of option1
 * @returns {string} Description of return value
 *
 * @example
 * myUtility("input", { option1: true });
 * // Returns: "output"
 */
export function myUtility(param1, options = {}) {
  // Implementation
}
```

### 4. Error Handling

Handle errors gracefully:

```javascript
export function myUtility(input) {
  try {
    // Process input
    return processedValue;
  } catch (error) {
    console.error("Error in myUtility:", error);
    return null;
  }
}
```

---

## 🔗 Related Documentation

- [Components Documentation](./COMPONENTS.md)
- [Hooks Documentation](./HOOKS.md)
