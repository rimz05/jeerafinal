import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
          outline: "text-foreground",
          OWNER: "bg-pink-600 text-white border-transparent",
          MEMBER: "bg-cyan-600 text-white border-transparent",
          VIEWER: "bg-slate-500 text-white border-transparent",
          TODO: "bg-sky-600 text-white border-transparent",
          IN_PROGRESS: "bg-amber-500 text-white border-transparent",
          BACKLOG: "bg-slate-600 text-white border-transparent",
          IN_REVIEW: "bg-purple-600 text-white border-transparent",
          COMPLETED: "bg-green-600 text-white border-transparent",
          BLOCKED: "bg-red-600 text-white border-transparent",
          CRITICAL: "bg-rose-700 text-white border-transparent",
          HIGH: "bg-orange-500 text-white border-transparent",
          MEDIUM: "bg-yellow-500 text-white border-transparent",
          LOW: "bg-teal-600 text-white border-transparent",

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
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
