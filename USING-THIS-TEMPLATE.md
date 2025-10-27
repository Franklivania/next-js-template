# 🚀 How to Use This Template

## ⚡ Quick Start (3 Commands)

```bash
npx degit yourusername/nextjs-starter-template my-project
cd my-project && npm install
npm run dev
```

**Done!** Visit [http://localhost:3000](http://localhost:3000)

---

## 📖 Complete Guide

### Step 1: Create Your Project

Choose your method:

#### Option A: degit (Recommended) ⭐

Creates a **clean, standalone copy** without git history:

```bash
npx degit yourusername/nextjs-starter-template my-project
cd my-project
```

**Why degit?**

- ✅ No template git history
- ✅ Completely standalone project
- ✅ Smaller download size
- ✅ Not affiliated with template repo
- ✅ Clean starting point

#### Option B: git clone

Includes full git history:

```bash
git clone https://github.com/Franklivania/nextjs-starter-template my-project
cd my-project

# IMPORTANT: Remove link to template repository
git remote remove origin
```

---

### Step 2: Install Dependencies

```bash
npm install
```

Or use your preferred package manager:

```bash
yarn install    # or
pnpm install    # or
bun install
```

---

### Step 3: Initialize Git (if using degit)

```bash
# Create your own git repository
git init

# Make your first commit
git add .
git commit -m "Initial commit from Next.js starter template"

# Add your remote repository (when ready)
git remote add origin https://github.com/yourusername/my-project
```

**Skip this step if you used git clone** - git is already initialized.

---

### Step 4: Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) - **You're ready to build!**

---

## 🎨 Customize Your Project

### 1. Update Brand Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: 221 83% 53%; /* Change to your primary color */
  --secondary: 142 71% 45%; /* Change to your secondary color */
}
```

### 2. Update Site Metadata

Edit `src/app/layout.js`:

```jsx
export const metadata = {
  title: "Your App Name",
  description: "Your app description",
};
```

### 3. Edit Home Page

Open `src/app/page.js` and start building!

---

## 📚 Next Steps

### Learn What's Included

- Visit `/examples` in your browser to see all components
- Read [README.md](./README.md) for complete overview
- Check [docs/COMPONENTS.md](./docs/COMPONENTS.md) for component reference

### Start Building

1. Edit `src/app/page.js` for your home page
2. Create new pages in `src/app/` directory
3. Use components from `@/components/ui/`
4. Add your custom components to `src/components/reusables/`

### Deploy Your App

```bash
npm run build    # Build for production
npm start        # Test production build locally
```

Then deploy to:

- Vercel (recommended for Next.js)
- Netlify
- Your own server

---

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 💡 Tips

### Import Components

```jsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

### Use Hooks

```jsx
import useDeviceSize from "@/hooks/useDeviceSize";
```

### Use Utilities

```jsx
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/price-formatter";
```

---

## ❓ Common Questions

### Q: Do I need to install degit?

**A:** No! Use `npx degit` - it runs without installation.

### Q: Can I use git clone instead?

**A:** Yes, but remember to run `git remote remove origin` to disconnect from the template repo.

### Q: How do I update to the latest template version?

**A:** This template creates a standalone project. To get updates, manually copy new components or features you want.

### Q: What if I get "Components not found" errors?

**A:** Check that you're using `@/` imports and that `jsconfig.json` is present with path aliases configured.

### Q: Can I use TypeScript?

**A:** Yes! Rename files from `.js` to `.tsx` and add type annotations. You may need to install TypeScript: `npm install -D typescript @types/react @types/node`

---

## 📖 Full Documentation

- [README.md](./README.md) - Complete overview
- [QUICK-START.md](./QUICK-START.md) - 5-minute setup
- [START-HERE.md](./START-HERE.md) - Quick navigation
- [docs/](./docs/) - Detailed documentation

---

## 🆘 Getting Help

### Issues with Setup

1. Check [QUICK-START.md](./QUICK-START.md) troubleshooting section
2. Verify Node.js version (18.17 or higher)
3. Delete `node_modules` and run `npm install` again

### Component Questions

- Read [docs/COMPONENTS.md](./docs/COMPONENTS.md)
- Check component-specific READMEs in `/src/components/ui/`

### Customization Help

- See [docs/CUSTOMIZATION.md](./docs/CUSTOMIZATION.md)

---

## ✨ What Makes This Different

### vs Regular Git Clone

```bash
# Regular git clone
git clone repo my-project
# ❌ Includes all template commits
# ❌ Connected to template repository
# ❌ Larger download

# Using degit
npx degit repo my-project
# ✅ Clean git history
# ✅ Standalone project
# ✅ Smaller download
```

---

## 🎉 You're All Set!

Your project is now:

- ✅ Completely standalone
- ✅ Not affiliated with template
- ✅ Ready for customization
- ✅ Production-ready
- ✅ Your own git repository

**Happy coding! 🚀**

---

**Quick Links:**

- [Examples](http://localhost:3000/examples) (after running dev server)
- [Components Documentation](./docs/COMPONENTS.md)
- [Customization Guide](./docs/CUSTOMIZATION.md)
- [Main README](./README.md)
