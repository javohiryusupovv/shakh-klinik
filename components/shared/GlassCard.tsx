import { cn } from '@/lib/utils'

export function GlassCard({
  children,
  className,
  hover = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn('glass p-6', hover && 'glass-hover', className)}
      {...props}
    >
      {children}
    </div>
  )
}
