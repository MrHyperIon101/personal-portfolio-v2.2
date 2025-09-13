import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "clash-grotesk inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-transparent text-white border-2 border-transparent backdrop-blur-sm hover:text-white",
        destructive:
          "bg-transparent text-red-400 border-2 border-red-500/50 hover:text-red-300 hover:border-red-400",
        outline:
          "bg-transparent text-white border-2 border-white/30 hover:text-white hover:border-white/60",
        secondary:
          "bg-transparent text-gray-300 border-2 border-gray-500/50 hover:text-white hover:border-gray-400",
        ghost: "bg-transparent text-white border-2 border-transparent hover:border-white/20",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 border-none",
      },
      size: {
        default: "px-8 py-4 text-base",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-xl px-10 text-lg",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* Single animated border with pseudo-element */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div 
            className="absolute inset-[-2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
              animation: 'spin 3s linear infinite'
            }}
          />
        </div>
        
        {/* Inner content background - stable */}
        <div className="absolute inset-[2px] rounded-[10px] bg-black/90 backdrop-blur-sm" />
        
        {/* Single shimmer effect on hover */}
        <div className="absolute inset-[2px] rounded-[10px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 transition-transform duration-200 group-hover:scale-[1.02]">
          {children}
        </span>
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
