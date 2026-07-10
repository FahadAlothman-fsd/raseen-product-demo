import { cn } from '@/lib/utils'

export function RaseenMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground',
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none">
        <path
          d="M5 19V6.5A1.5 1.5 0 0 1 6.5 5H13a4 4 0 0 1 1.2 7.82L18 19h-3.2l-3.3-5.6H8V19H5Z"
          className="fill-current"
        />
      </svg>
    </span>
  )
}

export function RaseenLockup({
  className,
  subtitle = true,
}: {
  className?: string
  subtitle?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <RaseenMark />
      <div className="leading-none">
        <div className="text-sm font-semibold tracking-tight text-foreground">
          RASEEN
        </div>
        {subtitle ? (
          <div className="mt-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
            Cloud Governance
          </div>
        ) : null}
      </div>
    </div>
  )
}
