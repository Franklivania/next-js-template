# Customization Guide

Complete guide to customizing the starter template for your project needs.

## 🎨 Theming

### Color Customization

#### Primary Colors

Update your brand colors in `src/app/globals.css`:

```css
@layer base {
  :root {
    /* Primary Brand Color */
    --primary: 240 5.9% 10%; /* Dark blue-gray */
    --primary-foreground: 0 0% 98%; /* Text on primary */

    /* Secondary Accent Color */
    --secondary: 280 100% 70%; /* Purple */
    --secondary-foreground: 0 0% 98%; /* Text on secondary */

    /* Background Colors */
    --background: 0 0% 100%; /* White */
    --foreground: 240 10% 3.9%; /* Dark text */

    /* Muted/Subtle Colors */
    --muted: 240 4.8% 95.9%; /* Light gray */
    --muted-foreground: 240 3.8% 46.1%; /* Muted text */

    /* Accent Colors */
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    /* Borders */
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;

    /* Rings (focus states) */
    --ring: 240 5.9% 10%;

    /* Radius */
    --radius: 0.5rem;
  }
}
```

#### Quick Color Presets

**Blue Theme:**

```css
:root {
  --primary: 221 83% 53%; /* Blue */
  --secondary: 142 71% 45%; /* Green */
}
```

**Red Theme:**

```css
:root {
  --primary: 0 72% 51%; /* Red */
  --secondary: 48 96% 53%; /* Yellow */
}
```

**Green Theme:**

```css
:root {
  --primary: 142 71% 45%; /* Green */
  --secondary: 262 83% 58%; /* Purple */
}
```

#### Using HSL Colors

Colors are defined in HSL (Hue, Saturation, Lightness):

```css
/* Format: hue saturation% lightness% */
--primary: 240 100% 50%;

/* Use in Tailwind */
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

#### Converting HEX to HSL

```javascript
// Utility to convert HEX to HSL
function hexToHSL(hex) {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse hex values
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

// Usage
hexToHSL("#3B82F6"); // Returns: "217 91% 60%"
```

---

### Dark Mode

Add dark mode support:

```css
@layer base {
  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;

    --ring: 240 4.9% 83.9%;
  }
}
```

Toggle dark mode:

```jsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return <Button onClick={toggleTheme}>{isDark ? "🌞" : "🌙"}</Button>;
}
```

---

### Typography

#### Change Font Family

Update `src/app/layout.js`:

```jsx
import { Inter, Roboto, Montserrat } from "next/font/google";

// Choose your font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Or multiple fonts
const heading = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
```

Use in `globals.css`:

```css
:root {
  --font-heading: var(--font-montserrat);
  --font-body: var(--font-inter);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
}

body {
  font-family: var(--font-body);
}
```

#### Custom Font Sizes

```css
:root {
  /* Base font size */
  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
  --text-5xl: 3rem; /* 48px */
}
```

---

## 🧩 Component Customization

### Button Variants

Add custom button variants in `src/components/ui/button.jsx`:

```jsx
const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border border-primary",
      ghost: "hover:bg-accent",

      // Add custom variants
      success: "bg-green-500 text-white hover:bg-green-600",
      danger: "bg-red-500 text-white hover:bg-red-600",
      warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    },
    size: {
      sm: "h-9 px-3",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8",

      // Add custom sizes
      xs: "h-7 px-2 text-xs",
      xl: "h-14 px-10 text-lg",
    },
  },
});
```

Usage:

```jsx
<Button variant="success">Success</Button>
<Button variant="danger" size="xl">Danger</Button>
```

### Card Styles

Customize card appearance:

```jsx
// src/components/ui/card.jsx
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      "hover:shadow-md transition-shadow", // Add hover effect
      className
    )}
    {...props}
  />
);
```

### Input Styles

```css
/* globals.css */
.input-custom {
  @apply border border-gray-300 rounded-md px-4 py-2;
  @apply focus:ring-2 focus:ring-primary focus:border-transparent;
  @apply transition-all duration-200;
}
```

---

## 📱 Responsive Design

### Breakpoints

Tailwind breakpoints are:

```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

Usage:

```jsx
<div
  className="
  text-sm sm:text-base md:text-lg lg:text-xl
  p-4 sm:p-6 md:p-8
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
"
>
  Responsive content
</div>
```

### Custom Breakpoints

Add in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
  },
};
```

### Mobile-First Design

```jsx
// Default styles for mobile, override for larger screens
<div
  className="
  flex-col        // Mobile: stack vertically
  md:flex-row     // Tablet+: horizontal layout
  
  space-y-4       // Mobile: vertical spacing
  md:space-y-0    // Tablet+: no vertical spacing
  md:space-x-4    // Tablet+: horizontal spacing
"
>
  <div>Content 1</div>
  <div>Content 2</div>
</div>
```

---

## 🎯 Layout Customization

### Container Width

```css
/* globals.css */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Or custom widths */
.container-narrow {
  @apply max-w-4xl mx-auto px-4;
}

.container-wide {
  @apply max-w-[120rem] mx-auto px-4;
}
```

### Page Layouts

```jsx
// src/components/layouts/PageLayout.jsx
export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">{children}</main>
      <Footer />
    </div>
  );
}
```

Use in pages:

```jsx
import PageLayout from "@/components/layouts/PageLayout";

export default function Page() {
  return (
    <PageLayout>
      <h1>Page Content</h1>
    </PageLayout>
  );
}
```

---

## 🎨 Animation Customization

### Framer Motion

```jsx
"use client";
import { motion } from "motion/react";

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Slide in
<motion.div
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Scale
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>
```

### CSS Animations

```css
/* globals.css */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}
```

---

## 🔧 Configuration Files

### Next.js Config

```javascript
// next.config.mjs
const nextConfig = {
  // Images
  images: {
    domains: ["your-domain.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
      },
    ],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },

  // Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          // ... more shades
          900: "#0c4a6e",
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
```

---

## 📦 Adding New Components

### Create Component Template

```jsx
// src/components/ui/my-component.jsx
"use client";
import { cn } from "@/lib/utils";

export function MyComponent({ className, children, ...props }) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
}
```

### With Variants

```jsx
import { cva } from "class-variance-authority";

const myComponentVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
    },
    size: {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export function MyComponent({ className, variant, size, ...props }) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

---

## 🚀 Performance Optimization

### Image Optimization

```jsx
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // Load immediately
  placeholder="blur" // Blur placeholder
  quality={90} // Image quality (default: 75)
/>;
```

### Code Splitting

```jsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading...</p>,
});
```

### Lazy Loading

```jsx
"use client";
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("@/components/MyComponent"));

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## 📖 Additional Resources

- [Setup Guide](./SETUP-GUIDE.md)
- [Components Documentation](./COMPONENTS.md)
- [State Management](./STATE-MANAGEMENT.md)
- [Utilities Documentation](./UTILITIES.md)

---

**Happy Customizing! 🎨**
