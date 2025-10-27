# 📚 Documentation Index

Complete guide to all documentation files in the starter template.

## 🚀 Getting Started

### [Quick Start](../QUICK-START.md)

⚡ Get up and running in 5 minutes

- Quick installation steps
- First component example
- Common issues and fixes

### [Setup Guide](./SETUP-GUIDE.md)

📋 Detailed installation and configuration

- Prerequisites
- Step-by-step setup
- Configuration options
- Troubleshooting
- Environment variables

### [Folder Structure](../FOLDER-STRUCTURE.md)

📁 Understanding the project organization

- Directory layout
- File naming conventions
- Import paths
- Best practices

## 🧩 Core Features

### [Components Documentation](./COMPONENTS.md)

Complete reference for all UI components

- **UI Components** (20+ components)
  - Accordion, Button, Card, Checkbox
  - Input, Select, Modal, Table, Tabs
  - Typography, Tooltip, Progress, etc.
- **Reusable Components**
  - Navigation, Filters, Product Cards
  - Sliders, Headers
- Usage examples
- Props reference

### [Hooks Documentation](./HOOKS.md)

Custom React hooks for common functionality

- `useMobile` - Device detection
- `useDeviceSize` - Responsive breakpoints
- `useClickOutside` - Click detection
- `useSearch` - Search with debouncing
- `useFilterSort` - Data filtering
- `useGlobalWebSocket` - WebSocket management

### [State Management](./STATE-MANAGEMENT.md)

Zustand store patterns and usage

- **Toggle Store**
  - UI state management

### [Utilities Documentation](./UTILITIES.md)

Helper functions and utilities

- **Price Formatter** - Currency formatting (Naira)
- **Search Utility** - Advanced search with fuzzy matching
- **Slugify** - URL-friendly slug generation
- **Render Stars** - Star rating displays
- **cn** - Class name merging

## 🎨 Customization

### [Customization Guide](./CUSTOMIZATION.md)

Make the template your own

- **Theming**
  - Color customization
  - Dark mode
  - Typography changes
- **Components**
  - Custom variants
  - New components
  - Styling
- **Responsive Design**
  - Breakpoints
  - Mobile-first approach
- **Layouts**
  - Page layouts
  - Container widths
- **Animations**
  - Framer Motion
  - CSS animations
- **Performance**
  - Image optimization
  - Code splitting
  - Lazy loading

## 📖 Reference

### Main Documentation

| Document                                   | Description          | Topics                           |
| ------------------------------------------ | -------------------- | -------------------------------- |
| [README](../README.md)                     | Main documentation   | Overview, features, installation |
| [Quick Start](../QUICK-START.md)           | Fast setup guide     | 5-minute setup, first steps      |
| [Setup Guide](./SETUP-GUIDE.md)            | Detailed setup       | Prerequisites, configuration     |
| [Folder Structure](../FOLDER-STRUCTURE.md) | Project organization | Directory layout, conventions    |

### Feature Documentation

| Document                                  | Description       | Topics                         |
| ----------------------------------------- | ----------------- | ------------------------------ |
| [Components](./COMPONENTS.md)             | Component library | UI components, reusables       |
| [Hooks](./HOOKS.md)                       | Custom hooks      | Device detection, search, etc. |
| [State Management](./STATE-MANAGEMENT.md) | Zustand stores    | Cart, toggles, custom stores   |
| [Utilities](./UTILITIES.md)               | Helper functions  | Formatters, search, slugify    |
| [Customization](./CUSTOMIZATION.md)       | Theming & styling | Colors, fonts, animations      |

### Component-Specific READMEs

Located within component folders:

- `/components/ui/modal/README.md` - Modal system documentation
- `/components/ui/typography/README.md` - Typography component guide
- `/components/ui/tabs-README.md` - Tabs component documentation
- `/components/ui/dual-slider-README.md` - Slider documentation
- `/components/reusables/composable-sidenav-README.md` - Navigation docs
- `/components/reusables/slider-README.md` - Slider component guide

### Store Documentation

- `/store/README.md` - State management overview
- `/store/cart-readme.md` - Shopping cart detailed guide

### Utility Documentation

- `/utils/search-readme.md` - Search utility detailed guide

## 🎯 Quick Links by Task

### "I want to..."

#### Set up a new project

1. Run `npx degit yourusername/nextjs-starter-template my-project` (creates standalone copy)
2. Read [Quick Start](../QUICK-START.md) for full instructions
3. Follow [Setup Guide](./SETUP-GUIDE.md) if adding to existing project
4. Review [Folder Structure](../FOLDER-STRUCTURE.md)

#### Use components

1. Browse [Components Documentation](./COMPONENTS.md)
2. Check component-specific READMEs
3. See customization options in [Customization Guide](./CUSTOMIZATION.md)

#### Customize the design

1. Read [Customization Guide](./CUSTOMIZATION.md)
2. Update colors in `globals.css`
3. Modify components as needed

#### Add state management

1. Read [State Management](./STATE-MANAGEMENT.md)
2. Use cart store example
3. Create custom stores

