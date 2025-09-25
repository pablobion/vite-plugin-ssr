import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cva } from "class-variance-authority";

const infoCardVariants = cva(
  "rounded-lg border shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        secondary: "bg-card-secondary text-card-foreground border-border",
        green: "bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-200 border-green-200 dark:border-green-800",
        blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800",
        gray: "bg-gray-50 dark:bg-gray-950/20 text-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export function InfoCard({ 
  variant = "default", 
  title, 
  description, 
  children, 
  className,
  ...props 
}) {
  return (
    <Card className={infoCardVariants({ variant, className })} {...props}>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      {children && (
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      )}
    </Card>
  );
}
