# Setup Guide

Complete step-by-step guide to set up your project using this starter template.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- Basic knowledge of React and Next.js
- Code editor (VS Code recommended)

## 🚀 Quick Setup (5 Minutes)

### Method 1: Use Template Directly (Recommended)

This method gives you a complete, ready-to-use project instantly.

#### Step 1: Create Your Project

**Using degit (Recommended - Clean Copy):**

```bash
# Creates standalone copy without git history
npx degit yourusername/nextjs-starter-template my-project
cd my-project
```

**Or using git clone:**

```bash
# Includes full git history
git clone https://github.com/yourusername/nextjs-starter-template my-project
cd my-project

# Remove connection to template repository
git remote remove origin
```

#### Step 2: Install Dependencies

```bash
npm install
# or: yarn install / pnpm install / bun install
```

#### Step 3: Initialize Git (if using degit)

```bash
git init
git add .
git commit -m "Initial commit from Next.js starter template"

# Add your own remote repository
git remote add origin https://github.com/yourusername/my-project
```

#### Step 4: Start Development

```bash
npm run dev
```

**Done!** Visit [http://localhost:3000](http://localhost:3000)

---

## 🔧 Method 2: Add to Existing Next.js Project

If you want to add template files to an existing Next.js project:

### Step 1: Create Next.js Project (if needed)

```bash
npx create-next-app@latest my-project
cd my-project
```

During setup, choose:

- ✅ TypeScript? **No** (or Yes if you prefer)
- ✅ ESLint? **Yes**
- ✅ Tailwind CSS? **Yes**
- ✅ `src/` directory? **Yes**
- ✅ App Router? **Yes**
- ✅ Customize import alias? **No** (use default @/\*)

### Step 2: Copy Template Files

```bash
# Copy all template files to your project
cp -r next-js-template/components src/
cp -r next-js-template/hooks src/
cp -r next-js-template/utils src/
cp -r next-js-template/store src/
cp -r next-js-template/lib src/
cp next-js-template/styles/globals.css src/app/globals.css

# Copy configuration files
cp next-js-template/config/components.json ./
cp next-js-template/config/jsconfig.json ./
cp next-js-template/config/next.config.mjs ./
cp next-js-template/config/postcss.config.mjs ./
cp next-js-template/config/eslint.config.mjs ./

# Copy documentation
cp -r next-js-template/docs ./
```

### Step 3: Install Dependencies

```bash
npm install
```

Or update your `package.json` with the template dependencies and run:

```bash
npm install
```

### Step 4: Update Root Layout

Replace `src/app/layout.js` with:

```jsx
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "My Awesome App",
  description: "Built with Next.js Starter Template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`w-full max-w-[120em] mx-auto h-full overflow-x-hidden ${poppins.variable} antialiased`}
      >
        <Toaster richColors closeButton position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
```

### Step 5: Test Your Setup

Create a test page `src/app/page.js`:

```jsx
"use client";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useCartStore } from "@/store/cartStore";

export default function Home() {
  const { totalItems } = useCartStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Typography.h1>Welcome to Your App</Typography.h1>
      <Typography.p className="mt-4">Cart Items: {totalItems}</Typography.p>
      <Button className="mt-8">Get Started</Button>
    </main>
  );
}
```

### Step 6: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

🎉 **You're all set!**

---

## 🎯 Recommended Approach

For most users, **Method 1 (Use Template Directly with degit)** is recommended because:

- ✅ **Fastest** - Everything is already configured
- ✅ **Clean** - No template git history
- ✅ **Standalone** - Your own independent project
- ✅ **Complete** - All files in correct locations
- ✅ **No manual copying** - Ready to use immediately

**Method 2** is useful only if you need to add components to an existing project.

---

## 🔧 Detailed Setup

### Manual Installation (Alternative)

If you prefer to install dependencies manually:

```bash
# Core dependencies
npm install next@15.5.3 react@19.1.0 react-dom@19.1.0

# UI dependencies
npm install @radix-ui/react-accordion @radix-ui/react-checkbox
npm install @radix-ui/react-collapsible @radix-ui/react-dialog
npm install @radix-ui/react-label @radix-ui/react-progress
npm install @radix-ui/react-radio-group @radix-ui/react-select
npm install @radix-ui/react-separator @radix-ui/react-slot
npm install @radix-ui/react-tabs @radix-ui/react-tooltip

# Utilities
npm install @iconify/react lucide-react
npm install class-variance-authority clsx tailwind-merge
npm install motion sonner zustand yup input-otp
npm install @tanstack/react-query react-cookie prop-types

# Dev dependencies
npm install -D tailwindcss@4 @tailwindcss/postcss
npm install -D eslint eslint-config-next eslint-config-prettier
npm install -D eslint-plugin-prettier prettier
npm install -D husky lint-staged tw-animate-css
```

---

## 🎨 Customization After Setup

### 1. Update Brand Colors

Edit `src/app/globals.css`:

```css
@layer base {
  :root {
    /* Update these with your brand colors */
    --primary: 240 5.9% 10%;
    --secondary: 280 100% 70%;
    --accent: 240 4.8% 95.9%;
    /* Add more colors as needed */
  }
}
```

### 2. Change Typography

Update `src/app/layout.js`:

```jsx
import { Inter, Roboto } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Use in body className: ${inter.variable}
```

### 3. Update Metadata

In `src/app/layout.js`:

```jsx
export const metadata = {
  title: "Your App Name",
  description: "Your app description",
  keywords: ["keyword1", "keyword2"],
  authors: [{ name: "Your Name" }],
};
```

### 4. Configure Path Aliases

Already configured in `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Use anywhere:

```jsx
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
```

---

## 📁 Project Structure

After setup, your project structure will be:

```
my-project/
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── reusables/         # Custom components
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── store/                 # Zustand stores
│   └── lib/                   # Library utilities
├── public/                    # Static assets
├── docs/                      # Documentation
├── components.json            # shadcn config
├── jsconfig.json             # JavaScript config
├── next.config.mjs           # Next.js config
├── package.json              # Dependencies
└── tailwind.config.js        # Tailwind config
```

---

## 🎯 Next Steps

### 1. Create Your First Page

```bash
# Create new route
mkdir -p src/app/about
touch src/app/about/page.js
```

```jsx
// src/app/about/page.js
import { Typography } from "@/components/ui/typography";

export default function About() {
  return (
    <main className="container mx-auto p-8">
      <Typography.h1>About Us</Typography.h1>
      <Typography.p className="mt-4">Your content here...</Typography.p>
    </main>
  );
}
```

### 2. Add Navigation

```jsx
// src/components/Navigation.jsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="flex gap-4 p-4">
      <Link href="/">
        <Button variant="ghost">Home</Button>
      </Link>
      <Link href="/about">
        <Button variant="ghost">About</Button>
      </Link>
    </nav>
  );
}
```

Add to layout:

```jsx
// src/app/layout.js
import Navigation from "@/components/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

