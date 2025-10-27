import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * DualRangeSlider (shadcn-style)
 * - Controlled/uncontrolled via `values` and `defaultValues`
 * - Variants: outline | full (primary/secondary are mapped to full for BC)
 * - Sizes: sm | md | lg (thumb/track thickness) — retained for BC
 * - Color: controls both thumbs and active range; any valid CSS color
 * - Min/Max/Step support, prevents thumbs from crossing unless allowCross=true
 * - Optional labels that follow each thumb; customizable via renderLabel
 * - Accessible: proper roles, keyboard & pointer interactions, ARIA attributes
 */

const sliderVariants = cva("relative w-full select-none touch-none", {
  variants: {
    variant: {
      outline: "",
      full: "",
    },
    radius: {
      default: "rounded-full",
      md: "rounded-md",
      sm: "rounded-sm",
      xs: "rounded-xs",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "outline",
    radius: "full",
  },
});

const sizeConfig = {
  sm: { track: 2, thumb: 14, label: 24 },
  md: { track: 3, thumb: 18, label: 28 },
  lg: { track: 4, thumb: 22, label: 32 },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function valueToPercent(value, min, max) {
  if (max === min) return 0;
  return ((value - min) * 100) / (max - min);
}

function roundToStep(value, step, min) {
  if (!step || step <= 0) return value;
  const base = min ?? 0;
  const rounded = Math.round((value - base) / step) * step + base;
  return Number(rounded.toFixed(5));
}

export function DualRangeSlider({
  className,
  min = 0,
  max = 0,
  step = 1,
  values,
  defaultValues = [min, max],
  onChange,
  onChangeEnd,
  allowCross = false,
  size = "md",
  variant = "outline",
  radius = "full",
  color,
  disabled = false,
  showLabels = false,
  labelPosition = "top",
  labelA,
  labelB,
  renderLabel,
  "aria-label": ariaLabel = "Dual range slider",
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  name,
  id,
  ...props
}) {
  const isControlled = Array.isArray(values);
  const [internal, setInternal] = React.useState(() => {
    const [a, b] = defaultValues ?? [min, max];
    const low = clamp(a, min, max);
    const high = clamp(b, min, max);
    return [Math.min(low, high), Math.max(low, high)];
  });

  // Defensive min/max: ensure max > min to avoid NaN/Inf in percent math
  const effectiveMin = Number.isFinite(min) ? min : 0;
  const effectiveMaxRaw = Number.isFinite(max) ? max : 100000000;
  const effectiveMax =
    effectiveMaxRaw > effectiveMin ? effectiveMaxRaw : effectiveMin + 1;

  const current = isControlled ? values : internal;
  const [valueA, valueB] = current ?? [effectiveMin, effectiveMax];

  // Normalize variant: map legacy primary/secondary to full
  const normalizedVariant = React.useMemo(() => {
    if (variant === "primary" || variant === "secondary") return "full";
    return variant;
  }, [variant]);

  let resolvedColor = color;
  if (!resolvedColor) {
    // default based on legacy hint for BC
    if (variant === "primary") resolvedColor = "var(--color-primary)";
    else if (variant === "secondary") resolvedColor = "var(--color-secondary)";
    else resolvedColor = "var(--color-accent-foreground)";
  }
  const activeColor = resolvedColor;
  const cfg = sizeConfig[size] || sizeConfig.md;

  const rangeStart = Math.min(valueA, valueB);
  const rangeEnd = Math.max(valueA, valueB);
  const startPct = valueToPercent(rangeStart, effectiveMin, effectiveMax);
  const endPct = valueToPercent(rangeEnd, effectiveMin, effectiveMax);

  const setValues = React.useCallback(
    (next) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const commitValues = React.useCallback(
    (next) => {
      onChangeEnd?.(next);
    },
    [onChangeEnd]
  );

  function updateThumb(which, raw, commit = false) {
    const rounded = roundToStep(
      clamp(raw, effectiveMin, effectiveMax),
      step,
      effectiveMin
    );
    let nextA = which === 0 ? rounded : valueA;
    let nextB = which === 1 ? rounded : valueB;

    if (!allowCross) {
      // Prevent crossing: lock to neighbor
      if (which === 0) nextA = Math.min(rounded, nextB);
      else nextB = Math.max(rounded, nextA);
    }

    const next = [nextA, nextB];
    setValues(next);
    if (commit) commitValues(next);
  }

  function handleKeyDown(which, e) {
    if (disabled) return;
    let delta = 0;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        delta = -step;
        break;
      case "ArrowRight":
      case "ArrowUp":
        delta = step;
        break;
      case "Home":
        updateThumb(which, which === 0 ? effectiveMin : valueA, true);
        e.preventDefault();
        return;
      case "End":
        updateThumb(which, which === 1 ? effectiveMax : valueB, true);
        e.preventDefault();
        return;
      case "PageUp":
        delta = step * 10;
        break;
      case "PageDown":
        delta = -step * 10;
        break;
      default:
        return;
    }
    e.preventDefault();
    const base = which === 0 ? valueA : valueB;
    updateThumb(which, base + delta, true);
  }

  const trackRef = React.useRef(null);

  function positionToValue(clientX) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const x = clamp(clientX - rect.left, 0, rect.width);
    const pct = rect.width === 0 ? 0 : (x / rect.width) * 100;
    const val = effectiveMin + ((effectiveMax - effectiveMin) * pct) / 100;
    return roundToStep(val, step, effectiveMin);
  }

  function startPointer(which, e) {
    if (disabled) return;
    const id = e.pointerId ?? 0;
    const move = (ev) => {
      updateThumb(which, positionToValue(ev.clientX));
    };
    const up = (ev) => {
      updateThumb(which, positionToValue(ev.clientX), true);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      try {
        e.target?.releasePointerCapture?.(id);
      } catch {}
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    try {
      e.target?.setPointerCapture?.(id);
    } catch {}
  }

  const labelFor = (val, index) => {
    if (typeof renderLabel === "function")
      return renderLabel({ value: val, index });
    if (index === 0 && labelA != null) return labelA;
    if (index === 1 && labelB != null) return labelB;
    return String(val);
  };

  const startStyle = {
    left: `${valueToPercent(valueA, effectiveMin, effectiveMax)}%`,
  };
  const endStyle = {
    left: `${valueToPercent(valueB, effectiveMin, effectiveMax)}%`,
  };
  const rangeStyle = {
    left: `${startPct}%`,
    width: `${endPct - startPct}%`,
    backgroundColor: activeColor,
    border: `1px solid ${activeColor}`,
  };
  const thumbStyle = () => ({
    accentColor: activeColor,
    width: cfg.thumb,
    height: cfg.thumb,
    borderRadius: 9999,
    backgroundColor: normalizedVariant === "full" ? activeColor : "white",
    border:
      normalizedVariant === "outline"
        ? `2px solid ${activeColor}`
        : `2px solid  ${activeColor}`,
    boxShadow:
      normalizedVariant === "outline"
        ? `0 1px 2px ${activeColor}`
        : `0 1px 2px ${activeColor}`,
  });

  const trackHeight = cfg.track;

  const commonThumbProps = (which, value) => ({
    role: "slider",
    tabIndex: disabled ? -1 : 0,
    "aria-label": Array.isArray(ariaLabel) ? ariaLabel[which] : ariaLabel,
    "aria-labelledby": Array.isArray(ariaLabelledBy)
      ? ariaLabelledBy[which]
      : ariaLabelledBy,
    "aria-describedby": Array.isArray(ariaDescribedBy)
      ? ariaDescribedBy[which]
      : ariaDescribedBy,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    "aria-disabled": disabled || undefined,
    onKeyDown: (e) => handleKeyDown(which, e),
    onPointerDown: (e) => startPointer(which, e),
  });

  return (
    <div
      data-slot="dual-range-slider"
      className={cn(
        sliderVariants({ variant: normalizedVariant, radius }),
        className
      )}
      style={{
        // allow CSS var override for consumers
        "--drs-color": activeColor,
      }}
      {...props}
    >
      <div
        ref={trackRef}
        className="relative w-full"
        style={{
          height: cfg.thumb,
          padding: `${Math.max(0, (cfg.thumb - trackHeight) / 2)}px 0`,
        }}
      >
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-full"
          style={{
            height: trackHeight,
            backgroundColor:
              normalizedVariant === "outline"
                ? "var(--color-input)"
                : `color-mix(in oklab, ${activeColor} 18%, var(--color-input))`,
          }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={rangeStyle}
        />

        {/* Start Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing outline-none"
          style={{ ...startStyle, ...thumbStyle() }}
          {...commonThumbProps(0, valueA)}
        >
          {showLabels && (
            <div
              aria-hidden
              className={
                labelPosition === "bottom"
                  ? "absolute left-1/2 -translate-x-1/2 top-full mt-1 rounded-md px-1.5 py-0.5 text-xs shadow-sm border bg-background"
                  : "absolute left-1/2 -translate-x-1/2 -top-1 -translate-y-full rounded-md px-1.5 py-0.5 text-xs shadow-sm border bg-background"
              }
              style={{
                minHeight: sizeConfig[size]?.label || 24,
                whiteSpace: "nowrap",
              }}
            >
              {labelFor(valueA, 0)}
            </div>
          )}
        </div>

        {/* End Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing outline-none"
          style={{ ...endStyle, ...thumbStyle() }}
          {...commonThumbProps(1, valueB)}
        >
          {showLabels && (
            <div
              aria-hidden
              className={
                labelPosition === "bottom"
                  ? "absolute left-1/2 -translate-x-1/2 top-full mt-1 rounded-md px-1.5 py-0.5 text-xs shadow-sm border bg-background"
                  : "absolute left-1/2 -translate-x-1/2 -top-1 -translate-y-full rounded-md px-1.5 py-0.5 text-xs shadow-sm border bg-background"
              }
              style={{
                minHeight: sizeConfig[size]?.label || 24,
                whiteSpace: "nowrap",
              }}
            >
              {labelFor(valueB, 1)}
            </div>
          )}
        </div>

        {/* Hidden inputs for forms if name is provided */}
        {name && (
          <>
            <input
              type="hidden"
              name={`${name}[0]`}
              value={rangeStart}
              readOnly
            />
            <input
              type="hidden"
              name={`${name}[1]`}
              value={rangeEnd}
              readOnly
            />
          </>
        )}
      </div>
    </div>
  );
}

DualRangeSlider.displayName = "DualRangeSlider";

export default DualRangeSlider;
