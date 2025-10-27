# Next.js Starter Template

A modern, production-ready Next.js starter template with **shadcn/ui** components, **Tailwind CSS**, and everything you need to start building immediately. Just clone and start coding!

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)
![License](https://img.shields.io/badge/license-MIT-green)

## ⚡ Quick Start

```bash
# Create standalone copy (recommended - no git history)
npx degit https://github.com/Franklivania/nextjs-starter-template my-project
cd my-project

# Install dependencies
npm install
# or: yarn install
# or: pnpm install
# or: bun install

# Initialize your own git repository
git init
git add .
git commit -m "Initial commit"

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - You're ready to build!

### Alternative: Using Git Clone

If you prefer to use git clone (includes full git history):

```bash
git clone https://github.com/Franklivania/nextjs-starter-template my-project
cd my-project

# Remove connection to original repository
git remote remove origin

# Add your own repository
git remote add origin https://github.com/yourusername/my-project

npm install
npm run dev
```

## ✨ What's Included

### 🧩 Components (20+)

- **Accordion** - Collapsible content sections
- **Button** - Multiple variants and sizes
- **Card** - Content containers
- **Checkbox** - Form checkboxes
- **Collapsible** - Expandable content
- **Input** - Text inputs
- **Input OTP** - OTP code input
- **Label** - Form labels
- **Modal/Dialog** - Modal system
- **Progress** - Progress indicators
- **Radio Group** - Radio buttons
- **Select** - Dropdown selects
- **Separator** - Visual dividers
- **Sheet** - Side panels
- **Sidebar** - Navigation sidebars
- **Skeleton** - Loading skeletons
- **Table** - Data tables
- **Tabs** - Tabbed interfaces
- **Textarea** - Multi-line inputs
- **Tooltip** - Contextual tooltips
- **Typography** - Text components

### 🪝 Custom Hooks (6)

- `useMobile` - Mobile device detection
- `useDeviceSize` - Responsive breakpoints
- `useClickOutside` - Click outside detection
- `useSearch` - Search with debouncing
- `useFilterSort` - Data filtering/sorting
- `useGlobalWebSocket` - WebSocket management

### 🛠️ Utilities

- Price/number formatting
- Search functions
- URL slugify
- Class name merging (cn)
- Render utilities

### 🎨 Styling

- **Tailwind CSS 4** - Latest version
- **CSS Variables** - Easy theming
- **Poppins Font** - All weights included
- **Responsive Typography** - Mobile-first
- **Dark Mode Ready** - Just add implementation

## 📁 Project Structure

```
your-project/
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Home page
│   │   ├── globals.css         # Global styles
│   │   └── examples/           # Component examples
│   │       └── page.js
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── reusables/          # Custom components
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   └── lib/                    # Library utilities
├── public/                     # Static assets
├── docs/                       # Documentation
├── components.json             # shadcn config
├── jsconfig.json              # Path aliases
├── next.config.mjs            # Next.js config
├── postcss.config.mjs         # PostCSS config
├── tailwind.config.js         # Tailwind config
└── package.json
```

## 🚀 Getting Started

### 1. Create Your Project

**Option A: Using degit (Recommended)**

Creates a clean copy without git history - perfect for starting fresh:

```bash
npx degit https://github.com/Franklivania/nextjs-starter-template my-project
cd my-project
```

**Option B: Using Git Clone**

Includes full git history:

```bash
git clone https://github.com/Franklivania/nextjs-starter-template my-project
cd my-project
git remote remove origin  # Remove connection to template repo
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Initialize Git (if using degit)

```bash
git init
git add .
git commit -m "Initial commit from Next.js starter template"

# Add your remote repository
git remote add origin https://github.com/yourusername/my-project
```

### 4. Start Development

```bash
npm run dev
```

### 5. Start Building!

Edit `src/app/page.js` and start creating your application. All components are ready to use!

## 📖 Usage Examples

### Using Components

```jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card content here</p>
        <Button>Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

### Using Hooks

```jsx
"use client";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function ResponsiveComponent() {
  const { isMobile, isTablet, isDesktop } = useDeviceSize();

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

### Using Typography

```jsx
import { Typography } from "@/components/ui/typography";

<Typography.h1>Main Heading</Typography.h1>
<Typography.h2>Subheading</Typography.h2>
<Typography.p>Paragraph text</Typography.p>
<Typography.lead>Lead paragraph</Typography.lead>
```

## 🎨 Customization

### Change Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: 221 83% 53%; /* Your primary color */
  --secondary: 142 71% 45%; /* Your secondary color */
  --accent: 240 4.8% 95.9%; /* Your accent color */
}
```

### Change Fonts

Edit `src/app/layout.js`:

```jsx
import { Inter, Roboto } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

### Add Dark Mode

```css
/* src/app/globals.css */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* Add more dark mode colors */
}
```

## 📚 Documentation

### Quick Links

- [Component Examples](/examples) - See all components in action
- [Full Documentation](./docs/INDEX.md) - Complete documentation
- [Setup Guide](./docs/SETUP-GUIDE.md) - Detailed setup
- [Customization Guide](./docs/CUSTOMIZATION.md) - Theming & styling
- [Component Reference](./docs/COMPONENTS.md) - All components
- [Hooks Reference](./docs/HOOKS.md) - All hooks

### Guides

- **[Quick Start](./QUICK-START.md)** - Get started in 5 minutes
- **[Folder Structure](./FOLDER-STRUCTURE.md)** - Understanding the layout
- **[Component Guide](./docs/COMPONENTS.md)** - Using components
- **[Customization](./docs/CUSTOMIZATION.md)** - Make it yours

## 🎯 Features

### ✅ Production Ready

- Built with Next.js 15 and React 19
- Server and Client Components
- App Router architecture
- Optimized for performance

### ✅ Beautiful UI

- 20+ shadcn/ui components
- Consistent design system
- Responsive layouts
- Smooth animations

### ✅ Developer Experience

- TypeScript ready
- Path aliases configured
- ESLint setup
- Hot module replacement

### ✅ Accessibility

- WCAG compliant components
- Keyboard navigation
- Screen reader support
- ARIA labels

### ✅ Responsive

- Mobile-first design
- Breakpoint hooks
- Adaptive layouts
- Touch-friendly

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📦 Tech Stack

- **Framework:** Next.js 15.5.3
- **React:** 19.1.0
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** Lucide React, Iconify
- **Animations:** Framer Motion
- **Notifications:** Sonner

## 🌟 Why This Template?

### Ready to Use

- Clone and start coding immediately
- No configuration needed
- Everything set up correctly

### Modern Stack

- Latest Next.js and React
- Modern best practices
- Production-ready code

### Comprehensive

- 20+ components included
- Custom hooks ready
- Utilities provided
- Full documentation

### Customizable

- Easy theming
- Component variants
- Extensible patterns

## 📝 Common Tasks

### Add a New Page

```bash
# Create new route folder
mkdir -p src/app/about

# Create page component
touch src/app/about/page.js
```

```jsx
// src/app/about/page.js
export default function About() {
  return <h1>About Page</h1>;
}
```

### Add a New Component

```jsx
// src/components/MyComponent.jsx
export default function MyComponent() {
  return <div>My Component</div>;
}
```

### Add New Utility

```jsx
// src/utils/myUtil.js
export function myUtility(input) {
  // Your utility logic
  return output;
}
```

## 🐛 Troubleshooting

### Components Not Found?

- Check path aliases in `jsconfig.json`
- Ensure using `@/` for imports
- Restart dev server

### Styles Not Working?

- Verify `globals.css` is imported in `layout.js`
- Check Tailwind config includes all paths
- Clear `.next` folder and rebuild

### Build Errors?

- Run `npm install` to ensure all dependencies
- Check Node.js version (18.17 or higher)
- Review error messages in terminal

## 🤝 Contributing

Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - Free for personal and commercial use!

## 🙏 Credits

Built with:

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

## 💬 Support

- 📖 [Read the Docs](./docs/INDEX.md)
- 🐛 [Report Issues](https://github.com/Franklivania/next-js-template/issues)
- 💡 [Request Features](https://github.com/Franklivania/next-js-template/issues)

---

**Made with ❤️ for developers who want to start building immediately**

**Star ⭐ this repo if you find it helpful!**
