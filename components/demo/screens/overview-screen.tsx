'use client'

import { Button } from '@/components/ui/button'
import { PageHeader, ScreenContainer } from './page-header'
import { Surface, SurfaceHeader, Badge, StatusDot, MiniLineChart } from '../ui'
import { useDemo } from '../demo-context'
import {
  org,
  compliance,
  workQueue,
  integrations,
  auditSession,
  sso,
} from '@/lib/demo-data'
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Users,
  ShieldCheck,
  ClipboardCheck,
} from 'lucide-react'

const severityTone = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
} as const

export function OverviewScreen() {
  const { dispatch } = useDemo()

  return (
    <ScreenContainer>
      <PageHeader
        title={`Welcome back, Omar`}
        description={`Operational posture for ${org.name} — ${org.region}, ${org.industry}.`}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch({ type: 'navigate', view: 'audit' })}
          >
            Open audit session
            <ArrowRight className="size-4" />
          </Button>
        }
      />

      {/* Stat strip */}
      <Surface className="mb-5">
        <div className="grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
          <StatCell
            icon={ShieldCheck}
            label="Overall posture"
            value={`${org.posture}%`}
            hint="+2 vs last month"
            tone="success"
          />
          <StatCell
            icon={Boxes}
            label="Cloud resources"
            value={org.resources.toLocaleString()}
            hint="across 3 clouds"
          />
          <StatCell
            icon={Users}
            label="Employees"
            value={org.employees.toString()}
            hint="SSO enforced"
          />
          <StatCell
            icon={ClipboardCheck}
            label="Controls compliant"
            value={`${compliance.compliantControls}`}
            hint={`${compliance.needAttention} need attention`}
            tone="warning"
          />
        </div>
      </Surface>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Work queue */}
        <Surface className="lg:col-span-2">
          <SurfaceHeader
            title="Work queue"
            description="Exceptions requiring attention, most severe first"
            actions={
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'navigate', view: 'compliance' })}
              >
                View compliance
              </Button>
            }
          />
          <ul className="divide-y divide-border">
            {workQueue.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'navigate', view: 'compliance' })
                  }
                  className="flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Badge variant={severityTone[item.severity]}>
                    {item.severity}
                  </Badge>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.control}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {item.title}
                      </span>
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {item.summary}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-medium text-danger">
                      {item.failed} failed
                    </div>
                    <div className="text-xs text-muted-foreground">
                      of {item.total}
                    </div>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </Surface>

        {/* Side column */}
        <div className="space-y-5">
          <Surface>
            <SurfaceHeader title="Posture trend" description="Apr — Jul 2026" />
            <div className="px-5 py-4">
              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-foreground">
                  {org.posture}%
                </span>
                <Badge variant="success">+9 since April</Badge>
              </div>
              <MiniLineChart data={compliance.trend} />
            </div>
          </Surface>

          <Surface>
            <SurfaceHeader title="Environment" />
            <ul className="divide-y divide-border">
              {integrations.map((i) => (
                <li
                  key={i.id}
                  className="flex items-center gap-3 px-5 py-3"
                >
                  <StatusDot tone={i.status === 'healthy' ? 'success' : 'warning'} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">
                      {i.providerName}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {i.name} · {i.resources} resources
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-5 py-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between"
                onClick={() =>
                  dispatch({ type: 'navigate', view: 'integrations' })
                }
              >
                Manage integrations
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Surface>
        </div>
      </div>

      {/* Active audit banner */}
      <Surface className="mt-5">
        <div className="flex flex-wrap items-center gap-4 px-5 py-4">
          <span className="grid size-9 place-items-center rounded-lg bg-raseen-muted text-raseen">
            <ClipboardCheck className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {auditSession.name}
              </span>
              <Badge variant="raseen">In progress</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {auditSession.regulator} · Due {auditSession.due} · Auditor{' '}
              {auditSession.auditor}
            </div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            Last sign-in {sso.lastSignIn}
          </div>
          <Button
            size="sm"
            onClick={() => dispatch({ type: 'navigate', view: 'audit' })}
          >
            Open session
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </Surface>
    </ScreenContainer>
  )
}

function StatCell({
  icon: Icon,
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  icon: typeof Boxes
  label: string
  value: string
  hint?: string
  tone?: 'neutral' | 'success' | 'warning'
}) {
  const hintClass =
    tone === 'success'
      ? 'text-success'
      : tone === 'warning'
        ? 'text-warning-foreground'
        : 'text-muted-foreground'
  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <span className="mt-0.5 grid size-8 place-items-center rounded-lg bg-secondary text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div>
        <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </div>
        <div className="mt-0.5 text-xl font-semibold text-foreground">
          {value}
        </div>
        {hint ? <div className={cnHint(hintClass)}>{hint}</div> : null}
      </div>
    </div>
  )
}

function cnHint(tone: string) {
  return `mt-0.5 text-xs ${tone}`
}
