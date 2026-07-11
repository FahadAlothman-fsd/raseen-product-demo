'use client'

import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  ShieldCheck,
  ClipboardCheck,
  Plug,
  FileText,
  ChevronRight,
} from 'lucide-react'
import { RaseenWordmark, SamawiTile } from './logo'
import { useDemo, type View } from './demo-context'
import { Badge } from './ui'
import { org } from '@/lib/demo-data'

type NavItem = {
  view: View
  label: string
  icon: typeof LayoutDashboard
}

const primaryNav: NavItem[] = [
  { view: 'overview', label: 'Overview', icon: LayoutDashboard },
]

const complianceNav: { view: View; label: string }[] = [
  { view: 'compliance', label: 'Overview' },
  { view: 'sync', label: 'Sync jobs' },
  { view: 'contract', label: 'Monitoring contract' },
]

const secondaryNav: NavItem[] = [
  { view: 'audit', label: 'Audit Sessions', icon: ClipboardCheck },
  { view: 'integrations', label: 'Integrations', icon: Plug },
  { view: 'reports', label: 'Reports', icon: FileText },
]

const complianceViews: View[] = ['compliance', 'sync', 'contract']

export function Sidebar() {
  const { state, dispatch } = useDemo()
  const active = state.view

  function go(view: View) {
    dispatch({ type: 'navigate', view })
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <RaseenWordmark className="text-[1.35rem]" />
      </div>

      <div className="border-b border-sidebar-border px-3 py-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-sidebar-border bg-card px-2.5 py-2">
          <SamawiTile tone="dark" className="size-8" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold text-foreground">
              {org.name}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {org.domain} · {org.region}
            </span>
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {primaryNav.map((item) => (
            <li key={item.view}>
              <NavButton
                icon={item.icon}
                label={item.label}
                active={active === item.view}
                onClick={() => go(item.view)}
              />
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <div className="flex items-center gap-2 px-2.5 pb-1.5">
            <ShieldCheck className="size-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">
              Continuous Compliance
            </span>
          </div>
          <ul className="ml-2 space-y-0.5 border-l border-sidebar-border pl-2">
            {complianceNav.map((item) => (
              <li key={item.view}>
                <SubNavButton
                  label={item.label}
                  active={active === item.view}
                  onClick={() => go(item.view)}
                />
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-5 space-y-0.5">
          {secondaryNav.map((item) => (
            <li key={item.view}>
              <NavButton
                icon={item.icon}
                label={item.label}
                active={
                  active === item.view ||
                  (item.view === 'audit' && active === 'audit')
                }
                onClick={() => go(item.view)}
                trailing={
                  item.view === 'integrations' ? (
                    <StatusPip />
                  ) : undefined
                }
              />
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Badge variant="raseen" className="w-full justify-center py-1">
          Demo environment
        </Badge>
      </div>
    </aside>
  )

  function StatusPip() {
    return <span className="size-1.5 rounded-full bg-warning" aria-hidden />
  }
}

function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
  trailing,
}: {
  icon: typeof LayoutDashboard
  label: string
  active: boolean
  onClick: () => void
  trailing?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group flex h-9 w-full items-center gap-2.5 rounded-lg px-2.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        active
          ? 'bg-raseen-muted text-raseen'
          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {trailing}
      {active ? <ChevronRight className="size-3.5" /> : null}
    </button>
  )
}

function SubNavButton({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-8 w-full items-center rounded-md px-2.5 text-[0.8rem] font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
        active
          ? 'bg-raseen-muted text-raseen'
          : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
      )}
    >
      {label}
    </button>
  )
}