#### Use hooks

1. Browse [Hooks Documentation](./HOOKS.md)
2. Import needed hooks
3. Follow usage examples

#### Use utilities

1. Check [Utilities Documentation](./UTILITIES.md)
2. Import utility functions
3. Apply to your code

#### Optimize performance

1. See Performance section in [Customization Guide](./CUSTOMIZATION.md)
2. Implement lazy loading
3. Optimize images

## 📱 Component Categories

### Form Components

- [Button](./COMPONENTS.md#button)
- [Input](./COMPONENTS.md#input)
- [Checkbox](./COMPONENTS.md#checkbox)
- [Radio Group](./COMPONENTS.md#radio-group)
- [Select](./COMPONENTS.md#select)
- [Textarea](./COMPONENTS.md#textarea)
- [Label](./COMPONENTS.md#label)
- [Input OTP](./COMPONENTS.md#input-otp)

### Layout Components

- [Card](./COMPONENTS.md#card)
- [Separator](./COMPONENTS.md#separator)
- [Sheet](./COMPONENTS.md#sheet)
- [Sidebar](./COMPONENTS.md#sidebar)

### Content Components

- [Typography](./COMPONENTS.md#typography)
- [Accordion](./COMPONENTS.md#accordion)
- [Collapsible](./COMPONENTS.md#collapsible)
- [Tabs](./COMPONENTS.md#tabs)

### Feedback Components

- [Modal](./COMPONENTS.md#modal-dialog)
- [Tooltip](./COMPONENTS.md#tooltip)
- [Progress](./COMPONENTS.md#progress)
- [Skeleton](./COMPONENTS.md#skeleton)

### Data Components

- [Table](./COMPONENTS.md#table)

### Custom Components

- [Product Card](./COMPONENTS.md#product-card)
- [Filter Sidebar](./COMPONENTS.md#filter-sidebar)
- [Composable Sidenav](./COMPONENTS.md#composable-sidenav)
- [Slider](./COMPONENTS.md#slider)

## 🔍 Search Documentation

### By Feature

| Feature           | Documentation                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------- |
| Shopping Cart     | [State Management](./STATE-MANAGEMENT.md#shopping-cart-store)                            |
| Search            | [Hooks](./HOOKS.md#usesearch), [Utilities](./UTILITIES.md#search-utility)                |
| Responsive Design | [Hooks](./HOOKS.md#usedevicesize), [Customization](./CUSTOMIZATION.md#responsive-design) |
| Forms             | [Components](./COMPONENTS.md) (Form section)                                             |
| Navigation        | [Components](./COMPONENTS.md#composable-sidenav)                                         |
| Theming           | [Customization](./CUSTOMIZATION.md#theming)                                              |
| Dark Mode         | [Customization](./CUSTOMIZATION.md#dark-mode)                                            |
| Performance       | [Customization](./CUSTOMIZATION.md#performance-optimization)                             |

### By Technology

| Technology    | Documentation                                               |
| ------------- | ----------------------------------------------------------- |
| Next.js       | [Setup Guide](./SETUP-GUIDE.md)                             |
| React         | [Components](./COMPONENTS.md), [Hooks](./HOOKS.md)          |
| Tailwind CSS  | [Customization](./CUSTOMIZATION.md)                         |
| Zustand       | [State Management](./STATE-MANAGEMENT.md)                   |
| shadcn/ui     | [Components](./COMPONENTS.md)                               |
| Framer Motion | [Customization](./CUSTOMIZATION.md#animation-customization) |

## 💡 Tips & Best Practices

### For Beginners

1. Start with [Quick Start](../QUICK-START.md)
2. Use components as-is first
3. Customize gradually
4. Follow examples in documentation

### For Experienced Developers

1. Review [Folder Structure](../FOLDER-STRUCTURE.md)
2. Customize [theme](./CUSTOMIZATION.md#theming) early
3. Create custom components following patterns
4. Extend stores for your use case

## 🆘 Getting Help

### Common Issues

- Check [Setup Guide](./SETUP-GUIDE.md#troubleshooting)
- Review [Quick Start](../QUICK-START.md#common-issues)
- Check component-specific README files

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Radix UI Documentation](https://www.radix-ui.com)

## 📝 Contributing to Docs

Found an issue or want to improve documentation?

1. Create clear, concise documentation
2. Include code examples
3. Add usage patterns
4. Keep consistent formatting

## 🔄 Version History

### v1.0.0 (Current)

- Initial template release
- 20+ UI components
- 7 custom hooks
- 5 utilities
- Complete documentation

---

## 📬 Quick Access

- **🚀 [Get Started](../QUICK-START.md)** - Begin your journey
- **📖 [Main README](../README.md)** - Overview and features
- **🧩 [Components](./COMPONENTS.md)** - Component library
- **🎨 [Customize](./CUSTOMIZATION.md)** - Make it yours
- **📁 [Structure](../FOLDER-STRUCTURE.md)** - Understand organization

---

**Happy coding! 🎉**
