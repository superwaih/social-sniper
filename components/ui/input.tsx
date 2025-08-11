import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        style={{
          background: "#0A141A",
          border: "1px solid",
          borderImageSource:
            "linear-gradient(130.31deg, rgba(47, 72, 87, 0.14) 3.52%, rgba(97, 154, 189, 0.14) 35.66%, rgba(47, 72, 87, 0.14) 75.41%)",
          borderImageSlice: 1,
          ...(style || {}),
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
