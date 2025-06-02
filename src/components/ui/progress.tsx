
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    showValue?: boolean;
    valuePrefix?: string;
    valueSuffix?: string;
  }
>(({ className, value, showValue = false, valuePrefix = "", valueSuffix = "%", ...props }, ref) => (
  <div className="w-full space-y-2">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-gray-700/50 shadow-inner",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 rounded-full shadow-sm transition-all duration-500 ease-in-out"
        style={{ 
          transform: `translateX(-${100 - (value || 0)}%)`,
          background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 70%, rgba(147, 51, 234, 0.9) 100%)`
        }}
      />
    </ProgressPrimitive.Root>
    
    {showValue && (
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Progress</span>
        <span className="text-gray-100 font-medium">
          {valuePrefix}{value || 0}{valueSuffix}
        </span>
      </div>
    )}
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
