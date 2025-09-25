import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-subtle [a&]:hover:bg-primary/90 [a&]:hover:shadow-soft",
        secondary:
          "border-transparent bg-white-cool text-secondary-foreground border border-primary shadow-subtle [a&]:hover:bg-white-neutral [a&]:hover:shadow-soft",
        destructive:
          "border-transparent bg-destructive text-white shadow-subtle [a&]:hover:bg-destructive/90 [a&]:hover:shadow-soft focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground border border-secondary bg-white-pure shadow-subtle [a&]:hover:bg-white-neutral [a&]:hover:text-accent-foreground [a&]:hover:shadow-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
