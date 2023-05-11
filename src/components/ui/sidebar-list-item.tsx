"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sidebarListItemVariants = cva(
  "flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4",
  {
    variants: {
      isActive: {
        false:
          "hover:bg-muted text-muted-foreground hover:text-accent-foreground",
        true: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface SidebarListItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarListItemVariants> {
  asChild?: boolean;
}

const SidebarListItem = React.forwardRef<
  HTMLButtonElement,
  SidebarListItemProps
>(({ className, isActive, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(sidebarListItemVariants({ isActive, className }))}
      ref={ref}
      {...props}
    />
  );
});

SidebarListItem.displayName = "SidebarListItem";

export { SidebarListItem, sidebarListItemVariants };
