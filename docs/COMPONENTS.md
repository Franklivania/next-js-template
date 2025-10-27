# Component Documentation

Complete guide to all components included in the starter template.

## 📦 UI Components

### Accordion

Expandable content sections with smooth animations.

```jsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>;
```

**Props:**

- `type`: "single" | "multiple"
- `collapsible`: boolean
- `defaultValue`: string

---

### Button

Versatile button component with multiple variants.

```jsx
import { Button } from "@/components/ui/button";

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔥</Button>

// Radius
<Button radius="xs">Extra Small</Button>
<Button radius="sm">Small</Button>
<Button radius="md">Medium</Button>
<Button radius="lg">Large</Button>
<Button radius="full">Full</Button>
```

**Props:**

- `variant`: "default" | "outline" | "ghost" | "link"
- `size`: "sm" | "default" | "lg" | "icon"
- `radius`: "xs" | "sm" | "md" | "lg" | "full"
- `asChild`: boolean

---

### Card

Container component for content grouping.

```jsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

---

### Checkbox

Accessible checkbox with label support.

```jsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox id="terms" />
<label htmlFor="terms">Accept terms and conditions</label>

// With controlled state
const [checked, setChecked] = useState(false);
<Checkbox checked={checked} onCheckedChange={setChecked} />
```

**Props:**

- `checked`: boolean
- `onCheckedChange`: (checked: boolean) => void
- `disabled`: boolean

---

### Input

Text input with validation support.

```jsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter your name" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />

// With label
<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

**Props:**

- `type`: string
- `placeholder`: string
- `disabled`: boolean
- All standard HTML input props

---

### Input OTP

One-Time Password input component.

```jsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>;
```

---

### Label

Form label component.

```jsx
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

---

### Modal (Dialog)

Modal dialog system with backdrop and animations.

```jsx
import { Modal, ModalHeader } from "@/components/ui/modal";

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
  <ModalHeader title="Modal Title" onClose={() => setIsOpen(false)} />
  <div className="p-6">Modal content goes here</div>
</Modal>;
```

**Props:**

- `isOpen`: boolean
- `onClose`: () => void
- `size`: "sm" | "md" | "lg" | "xl" | "full"
- `closeOnBackdropClick`: boolean (default: true)

---

### Progress

Progress indicator component.

```jsx
import { Progress } from "@/components/ui/progress";

<Progress value={60} />
<Progress value={100} className="bg-green-500" />
```

**Props:**

- `value`: number (0-100)

---

### Radio Group

Radio button group component.

```jsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>;
```

---

### Select

Dropdown select component.

```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>;
```

---

### Separator

Visual divider component.

```jsx
import { Separator } from "@/components/ui/separator";

<Separator />
<Separator orientation="vertical" />
```

---

### Sheet

Side panel/drawer component.

```jsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>Sheet description</SheetDescription>
    </SheetHeader>
    <div className="py-4">Sheet content goes here</div>
  </SheetContent>
</Sheet>;
```

**Props:**

- `side`: "top" | "right" | "bottom" | "left"

---

### Sidebar

Navigation sidebar component.

```jsx
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar>{/* Navigation items */}</Sidebar>
</SidebarProvider>;
```

---

### Skeleton

Loading skeleton component.

```jsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="w-full h-12" />
<Skeleton className="w-32 h-4" />

// Card skeleton
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-32 w-full" />
  </CardContent>
</Card>
```

---

### Table

Data table component with sorting and filtering.

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

---

### Tabs

Tabbed interface component.

```jsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="tab1" persist persistKey="my-tabs">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for tab 1</TabsContent>
  <TabsContent value="tab2">Content for tab 2</TabsContent>
  <TabsContent value="tab3">Content for tab 3</TabsContent>
</Tabs>;
```

**Props:**

- `defaultValue`: string
- `persist`: boolean - Persist tab state in localStorage
- `persistKey`: string - Key for localStorage
- `variant`: "default" | "underline"
- `color`: "primary" | "secondary"

---

### Textarea

Multi-line text input component.

```jsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Enter your message" rows={4} />;
```

---

### Tooltip

Contextual tooltip component.

```jsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

---

### Typography

Responsive typography component system.

```jsx
import { Typography } from "@/components/ui/typography";

<Typography.h1>Heading 1</Typography.h1>
<Typography.h2>Heading 2</Typography.h2>
<Typography.h3>Heading 3</Typography.h3>
<Typography.h4>Heading 4</Typography.h4>
<Typography.p>Paragraph text</Typography.p>
<Typography.lead>Lead paragraph</Typography.lead>
<Typography.small>Small text</Typography.small>
<Typography.muted>Muted text</Typography.muted>

// Responsive sizing
<Typography.h1 responsive>Responsive Heading</Typography.h1>
<Typography.p responsive={false}>Fixed size paragraph</Typography.p>
```

**Props:**

- `responsive`: boolean | "true" | "false" - Enable responsive font scaling
- All standard HTML element props

---

## 🔄 Reusable Components

### Composable Sidenav

Flexible navigation sidebar component.

```jsx
import ComposableSidenav from "@/components/reusables/composable-sidenav";

const navData = [
  {
    id: "home",
    title: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    id: "products",
    title: "Products",
    path: "/products",
    icon: PackageIcon,
    badge: "10",
    children: [
      {
        id: "all-products",
        title: "All Products",
        path: "/products/all",
      },
    ],
  },
];

<ComposableSidenav
  data={navData}
  activePath="/products"
  onItemClick={(item) => console.log(item)}
  groupLabel="Main Navigation"
/>;
```

---

### Filter Sidebar

Advanced filtering sidebar for products/content.

```jsx
import FilterSideBar from "@/components/reusables/filter-side-bar";

<FilterSideBar
  categories={categories}
  products={products}
  selectedCategories={selectedCategories}
  onToggleCategory={toggleCategory}
  priceRange={priceRange}
  onPriceChange={updatePriceRange}
  onClearFilters={clearFilters}
/>;
```

---

### Product Card

Product display card with cart functionality.

```jsx
import ProductCard from "@/components/reusables/product-card";

<ProductCard
  data={{
    title: "Product Name",
    price: 5000,
    image: "/image.jpg",
    rating: 4.5,
    rated_by: 100,
  }}
  onClick={() => console.log("Product clicked")}
/>;
```

---

### Slider

Image/content slider with navigation.

```jsx
import Slider from "@/components/reusables/slider";

<Slider
  items={[
    { image: "/image1.jpg", alt: "Image 1" },
    { image: "/image2.jpg", alt: "Image 2" },
  ]}
  autoPlay={true}
  interval={5000}
/>;
```

---

## 📖 More Documentation

- See `/components/ui/**/README.md` for detailed UI component docs
- See `/components/reusables/**/README.md` for reusable component docs
- See `/store/README.md` for state management docs
- See `/hooks/README.md` for custom hooks documentation
