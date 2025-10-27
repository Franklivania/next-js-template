import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary/20",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 focus-visible:ring-secondary/20",
        muted:
          "bg-secondary/10 text-secondary shadow-xs hover:bg-muted/80 focus-visible:ring-muted/20",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent/20",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary/20",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      radius: {
        default: "rounded-none",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  radius,
  asChild = false,
  title,
  children,
  disabled,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  // Generate unique ID for aria-describedby if title is provided
  const titleId = title ? `button-title-${React.useId()}` : undefined;

  // Determine the accessible name priority: aria-label > title > children text
  const accessibleName =
    ariaLabel || title || (typeof children === "string" ? children : undefined);

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, radius, className }))}
        aria-label={accessibleName}
        aria-describedby={title && !ariaLabel ? titleId : ariaDescribedBy}
        title={title}
        disabled={disabled}
        {...props}
      >
        {children}
      </Comp>
      {title && !ariaLabel && (
        <span id={titleId} className="sr-only">
          {title}
        </span>
      )}
    </>
  );
}

export { Button, buttonVariants };