### 3. Use Components

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

<Button>Click me</Button>
<Card>
  <CardContent>
    <Input placeholder="Enter text" />
  </CardContent>
</Card>
```

### 4. Implement Cart

```jsx
"use client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

export default function Product({ product }) {
  const { addItem, totalItems } = useCartStore();

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <Button onClick={() => addItem(product, 1)}>
        Add to Cart ({totalItems})
      </Button>
    </div>
  );
}
```

---

## 🐛 Troubleshooting

### Issue: Components not found

**Solution:** Ensure path aliases are set up correctly in `jsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Tailwind styles not working

**Solution:** Verify `tailwind.config.js` includes all paths:

```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  // ...
};
```

### Issue: Fonts not loading

**Solution:** Ensure Poppins is imported in `layout.js` and the variable is applied to body.

### Issue: Store not persisting

**Solution:** Check that `persist` is enabled in store creation:

```javascript
export const useCartStore = createCartStore({
  storeName: "my-cart",
  persist: true, // Enable persistence
});
```

---

## 🔒 Environment Variables

Create `.env.local` for environment variables:

```bash
# API Keys
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_API_KEY=your_api_key

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Private variables (not accessible in browser)
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
```

Use in code:

```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 🤝 Need Help?

- Check [Components Documentation](./COMPONENTS.md)
- Review [Hooks Documentation](./HOOKS.md)
- Read [State Management Guide](./STATE-MANAGEMENT.md)
- See [Utilities Documentation](./UTILITIES.md)

---

**Happy Building! 🚀**
