import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-md border px-2.5 py-1.5 text-xs grid has-[>svg]:grid-cols-[calc(var(--spacing)*2.5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-1.5 gap-y-0 items-start [&>svg]:size-3 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "border-error bg-error-bg text-error-foreground [&>svg]:text-error *:data-[slot=alert-description]:text-error-foreground",
        warning:
          "border-warning bg-warning-bg text-warning-foreground [&>svg]:text-warning *:data-[slot=alert-description]:text-warning-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props} />
  );
}

function AlertTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props} />
  );
}

function AlertDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-0 text-xs [&_p]:leading-tight",
        className
      )}
      {...props} />
  );
}

export { Alert, AlertTitle, AlertDescription }
