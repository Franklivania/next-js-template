# DualRangeSlider

A lean, accessible, shadcn-style dual range slider with two thumbs starting at the extremes. It supports controlled/uncontrolled usage, outline/full variants, size presets, custom color, optional top/bottom labels, non-crossing behavior, keyboard and pointer interactions, and form integration.

## Import

```jsx
import DualRangeSlider from "@/components/ui/dual-range-slider";
```

## Quick start

```jsx
export default function QuickStart() {
  return (
    <DualRangeSlider
      min={0}
      max={100000000}
      defaultValues={[0, 100000000]}
      variant="full" // outline | full
      color="var(--color-primary)" // any CSS color
      size="md" // sm | md | lg
      showLabels
      labelPosition="top" // top | bottom
      renderLabel={({ value }) => `₦${Number(value).toLocaleString()}`}
    />
  );
}
```

## Features

- Two independent thumbs; non-crossing by default (configurable).
- Controlled and uncontrolled modes.
- Variants: outline (neutral thumb) and full (colored thumb). Legacy primary/secondary map to full.
- Sizes: sm, md, lg adjust thumb/track dimensions.
- Color drives thumbs and active range.
- Floating labels per thumb; place on top or bottom.
- Accessible sliders: ARIA, keyboard, pointer capture.
- Form-friendly via hidden inputs when name is provided.

## Props

- variant: "outline" | "full" (default: outline)
  - outline: white thumb, colored border, neutral track, colored range
  - full: colored thumb, colored range
  - Back-compat: "primary" | "secondary" map to "full"

- size: "sm" | "md" | "lg" (default: md)

- color: string
  - Any CSS color (e.g., `#2C1F76`, `oklch(...)`, `var(--color-secondary)`). Controls thumbs and active range.

- min (default 0), max (default 100000000), step (default 1)

- values: [number, number]
  - Controlled values. Use with onChange/onChangeEnd.

- defaultValues: [number, number]
  - Initial values in uncontrolled mode.

- onChange(next: [number, number])
  - Fires while dragging/using keyboard.

- onChangeEnd(next: [number, number])
  - Fires on pointer up / commit.

- allowCross: boolean (default false)
  - When false, thumbs cannot cross.

- showLabels: boolean (default false)
- labelPosition: "top" | "bottom" (default top)
- labelA, labelB: ReactNode
- renderLabel: ({ value, index }) => ReactNode (overrides labelA/B)

- name: string (emits hidden inputs: `${name}[0]`, `${name}[1]`)
- disabled: boolean
- radius: container border radius ("default" | "md" | "sm" | "xs" | "lg" | "xl" | "full")
- aria-label | aria-labelledby | aria-describedby: string | [string, string]

## Controlled vs Uncontrolled

Uncontrolled:

```jsx
<DualRangeSlider
  min={0}
  max={100000000}
  defaultValues={[0, 100000000]}
  onChangeEnd={(v) => console.log("Committed:", v)}
/>
```

Controlled:

```jsx
function Controlled() {
  const [range, setRange] = React.useState([0, 100000000]);
  return (
    <DualRangeSlider
      min={0}
      max={100000000}
      values={range}
      onChange={setRange}
      onChangeEnd={(v) => console.log("Committed:", v)}
    />
  );
}
```

## Labels

Top labels (default):

```jsx
<DualRangeSlider
  showLabels
  renderLabel={({ value }) => `₦${value.toLocaleString()}`}
/>
```

Bottom labels:

```jsx
<DualRangeSlider
  showLabels
  labelPosition="bottom"
  renderLabel={({ value }) => `${value}%`}
/>
```

Static labels:

```jsx
<DualRangeSlider showLabels labelA="Min" labelB="Max" />
```

## Variants & Color

Outline:

```jsx
<DualRangeSlider variant="outline" color="var(--color-secondary)" showLabels />
```

Full:

```jsx
<DualRangeSlider variant="full" color="#2C1F76" showLabels />
```

Back-compat:

```jsx
<DualRangeSlider variant="primary" />
<DualRangeSlider variant="secondary" />
```

## Size

```jsx
<div className="space-y-6">
  <DualRangeSlider size="sm" />
  <DualRangeSlider size="md" />
  <DualRangeSlider size="lg" />
</div>
```

## Preventing crossing vs allowing

```jsx
<DualRangeSlider allowCross={false} />
<DualRangeSlider allowCross />
```

## Keyboard & Accessibility

- role="slider" per thumb
- Arrow keys: +/- step; PageUp/PageDown: +/- 10× step; Home/End: min/max
- Use aria-label/labelledby/describedby; pass tuple for per-thumb labelling

Example:

```jsx
<DualRangeSlider aria-label={["Minimum price", "Maximum price"]} />
```

## Forms

When name is set, two hidden inputs are emitted:

```html
<input type="hidden" name="priceRange[0]" value="1000" />
<input type="hidden" name="priceRange[1]" value="5000" />
```

```jsx
<form>
  <DualRangeSlider name="priceRange" />
  <button type="submit">Apply</button>
</form>
```

## Integration example: Filter Sidebar

```jsx
function FilterSidebarIntegration() {
  const [priceRange, setPriceRange] = React.useState({
    min: "0",
    max: "100000000",
  });
  const values = [
    Number(priceRange.min) || 0,
    Number(priceRange.max) || 100000000,
  ];

  return (
    <DualRangeSlider
      min={0}
      max={100000000}
      values={[Math.min(...values), Math.max(...values)]}
      onChange={([minV, maxV]) => {
        setPriceRange({ min: String(minV), max: String(maxV) });
      }}
      variant="secondary" // maps to full
      color="var(--color-secondary)"
      showLabels
      labelPosition="top"
      renderLabel={({ value }) => `₦${Number(value).toLocaleString()}`}
    />
  );
}
```

## Theming tips

- Prefer CSS variables (e.g., `var(--color-primary)`).
- `outline` is subtle; `full` is prominent.
- Verify contrast in your theme/background.

## Performance notes

- Use onChangeEnd for expensive work; keep onChange lightweight.
- Prefer uncontrolled unless synchronization is required.

## Edge cases handled

- Defensive min/max to ensure a valid range.
- Non-crossing by default; optional crossing.
- Step rounding and clamping.
- Keyboard + pointer parity.

## API

```ts
interface DualRangeSliderProps {
  className?: string;
  min?: number; // default 0
  max?: number; // default 100_000_000
  step?: number; // default 1
  values?: [number, number];
  defaultValues?: [number, number];
  onChange?: (next: [number, number]) => void;
  onChangeEnd?: (next: [number, number]) => void;
  allowCross?: boolean; // default false
  size?: "sm" | "md" | "lg"; // default md
  variant?: "outline" | "full" | "primary" | "secondary"; // primary/secondary map to full
  radius?: "default" | "md" | "sm" | "xs" | "lg" | "xl" | "full";
  color?: string; // CSS color
  disabled?: boolean;
  showLabels?: boolean;
  labelPosition?: "top" | "bottom"; // default top
  labelA?: React.ReactNode;
  labelB?: React.ReactNode;
  renderLabel?: (args: { value: number; index: 0 | 1 }) => React.ReactNode;
  name?: string;
  id?: string;
}
```

## Troubleshooting

- Thumbs look white using full? Provide a color.
- Range not moving? Ensure `min < max` and values within bounds.
- Labels overlap? Use `labelPosition="bottom"` or smaller size.

---

Follows project shadcn-style conventions (`cva`, `cn`, CSS variables). No external slider library.
