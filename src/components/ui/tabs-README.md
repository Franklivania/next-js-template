### Tabs UI – Variants, Colors, and Persistence

This component is a thin wrapper around `@radix-ui/react-tabs` with styling variants, color themes, and optional URL query param persistence for the active tab.

Exports:

- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

Props (Tabs):

- `variant` ("enclosed" | "underline") – visual style. Default: `"enclosed"`.
- `color` ("primary" | "secondary" | "accent" | "destructive") – color theme. Default: `"primary"`.
- `persistParam?: string` – query parameter key used to persist the selected tab in the URL.
- `defaultValue?: string` – default tab value (uncontrolled).
- `value?: string` – active tab value (controlled).
- `onValueChange?: (value: string) => void` – change handler.
- plus all native `TabsPrimitive.Root` props.

Notes:

- If `persistParam` is provided, the component will read the initial value from the URL and keep it in sync on tab changes.
- Controlled vs uncontrolled both work with persistence.

---

### Quick Start (Uncontrolled, Enclosed, Primary)

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Example() {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="sale">On Sale</TabsTrigger>
      </TabsList>

      <TabsContent value="all">All content</TabsContent>
      <TabsContent value="new">New content</TabsContent>
      <TabsContent value="sale">Sale content</TabsContent>
    </Tabs>
  );
}
```

### Underline Variant

```jsx
<Tabs defaultValue="specs" variant="underline">
  <TabsList>
    <TabsTrigger value="specs">Specs</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
    <TabsTrigger value="faq">FAQ</TabsTrigger>
  </TabsList>

  <TabsContent value="specs">Specs</TabsContent>
  <TabsContent value="reviews">Reviews</TabsContent>
  <TabsContent value="faq">FAQ</TabsContent>
</Tabs>
```

### Color Themes (Enclosed or Underline)

```jsx
// Secondary (enclosed)
<Tabs defaultValue="one" color="secondary">
  <TabsList>
    <TabsTrigger value="one">One</TabsTrigger>
    <TabsTrigger value="two">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="one">Content one</TabsContent>
  <TabsContent value="two">Content two</TabsContent>
</Tabs>

// Accent (underline)
<Tabs defaultValue="a" variant="underline" color="accent">
  <TabsList>
    <TabsTrigger value="a">A</TabsTrigger>
    <TabsTrigger value="b">B</TabsTrigger>
  </TabsList>
  <TabsContent value="a">A content</TabsContent>
  <TabsContent value="b">B content</TabsContent>
</Tabs>

// Destructive (underline)
<Tabs defaultValue="warn" variant="underline" color="destructive">
  <TabsList>
    <TabsTrigger value="warn">Warnings</TabsTrigger>
    <TabsTrigger value="err">Errors</TabsTrigger>
  </TabsList>
  <TabsContent value="warn">Warnings</TabsContent>
  <TabsContent value="err">Errors</TabsContent>
</Tabs>
```

### Controlled Mode

```jsx
function ControlledTabs() {
  const [tab, setTab] = React.useState("details");
  return (
    <Tabs value={tab} onValueChange={setTab} variant="enclosed" color="primary">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>
      <TabsContent value="details">Details content</TabsContent>
      <TabsContent value="shipping">Shipping content</TabsContent>
    </Tabs>
  );
}
```

### URL Persistence (Soft-add to params)

When `persistParam` is provided, the active tab is written to the URL query string and read on mount.

```jsx
// Persists to ?tab=specs | ?tab=reviews, etc.
<Tabs defaultValue="specs" persistParam="tab" variant="underline">
  <TabsList>
    <TabsTrigger value="specs">Specs</TabsTrigger>
    <TabsTrigger value="reviews">Reviews</TabsTrigger>
  </TabsList>
  <TabsContent value="specs">Specs content</TabsContent>
  <TabsContent value="reviews">Reviews content</TabsContent>
</Tabs>
```

Behavior:

- On initial render, if `persistParam` exists in the URL, that value is used.
- On change, the query is updated non-destructively via `router.replace`, preserving other params and avoiding scroll/jump.

### Mixed Scenarios

```jsx
// Underline + Secondary + persisted
<Tabs
  defaultValue="overview"
  variant="underline"
  color="secondary"
  persistParam="section"
>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="features">Features</TabsTrigger>
    <TabsTrigger value="pricing">Pricing</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="features">...</TabsContent>
  <TabsContent value="pricing">...</TabsContent>
</Tabs>;

// Controlled + Accent
function ProductTabs({ initial = "desc" }) {
  const [t, setT] = React.useState(initial);
  return (
    <Tabs value={t} onValueChange={setT} color="accent">
      <TabsList>
        <TabsTrigger value="desc">Description</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
        <TabsTrigger value="care">Care</TabsTrigger>
      </TabsList>
      <TabsContent value="desc">Description</TabsContent>
      <TabsContent value="tech">Tech</TabsContent>
      <TabsContent value="care">Care</TabsContent>
    </Tabs>
  );
}
```

### Accessibility

- Inherits a11y from Radix Tabs.
- Keyboard navigation: left/right arrows switch tabs, Home/End jump to first/last.
- `TabsTrigger` should use clear, descriptive labels.

### Styling Notes

- Enclosed: active trigger uses background and foreground color treatment.
- Underline: renders a bottom border highlight on active tab.
- Colors map to your Tailwind theme tokens: `primary`, `secondary`, `accent`, `destructive`.

### API Surface Reference

- `variant`: visual structure only; content/layout unchanged.
- `color`: determines text/border/background tokens for the active state.
- `persistParam`: if set, reads/writes active tab from/to the URL.
- Works in both controlled and uncontrolled modes.

### Troubleshooting

- No tab selected: ensure `defaultValue` or `value` matches a `TabsTrigger`/`TabsContent` `value`.
- URL not updating: verify `persistParam` is set and component runs on the client (it is `"use client"`).
- Color not applying: confirm Tailwind tokens exist in your design system.
