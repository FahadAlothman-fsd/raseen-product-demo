'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'

/* ---------- Badge ---------- */

type BadgeVariant =
  | 'neutral'
  | 'raseen'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'

const badgeStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-muted text-muted-foreground border-transparent',
  raseen: 'bg-raseen-muted text-raseen border-transparent',
  success: 'bg-success-muted text-success border-transparent',
  warning: 'bg-warning-muted text-warning-foreground border-transparent',
  danger: 'bg-danger-muted text-danger border-transparent',
  outline: 'bg-transparent text-foreground border-border',
}

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        badgeStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------- StatusDot ---------- */

const dotStyles = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  neutral: 'bg-muted-foreground',
  raseen: 'bg-raseen',
} as const

export function StatusDot({
  tone = 'neutral',
  className,
}: {
  tone?: keyof typeof dotStyles
  className?: string
}) {
  return (
    <span
      className={cn('inline-block size-2 rounded-full', dotStyles[tone], className)}
      aria-hidden
    />
  )
}

/* ---------- Surface ---------- */

export function Surface({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-surface border border-border bg-card',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SurfaceHeader({
  title,
  description,
  actions,
  className,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-border px-5 py-3.5',
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  )
}

/* ---------- KeyValue ---------- */

export function KeyValue({
  label,
  children,
  className,
  mono,
}: {
  label: string
  children: ReactNode
  className?: string
  mono?: boolean
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          'text-sm text-foreground',
          mono && 'font-mono text-[0.8rem]',
        )}
      >
        {children}
      </dd>
    </div>
  )
}

/* ---------- Side Sheet (drawer) ---------- */

export function SideSheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'max-w-md',
}: {
  open: boolean
  onClose: () => void
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  footer?: ReactNode
  width?: string
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-foreground/20"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          'relative flex h-full w-full flex-col border-l border-border bg-card shadow-xl',
          width,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer ? (
          <div className="border-t border-border px-5 py-3.5">{footer}</div>
        ) : null}
      </div>
    </div>
  )
}

/* ---------- MiniLineChart ---------- */

export function MiniLineChart({
  data,
  min = 75,
  max = 100,
  className,
}: {
  data: { month: string; value: number }[]
  min?: number
  max?: number
  className?: string
}) {
  const w = 320
  const h = 120
  const padX = 8
  const padY = 12
  const span = max - min
  const points = data.map((d, i) => {
    const x = padX + (i * (w - padX * 2)) / (data.length - 1)
    const y = padY + (1 - (d.value - min) / span) * (h - padY * 2)
    return { x, y, ...d }
  })
  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ')
  const areaPath =
    `M ${points[0].x.toFixed(1)} ${(h - padY).toFixed(1)} ` +
    points.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
    ` L ${points[points.length - 1].x.toFixed(1)} ${(h - padY).toFixed(1)} Z`

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-32 w-full"
        role="img"
        aria-label="Posture trend, April 82 to July 91 percent"
      >
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={w - padX}
            y1={padY + t * (h - padY * 2)}
            y2={padY + t * (h - padY * 2)}
            className="stroke-border"
            strokeWidth={1}
          />
        ))}
        <path d={areaPath} className="fill-raseen/8" />
        <path
          d={linePath}
          className="stroke-raseen"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p) => (
          <circle
            key={p.month}
            cx={p.x}
            cy={p.y}
            r={3}
            className="fill-card stroke-raseen"
            strokeWidth={2}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1">
        {data.map((d) => (
          <span key={d.month} className="text-xs text-muted-foreground">
            {d.month}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- QR-like glyph (deterministic, decorative) ---------- */

export function QrGlyph({
  seed = 'RASEEN-RPT-2026-014',
  className,
}: {
  seed?: string
  className?: string
}) {
  const size = 21
  // Deterministic pseudo-pattern derived from the seed characters.
  const cells: boolean[] = []
  for (let i = 0; i < size * size; i++) {
    const c = seed.charCodeAt(i % seed.length)
    cells.push(((c * (i + 7) * 131) % 100) > 52)
  }
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0)
  }
  const finderCell = (r: number, c: number) => {
    const local = (br: number, bc: number) => {
      const rr = r - br
      const cc = c - bc
      const edge = rr === 0 || rr === 6 || cc === 0 || cc === 6
      const center = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4
      return edge || center
    }
    if (r < 7 && c < 7) return local(0, 0)
    if (r < 7 && c >= size - 7) return local(0, size - 7)
    if (r >= size - 7 && c < 7) return local(size - 7, 0)
    return false
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn('size-full', className)}
      role="img"
      aria-label="Verification code glyph"
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} className="fill-card" />
      {Array.from({ length: size }).map((_, r) =>
        Array.from({ length: size }).map((_, c) => {
          const idx = r * size + c
          const on = isFinder(r, c) ? finderCell(r, c) : cells[idx]
          if (!on) return null
          return (
            <rect
              key={`${r}-${c}`}
              x={c}
              y={r}
              width={1}
              height={1}
              className="fill-foreground"
            />
          )
        }),
      )}
    </svg>
  )
}

/* ---------- File icon chip ---------- */

export function FileChip({
  name,
  kind,
  size,
  onOpen,
}: {
  name: string
  kind: 'pdf' | 'xlsx'
  size?: string
  onOpen?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <span
        className={cn(
          'grid size-8 shrink-0 place-items-center rounded-md text-[0.6rem] font-semibold tracking-wide',
          kind === 'pdf'
            ? 'bg-danger-muted text-danger'
            : 'bg-success-muted text-success',
        )}
      >
        {kind === 'pdf' ? 'PDF' : 'XLS'}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm text-foreground">{name}</span>
        {size ? (
          <span className="block text-xs text-muted-foreground">{size}</span>
        ) : null}
      </span>
    </button>
  )
}
