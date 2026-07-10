import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

export function PageHeader({
  title,
  description,
  actions,
  breadcrumb,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  breadcrumb?: string[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-start justify-between gap-4 pb-5',
        className,
      )}
    >
      <div className="min-w-0">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight className="size-3 text-muted-foreground/60" aria-hidden />
                ) : null}
                <span
                  className={cn(
                    i === breadcrumb.length - 1 && 'text-foreground',
                  )}
                >
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        ) : null}
        <h1 className="text-lg font-semibold tracking-tight text-balance text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

export function ScreenContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-6xl px-6 py-6', className)}>
      {children}
    </div>
  )
}
