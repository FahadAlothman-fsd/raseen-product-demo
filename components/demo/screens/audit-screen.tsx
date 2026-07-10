'use client'

import {
  auditSession,
  auditControls,
  syncJobs,
  type AuditControl,
} from '@/lib/demo-data'
import { PageHeader, ScreenContainer } from './page-header'
import {
  Badge,
  KeyValue,
  StatusDot,
  Surface,
  SurfaceHeader,
  SideSheet,
} from '@/components/demo/ui'
import { Button } from '@/components/ui/button'
import { useDemo, type AuditTab } from '../demo-context'
import { SubmissionsPanel, TimelineItem } from './audit-submissions'
import { ResponsePanel } from './audit-response'
import { useState } from 'react'
import { ArrowRight, Calendar, Check, ChevronRight, FileCheck2 } from 'lucide-react'

const TABS: { key: AuditTab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'controls', label: 'Controls' },
  { key: 'submissions', label: 'Submission rounds' },
  { key: 'response', label: 'Regulatory response' },
  { key: 'syncs', label: 'Syncs' },
  { key: 'report', label: 'Final report' },
]

export function AuditScreen() {
  const { state, dispatch } = useDemo()
  const tab = state.auditTab

  return (
    <ScreenContainer className="max-w-[1180px]">
      <PageHeader
        breadcrumb={['Audit Sessions', auditSession.id]}
        title={auditSession.name}
        description={`${auditSession.regulator} · Period ${auditSession.periodStart} – ${auditSession.periodEnd}`}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Calendar className="size-3" />
              Due {auditSession.due}
            </Badge>
            <Badge variant="raseen">In progress</Badge>
          </div>
        }
      />

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Audit session sections"
        className="mb-5 flex items-center gap-1 overflow-x-auto border-b border-border"
      >
        {TABS.map((t) => {
          const active = tab === t.key
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => dispatch({ type: 'setAuditTab', tab: t.key })}
              className={
                'relative whitespace-nowrap px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ' +
                (active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {t.label}
              {active ? (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-raseen" />
              ) : null}
            </button>
          )
        })}
      </div>

      {tab === 'overview' && <OverviewPanel />}
      {tab === 'controls' && <ControlsPanel />}
      {tab === 'submissions' && <SubmissionsPanel />}
      {tab === 'response' && <ResponsePanel />}
      {tab === 'syncs' && <SyncsPanel />}
      {tab === 'report' && <ReportTabPanel />}
    </ScreenContainer>
  )
}

/* ---------------- Overview ---------------- */

function OverviewPanel() {
  const a = auditSession
  const pct = Math.round((a.completed / a.controlsTotal) * 100)
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <Surface>
          <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
            <ProgressStat label="Controls" value={a.controlsTotal} />
            <ProgressStat label="Completed" value={a.completed} tone="success" />
            <ProgressStat label="In review" value={a.inReview} tone="raseen" />
            <ProgressStat
              label="Revision requested"
              value={a.revisionRequested}
              tone="warning"
            />
          </div>
          <div className="border-t border-border px-5 py-4">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Assessment progress</span>
              <span className="font-medium tabular-nums text-foreground">{pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </Surface>

        <Surface>
          <SurfaceHeader
            title="Session details"
            description="Scope and ownership for this regulatory review."
          />
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-5 md:grid-cols-3">
            <KeyValue label="Session ID" mono>
              {a.id}
            </KeyValue>
            <KeyValue label="Regulator">{a.regulator}</KeyValue>
            <KeyValue label="Auditor">{a.auditor}</KeyValue>
            <KeyValue label="Period start">{a.periodStart}</KeyValue>
            <KeyValue label="Period end">{a.periodEnd}</KeyValue>
            <KeyValue label="Due date">{a.due}</KeyValue>
          </dl>
        </Surface>
      </div>

      <Surface>
        <SurfaceHeader title="Timeline" />
        <ol className="px-5 py-4">
          <TimelineItem label="Session opened" date="Jul 1" done />
          <TimelineItem label="Round 1 submitted" date="Jul 7" done />
          <TimelineItem label="Revision requested" date="Jul 8" tone="warning" done />
          <TimelineItem label="Remediation response" date="Jul 10" done />
          <TimelineItem label="Round 2 accepted" date="Jul 10" tone="success" done />
          <TimelineItem label="Final report issued" date="Jul 15" tone="success" done last />
        </ol>
      </Surface>
    </div>
  )
}

