'use client'

import { cn } from '@/lib/utils'
import { ChevronDown, LogOut, Search, Building2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDemo, type View } from './demo-context'
import { org, user } from '@/lib/demo-data'

const crumbs: Record<View, string[]> = {
  sso: ['Sign in'],
  overview: ['Overview'],
  compliance: ['Continuous Compliance', 'Overview'],
  sync: ['Continuous Compliance', 'Sync jobs'],
  contract: ['Continuous Compliance', 'Monitoring contract'],
  integrations: ['Integrations'],
  audit: ['Audit Sessions', 'SAMA Cybersecurity Review 2026'],
  reports: ['Reports'],
  report: ['Reports', 'RPT-2026-014'],
  verification: ['Verification'],
}

export function TopBar() {
  const { state, dispatch } = useDemo()
  const trail = crumbs[state.view] ?? ['Overview']

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-5">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex items-center gap-1.5 text-sm">
          <li className="flex items-center gap-1.5 text-muted-foreground">
            <Building2 className="size-4" />
            <span className="font-medium text-foreground">{org.name}</span>
          </li>
          {trail.map((c, i) => (
            <li key={c} className="flex items-center gap-1.5">
              <span className="text-border">/</span>
              <span
                className={cn(
                  i === trail.length - 1
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {c}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm text-muted-foreground lg:flex">
          <Search className="size-4" />
          <span className="w-40 text-left">Search controls, resources…</span>
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.65rem] font-medium">
            /
          </kbd>
        </div>
        <div className="hidden items-center gap-2 rounded-lg bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground md:flex">
          <span className="size-1.5 rounded-full bg-success" aria-hidden />
          {org.posture}% posture
        </div>
        <UserMenu onSignOut={() => dispatch({ type: 'reset' })} />
      </div>
    </header>
  )
}

function UserMenu({ onSignOut }: { onSignOut: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-lg border border-transparent px-1.5 py-1 transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <span className="grid size-7 place-items-center rounded-full bg-raseen text-xs font-semibold text-raseen-foreground">
          {user.initials}
        </span>
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="block text-xs text-muted-foreground">{user.role}</span>
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-40 mt-2 w-64 rounded-surface border border-border bg-popover p-1.5 shadow-lg"
        >
          <div className="px-3 py-2.5">
            <div className="text-sm font-medium text-foreground">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-muted px-1.5 py-0.5">{user.role}</span>
              <span>{org.domain}</span>
            </div>
          </div>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              onSignOut()
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <LogOut className="size-4 text-muted-foreground" />
            Sign out of demo
          </button>
        </div>
      ) : null}
    </div>
  )
}
