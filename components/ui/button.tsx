import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#4A9EE7] via-[#5BB0F0] to-[#2B7FCC] text-white hover:shadow-[0_0_25px_rgba(74,158,231,0.5)] hover:scale-[1.02] active:scale-[0.98]",
        primary: "bg-gradient-to-r from-[#4A9EE7] via-[#5BB0F0] to-[#2B7FCC] text-white hover:shadow-[0_0_25px_rgba(74,158,231,0.5)] hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-[#A8E6CF] text-[#1F2937] hover:bg-[#8ed9b8] hover:shadow-[0_0_20px_rgba(168,230,207,0.4)]",
        outline: "border-2 border-[#4A9EE7] text-[#4A9EE7] bg-transparent hover:bg-[#4A9EE7]/10",
        ghost: "bg-transparent text-[#1F2937] hover:bg-gray-100",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        link: "text-[#4A9EE7] underline-offset-4 hover:underline bg-transparent",
        "outline-white": "border-2 border-white text-white bg-transparent hover:bg-white/10",
      },
      size: {
        default: "h-11 px-6 gap-2",
        sm: "h-9 px-4 text-sm gap-1.5",
        lg: "h-12 px-8 text-lg gap-2",
        xl: "h-14 px-10 text-xl gap-3",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }