"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="bottom-center"
      style={
        {
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg": "hsl(var(--success))",
          "--success-text": "hsl(var(--success-foreground))",
          "--success-border": "hsl(var(--success))",
          "--error-bg": "hsl(var(--error))",
          "--error-text": "hsl(var(--error-foreground))",
          "--error-border": "hsl(var(--error))",
          "--warning-bg": "hsl(var(--warning))",
          "--warning-text": "hsl(var(--warning-foreground))",
          "--warning-border": "hsl(var(--warning))"
        }
      }
      toastOptions={{
        style: {
          background: "hsl(var(--popover))",
          color: "hsl(var(--popover-foreground))",
          border: "1px solid hsl(var(--border))",
        },
      }}
      {...props} />
  );
}

export { Toaster }
