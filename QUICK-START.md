# ⚡ Quick Start Guide

Get your Next.js project running in **5 minutes**!

## 🚀 Four Simple Steps

### 1️⃣ Create Project

**Using degit (Recommended - Clean Copy):**

```bash
npx degit yourusername/nextjs-starter-template my-project
cd my-project
```

**Or using git clone (Includes History):**

```bash
git clone https://github.com/yourusername/nextjs-starter-template my-project
cd my-project
git remote remove origin  # Remove link to template
```

### 2️⃣ Install

```bash
npm install
# or: yarn install / pnpm install / bun install
```

### 3️⃣ Initialize Git (if using degit)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 4️⃣ Run

```bash
npm run dev
```

**That's it!** Visit [http://localhost:3000](http://localhost:3000)

---

## 💡 What is degit?

`degit` creates a copy of a git repository without the full git history. This gives you:

- ✅ **Clean start** - No template's git history
- ✅ **Standalone project** - Not affiliated with original repo
- ✅ **Faster** - Smaller download size
- ✅ **Your own repository** - Start fresh with your own commits

No installation needed - just use `npx degit`!

## 🎨 First Customization (Optional)

### Change Brand Colors

Edit `src/app/globals.css`:

```css
:root {
  --primary: 221 83% 53%; /* Blue */
  --secondary: 142 71% 45%; /* Green */
}
```

### Update Site Info

Edit `src/app/layout.js`:

```jsx
export const metadata = {
  title: "My Awesome App",
  description: "My app description",
};
```

## 📝 Your First Page

Edit `src/app/page.js`:

```jsx
export default function Home() {
  return (
    <main className="p-24">
      <h1>Hello World!</h1>
    </main>
  );
}
```

## 🧩 Use Components

```jsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

<Button>Click Me</Button>
<Card>Card Content</Card>
```

## 📖 See Examples

Visit [http://localhost:3000/examples](http://localhost:3000/examples) to see all components in action!

## 🎯 Next Steps

1. ✅ Browse `/examples` to see components
2. ✅ Read [README.md](./README.md) for full docs
3. ✅ Check [docs/](./docs/) for guides
4. ✅ Start building your app!

## ❓ Issues?

### Port Already in Use?

```bash
npm run dev -- -p 3001
```

### Dependencies Error?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Import Errors?

- Check you're using `@/` for imports
- Restart dev server

---

**Start Building! 🚀**

For detailed documentation, see [README.md](./README.md)
