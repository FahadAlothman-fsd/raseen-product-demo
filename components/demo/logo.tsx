import { cn } from '@/lib/utils'

/**
 * Real Samawi brand assets. Black assets sit on light surfaces, white assets
 * on dark / branded surfaces. Nothing here is a stand-in.
 */

export function SamawiIcon({
  className,
  variant = 'black',
}: {
  className?: string
  variant?: 'black' | 'white'
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={
        variant === 'white'
          ? '/brand/white-logo-32.svg'
          : '/brand/black-logo-32.svg'
      }
      alt=""
      aria-hidden
      className={cn('block h-6 w-auto select-none', className)}
      draggable={false}
    />
  )
}

/**
 * Product name shown as the in-app logo, set in the real Berlin typeface.
 * The `className` controls the font-size (height maps to text size).
 */
export function RaseenWordmark({
  className,
  variant = 'black',
}: {
  className?: string
  variant?: 'black' | 'white'
}) {
  return (
    <span
      className={cn(
        'font-berlin text-[1.3rem] leading-none tracking-[0.03em] select-none',
        variant === 'white' ? 'text-white' : 'text-foreground',
        className,
      )}
    >
      RASEEN
    </span>
  )
}

/** Real Samawi company wordmark SVG — used for Samawi attribution. */
export function SamawiWordmark({
  className,
  variant = 'black',
}: {
  className?: string
  variant?: 'black' | 'white'
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={
        variant === 'white'
          ? '/brand/samawi-white.svg'
          : '/brand/samawi-black.svg'
      }
      alt="Samawi"
      className={cn('block h-4 w-auto select-none', className)}
      draggable={false}
    />
  )
}

/**
 * Icon on a solid chip — compact avatar-style mark for identity rows
 * (org switcher, SSO handoff, verification issuer).
 */
export function SamawiTile({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-md',
        tone === 'dark'
          ? 'bg-foreground text-background'
          : 'border border-border bg-card',
        className,
      )}
      aria-hidden
    >
      <SamawiIcon
        variant={tone === 'dark' ? 'white' : 'black'}
        className="h-4"
      />
    </span>
  )
}

/* ---- Backward-compatible exports (now backed by real assets) ---- */

export function RaseenMark({
  className,
  variant = 'dark',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  return <SamawiTile tone={variant} className={cn('size-7', className)} />
}

export function RaseenLockup({
  className,
  subtitle = true,
  variant = 'black',
}: {
  className?: string
  subtitle?: boolean
  variant?: 'black' | 'white'
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <RaseenWordmark variant={variant} className="h-5" />
      {subtitle ? (
        <div
          className={cn(
            'text-[0.6rem] font-medium tracking-[0.18em] uppercase',
            variant === 'white'
              ? 'text-background/70'
              : 'text-muted-foreground',
          )}
        >
          Cloud Governance
        </div>
      ) : null}
    </div>
  )
}