function ProgressStat({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: number
  tone?: 'default' | 'success' | 'warning' | 'raseen'
}) {
  const color =
    tone === 'success'
      ? 'text-success'
      : tone === 'warning'
        ? 'text-warning-foreground'
        : tone === 'raseen'
          ? 'text-raseen'
          : 'text-foreground'
  return (
    <div className="px-5 py-4">
      <div className={'text-2xl font-semibold tabular-nums ' + color}>{value}</div>
      <div className="mt-0.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  )
}

/* ---------------- Controls ---------------- */

function controlStatusBadge(status: AuditControl['status']) {
  if (status === 'Completed')
    return (
      <Badge variant="success">
        <Check className="size-3" />
        Completed
      </Badge>
    )
  if (status === 'Revision requested')
    return (
      <Badge variant="warning">
        <StatusDot tone="warning" />
        Revision requested
      </Badge>
    )
  return (
    <Badge variant="raseen">
      <StatusDot tone="raseen" />
      In review
    </Badge>
  )
}

function ControlsPanel() {
  const [selected, setSelected] = useState<AuditControl | null>(null)
  return (
    <>
      <Surface>
        <SurfaceHeader
          title="Controls under review"
          description={`${auditSession.controlsTotal} controls in scope for this session.`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-2.5 font-medium">Control</th>
                <th className="px-3 py-2.5 font-medium">Type</th>
                <th className="px-3 py-2.5 font-medium">Detail</th>
                <th className="px-3 py-2.5 font-medium">Status</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {auditControls.map((c) => (
                <tr
                  key={c.id}
                  className="cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-muted/60"
                  onClick={() => setSelected(c)}
                >
                  <td className="px-5 py-3">
                    <div className="font-mono text-[0.8rem] text-foreground">{c.id}</div>
                    <div className="text-xs text-muted-foreground">{c.title}</div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{c.type}</td>
                  <td className="px-3 py-3 text-muted-foreground">{c.detail}</td>
                  <td className="px-3 py-3">{controlStatusBadge(c.status)}</td>
                  <td className="px-5 py-3 text-right">
                    <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Surface>

      <SideSheet
        open={!!selected}
        onClose={() => setSelected(null)}
        title={<span className="font-mono text-sm">{selected?.id}</span>}
        subtitle={selected?.title}
        width="max-w-lg"
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              {controlStatusBadge(selected.status)}
              <Badge variant="outline">{selected.type}</Badge>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 p-4">
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Evaluation
              </div>
              <p className="mt-1.5 text-sm text-foreground">{selected.detail}</p>
              <p className="mt-1 text-sm text-muted-foreground">{selected.metric}</p>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Control type
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selected.type === 'Hybrid Control'
                  ? 'Combines document evidence with live configuration checks against connected cloud resources.'
                  : selected.type === 'Configuration Control'
                    ? 'Automatically evaluated from synced cloud configuration. No manual evidence required.'
                    : 'Evaluated from uploaded policy documents and formal approvals.'}
              </p>
            </div>
            {selected.id === 'SAMA-3.3.5' ? (
              <div className="rounded-lg border border-warning/40 bg-warning-muted/50 p-4">
                <div className="text-xs font-semibold tracking-wide text-warning-foreground uppercase">
                  Linked finding
                </div>
                <p className="mt-1.5 text-sm text-foreground">
                  Connected to two failed cloud resources. Remediation submitted in the
                  regulatory response.
                </p>
              </div>
            ) : null}
          </div>
        ) : null}
      </SideSheet>
    </>
  )
}

/* ---------------- Syncs ---------------- */

function SyncsPanel() {
  const relevant = syncJobs.filter((j) => j.integration.startsWith('GCP')).slice(0, 3)
  return (
    <Surface>
      <SurfaceHeader
        title="Evidence syncs"
        description="Configuration evaluations backing this audit session."
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-5 py-2.5 font-medium">Sync ID</th>
              <th className="px-3 py-2.5 font-medium">Started</th>
              <th className="px-3 py-2.5 font-medium">Evaluations</th>
              <th className="px-3 py-2.5 font-medium">Used for</th>
              <th className="px-3 py-2.5 font-medium">Result</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'SYNC-2026-0718', started: 'Jul 10 14:22', evals: 74, used: 'Round 2 evidence', result: 'success' },
              { id: 'SYNC-2026-0712', started: 'Jul 12 02:00', evals: 74, used: 'Round 1 evidence', result: 'success' },
              ...relevant
                .filter((r) => r.id !== 'SYNC-2026-0718' && r.id !== 'SYNC-2026-0712')
                .map((r) => ({
                  id: r.id,
                  started: r.startedAt,
                  evals: r.evaluations,
                  used: 'Baseline',
                  result: r.result,
                })),
            ].map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <td className="px-5 py-3 font-mono text-[0.8rem] text-foreground">
                  {r.id}
                </td>
                <td className="px-3 py-3 text-muted-foreground">{r.started}</td>
                <td className="px-3 py-3 text-foreground">{r.evals}</td>
                <td className="px-3 py-3 text-muted-foreground">{r.used}</td>
                <td className="px-3 py-3">
                  <Badge variant={r.result === 'success' ? 'success' : 'warning'}>
                    {r.result === 'success' ? 'Success' : 'Partial'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  )
}

/* ---------------- Report tab ---------------- */

function ReportTabPanel() {
  const { dispatch } = useDemo()
  return (
    <Surface className="p-8 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-success-muted text-success">
        <FileCheck2 className="size-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-foreground">
        Final report issued
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
        The Saudi Central Bank issued the final assessment report on July 15, 2026.
        The overall outcome is Compliant.
      </p>
      <Button
        size="sm"
        className="mx-auto mt-5"
        onClick={() => dispatch({ type: 'navigate', view: 'report' })}
      >
        Open final report
        <ArrowRight className="size-4" />
      </Button>
    </Surface>
  )
}
