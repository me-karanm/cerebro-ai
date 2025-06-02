
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showValue?: boolean;
    valuePrefix?: string;
    valueSuffix?: string;
  }
>(({ className, showValue = true, valuePrefix = "", valueSuffix = "", ...props }, ref) => {
  const value = props.value?.[0] ?? props.defaultValue?.[0] ?? 0;
  const max = props.max ?? 100;
  const min = props.min ?? 0;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center group",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-gray-700/50 shadow-inner">
          <SliderPrimitive.Range 
            className="absolute h-full rounded-full shadow-sm transition-all duration-200 group-hover:shadow-md"
            style={{
              background: `linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 80%, rgba(147, 51, 234, 0.8) 100%)`
            }}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-primary bg-white shadow-lg ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 hover:shadow-xl hover:border-primary/80 cursor-pointer group-hover:shadow-primary/20 group-hover:shadow-lg" />
      </SliderPrimitive.Root>
      
      {showValue && (
        <div 
          className="absolute -top-12 transform -translate-x-1/2 transition-all duration-200"
          style={{ left: `${percentage}%` }}
        >
          <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium shadow-lg whitespace-nowrap">
            {valuePrefix}{typeof value === 'number' ? value.toFixed(1) : value}{valueSuffix}
          </div>
          <div className="w-2 h-2 bg-primary transform rotate-45 mx-auto -mt-1"></div>
        </div>
      )}
    </div>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
