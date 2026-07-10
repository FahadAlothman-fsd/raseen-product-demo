'use client'

import { Button } from '@/components/ui/button'
import { PageHeader, ScreenContainer } from './page-header'
import {
  Surface,
  SurfaceHeader,
  Badge,
  StatusDot,
  MiniLineChart,
  KeyValue,
  SideSheet,
} from '../ui'
import {
  compliance,
  workQueue,
  featuredFinding,
  evaluatedResources,
  type EvaluatedResource,
} from '@/lib/demo-data'
import {
  RefreshCw,
  Clock,
  ChevronRight,
  ArrowRight,
  Check,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useDemo } from '../demo-context'

const severityTone = {
  high: 'danger',
  medium: 'warning',
  low: 'neutral',
} as const

export function ComplianceScreen() {
  const { dispatch } = useDemo()
  const [resource, setResource] = useState<EvaluatedResource | null>(null)

  return (
    <ScreenContainer>
      <PageHeader
        title="Continuous Compliance"
        description="Configuration-driven posture across connected clouds, evaluated continuously."
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: 'navigate', view: 'sync' })}
            >
              <RefreshCw className="size-4" />
              Sync jobs
            </Button>
            <Button
              size="sm"
              onClick={() => dispatch({ type: 'navigate', view: 'contract' })}
            >
              Monitoring contract
              <ArrowRight className="size-4" />
            </Button>
          </>
        }
      />

      {/* Posture header row */}
      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <Surface className="lg:col-span-1">
          <div className="flex h-full items-center gap-5 px-5 py-5">
            <PostureRing value={compliance.posture} />
            <div>
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Overall posture
              </div>
              <div className="text-3xl font-semibold text-foreground">
                {compliance.posture}%
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {compliance.resourcesEvaluated.toLocaleString()} resources
                evaluated
              </div>
            </div>
          </div>
        </Surface>

        <Surface className="lg:col-span-2">
          <div className="grid h-full grid-cols-2 divide-x divide-border sm:grid-cols-4">
            <MiniStat
              label="Compliant"
              value={compliance.compliantControls}
              tone="success"
            />
            <MiniStat
              label="Need attention"
              value={compliance.needAttention}
              tone="warning"
            />
            <MiniStat
              label="Critical"
              value={compliance.critical}
              tone="danger"
            />
            <div className="flex flex-col justify-center gap-1 px-5 py-4">
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Sync
              </div>
              <div className="flex items-center gap-1.5 text-sm text-foreground">
                <Clock className="size-3.5 text-muted-foreground" />
                {compliance.lastSync}
              </div>
              <div className="text-xs text-muted-foreground">
                Next {compliance.nextScheduled}
              </div>
            </div>
          </div>
        </Surface>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Featured finding + resources */}
        <div className="space-y-5 lg:col-span-2">
          <Surface>
            <SurfaceHeader
              title={
                <span className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {featuredFinding.control}
                  </span>
                  {featuredFinding.title}
                </span>
              }
              description={featuredFinding.requirement}
              actions={
                <>
                  <Badge variant="danger">{featuredFinding.severity} severity</Badge>
                  <Badge variant="warning">Non-compliant</Badge>
                </>
              }
            />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border px-5 py-3 text-xs text-muted-foreground">
              <span>
                <span className="font-medium text-danger">
                  {featuredFinding.failed} failed
                </span>{' '}
                of {featuredFinding.total} resources
              </span>
              <span>First detected {featuredFinding.firstDetected}</span>
              <span>Framework SAMA CSF v1.0</span>
            </div>

            {/* Resource table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-5 py-2.5 font-medium">Resource</th>
                    <th className="px-3 py-2.5 font-medium">Project</th>
                    <th className="px-3 py-2.5 font-medium">Result</th>
                    <th className="px-3 py-2.5 font-medium">Finding</th>
                    <th className="px-5 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {evaluatedResources.map((r) => (
                    <tr
                      key={r.id}
                      className="cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-muted/60"
                      onClick={() => setResource(r)}
                    >
                      <td className="px-5 py-3 font-mono text-[0.8rem] text-foreground">
                        {r.name}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs text-muted-foreground">
                        {r.project}
                      </td>
                      <td className="px-3 py-3">
                        <Badge
                          variant={r.result === 'Passed' ? 'success' : 'danger'}
                        >
                          {r.result === 'Passed' ? (
                            <Check className="size-3" />
                          ) : (
                            <X className="size-3" />
                          )}
                          {r.result}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground">
                        {r.finding}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        </div>

        {/* Side column: trend + work queue */}
        <div className="space-y-5">
          <Surface>
            <SurfaceHeader title="Posture trend" description="Apr — Jul 2026" />
            <div className="px-5 py-4">
              <MiniLineChart data={compliance.trend} />
            </div>
          </Surface>

          <Surface>
            <SurfaceHeader
              title="Work queue"
              description={`${workQueue.length} open exceptions`}
            />
            <ul className="divide-y divide-border">
              {workQueue.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-5 py-3"
                >
                  <StatusDot
                    tone={
                      item.severity === 'high'
                        ? 'danger'
                        : item.severity === 'medium'
                          ? 'warning'
                          : 'neutral'
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">
                      {item.title}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {item.control}
                    </div>
                  </div>
                  <Badge variant={severityTone[item.severity]}>
                    {item.failed}
                  </Badge>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>

      {/* Resource drill-down */}
      <SideSheet
        open={!!resource}
        onClose={() => setResource(null)}
        width="max-w-lg"
        title={
          <span className="font-mono text-sm">{resource?.name}</span>
        }
        subtitle={resource ? `${resource.type} · ${resource.project}` : ''}
        footer={
          resource ? (
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                Linked to {featuredFinding.control} {featuredFinding.title}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setResource(null)}
              >
                Close
              </Button>
            </div>
          ) : null
        }
      >
        {resource ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Badge
                variant={resource.result === 'Passed' ? 'success' : 'danger'}
              >
                {resource.result === 'Passed' ? (
                  <Check className="size-3" />
                ) : (
                  <X className="size-3" />
                )}
                {resource.result}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {resource.finding}
              </span>
            </div>

            <section>
              <h3 className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Resource identity
              </h3>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-secondary/40 p-4">
                <KeyValue label="Type">{resource.type}</KeyValue>
                <KeyValue label="Location">{resource.location}</KeyValue>
                <KeyValue label="Project" mono>
                  {resource.project}
                </KeyValue>
                <KeyValue label="Created">{resource.created}</KeyValue>
              </div>
            </section>

            <section>
              <h3 className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Configuration
              </h3>
              <ul className="divide-y divide-border rounded-lg border border-border">
                <ConfigRow
                  label="Public access"
                  ok={!resource.publicAccess}
                  value={resource.publicAccess ? 'Enabled' : 'Prevented'}
                />
                <ConfigRow
                  label="Uniform bucket-level access"
                  ok={resource.uniformAccess}
                  value={resource.uniformAccess ? 'Enabled' : 'Disabled'}
                />
                <ConfigRow
                  label="Encryption"
                  ok={resource.encryption.includes('CMEK')}
                  value={resource.encryption}
                />
              </ul>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Evaluation
              </h3>
              <p className="text-sm leading-relaxed text-foreground">
                {resource.result === 'Failed'
                  ? `This resource violates ${featuredFinding.control}. ${resource.finding} allows data to be reachable outside ${resource.project}.`
                  : `This resource satisfies ${featuredFinding.control}. Access is restricted to IAM principals and data is encrypted at rest.`}
              </p>
              <div className="mt-3 flex gap-6 text-xs text-muted-foreground">
                <span>First observed {resource.firstObserved}</span>
                <span>Last observed {resource.lastObserved}</span>
              </div>
            </section>

            <section>
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Remediation guidance
              </h3>
              <div
                className={cn(
                  'rounded-lg border p-3 text-sm leading-relaxed',
                  resource.result === 'Failed'
                    ? 'border-warning/30 bg-warning-muted/50 text-warning-foreground'
                    : 'border-success/30 bg-success-muted/50 text-foreground',
                )}
              >
                {resource.remediation}
              </div>
            </section>
          </div>
        ) : null}
      </SideSheet>
    </ScreenContainer>
  )
}

function ConfigRow({
  label,
  value,
  ok,
}: {
  label: string
  value: string
  ok: boolean
}) {
  return (
    <li className="flex items-center justify-between gap-3 px-3 py-2.5">
      <span className="text-sm text-foreground">{label}</span>
      <span
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-medium',
          ok ? 'text-success' : 'text-danger',
        )}
      >
        {ok ? <Check className="size-3.5" /> : <X className="size-3.5" />}
        {value}
      </span>
    </li>
  )
}

function MiniStat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: 'success' | 'warning' | 'danger'
}) {
  const toneClass =
    tone === 'success'
      ? 'text-success'
      : tone === 'warning'
        ? 'text-warning-foreground'
        : 'text-danger'
  return (
    <div className="flex flex-col justify-center gap-1 px-5 py-4">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div className={cn('text-2xl font-semibold', toneClass)}>{value}</div>
    </div>
  )
}

function PostureRing({ value }: { value: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const dash = (value / 100) * c
  return (
    <svg viewBox="0 0 80 80" className="size-20 shrink-0 -rotate-90">
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="var(--muted)"
        strokeWidth="8"
      />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="var(--success)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
      />
    </svg>
  )
}
