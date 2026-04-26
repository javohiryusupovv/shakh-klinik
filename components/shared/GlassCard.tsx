import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'primary' | 'mint' | 'none'
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = 'none',
  ...props
}: GlassCardProps & React.HTMLAttributes<HTMLDivElement>) {
  const glowClass = glow === 'primary' ? 'glow-primary' : glow === 'mint' ? 'glow-mint' : ''
  
  return (
    <div
      className={cn(
        'glass p-6', 
        hover && 'card-glow', 
        glowClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}