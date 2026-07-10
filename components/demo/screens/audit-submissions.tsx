'use client'

import {
  submissionRound1,
  submissionRound2,
  regulatoryResponse,
} from '@/lib/demo-data'
import {
  Badge,
  FileChip,
  KeyValue,
  StatusDot,
  Surface,
  SurfaceHeader,
} from '@/components/demo/ui'
import { Button } from '@/components/ui/button'
import { useDemo } from '../demo-context'
import { ArrowRight, Check, MessageSquareWarning } from 'lucide-react'

export function SubmissionsPanel() {
  const { state, dispatch } = useDemo()
  const round = state.submissionRound

  return (
    <div className="space-y-5">
      {/* Round switcher */}
      <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1 w-fit">
        <RoundTab
          active={round === 1}
          onClick={() => dispatch({ type: 'setSubmissionRound', round: 1 })}
          label="Round 1"
          hint="Revision requested"
        />
        <RoundTab
          active={round === 2}
          onClick={() => dispatch({ type: 'setSubmissionRound', round: 2 })}
          label="Round 2"
          hint="Accepted"
        />
      </div>

      {round === 1 ? <RoundOne /> : <RoundTwo />}
    </div>
  )
}

function RoundTab({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean
  onClick: () => void
  label: string
  hint: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        'flex flex-col items-start rounded-md px-4 py-1.5 text-left transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ' +
        (active
          ? 'bg-card text-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground')
      }
    >
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
    </button>
  )
}

function RoundOne() {
  const { dispatch } = useDemo()
  const s = submissionRound1
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <Surface>
          <SurfaceHeader
            title="Submission Round 1"
            description={`Submitted ${s.submittedOn} by ${s.submittedBy}`}
            actions={
              <Badge variant="warning">
                <MessageSquareWarning className="size-3" />
                {s.status}
              </Badge>
            }
          />
          <div className="px-5 py-4">
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Document evidence
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {s.documents.map((d) => (
                <FileChip key={d.name} name={d.name} kind={d.kind} size={d.size} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-4 py-3">
              <div>
                <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Configuration evidence
                </div>
                <div className="mt-0.5 font-mono text-sm text-foreground">
                  {s.configEvidence}
                </div>
              </div>
              <Badge variant="raseen">Synced</Badge>
            </div>
          </div>
        </Surface>

        <Surface className="border-warning/40">
          <SurfaceHeader
            title="Auditor response"
            description={`${s.auditorName} · Saudi Central Bank`}
          />
          <div className="px-5 py-4">
            <blockquote className="border-l-2 border-warning pl-4 text-sm leading-relaxed text-foreground">
              {s.auditorResponse}
            </blockquote>
            <div className="mt-4">
              <div className="mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Targeted resources
              </div>
              <div className="flex flex-wrap gap-2">
                {s.targetedResources.map((r) => (
                  <Badge key={r} variant="danger" className="font-mono">
                    <StatusDot tone="danger" />
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Surface>
      </div>

      <div className="space-y-5">
        <Surface>
          <SurfaceHeader title="Submission history" />
          <ol className="flex flex-col gap-0 px-5 py-4">
            <TimelineItem label="Round 1 submitted" date="Jul 7" done />
            <TimelineItem label="Under auditor review" date="Jul 8" done />
            <TimelineItem
              label="Revision requested"
              date="Jul 8"
              tone="warning"
              done
            />
            <TimelineItem label="Remediation in progress" date="Jul 10" done last />
          </ol>
        </Surface>
        <Surface className="p-5">
          <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Next step
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Remediate the two flagged storage resources and provide evidence in a
            regulatory response.
          </p>
          <Button
            size="sm"
            className="mt-3 w-full"
            onClick={() => dispatch({ type: 'goToChapter', chapter: 8 })}
          >
            Open regulatory response
            <ArrowRight className="size-4" />
          </Button>
        </Surface>
      </div>
    </div>
  )
}

function RoundTwo() {
  const s = submissionRound2
  const c = s.comparison
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <Surface className="border-success/40">
          <SurfaceHeader
            title="Submission Round 2"
            description={`Submitted ${s.submittedOn} · Evidence ${s.sync}`}
            actions={
              <Badge variant="success">
                <Check className="size-3" />
                {s.status}
              </Badge>
            }
          />
          <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
            <ReevalStat label="Reevaluated" value={s.reevaluated} />
            <ReevalStat label="Passed" value={s.passed} tone="success" />
            <ReevalStat label="Failed" value={s.failed} tone="muted" />
          </div>

          {/* Before / after comparison */}
          <div className="px-5 py-5">
            <h4 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Remediation proof · Round 1 vs Round 2
            </h4>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50 text-left text-xs text-muted-foreground">
                    <th className="px-4 py-2.5 font-medium">Resource</th>
                    <th className="px-4 py-2.5 font-medium">Round 1</th>
                    <th className="px-4 py-2.5 font-medium" />
                    <th className="px-4 py-2.5 font-medium">Round 2</th>
                  </tr>
                </thead>
                <tbody>
                  {c.resources.map((r) => (
                    <tr key={r.name} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-mono text-[0.8rem] text-foreground">
                        {r.name}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="danger">{r.before}</Badge>
                      </td>
                      <td className="px-2 py-3 text-center">
                        <ArrowRight className="mx-auto size-4 text-muted-foreground" />
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="success">
                          <Check className="size-3" />
                          {r.after}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <CompareCard
                label="Public resources"
                before={String(c.publicResourcesBefore)}
                after={String(c.publicResourcesAfter)}
              />
              <CompareCard
                label="Control result"
                before={c.controlResultBefore}
                after={c.controlResultAfter}
              />
            </div>
          </div>
        </Surface>
      </div>

      <div className="space-y-5">
        <Surface className="p-5">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-success-muted text-success">
              <Check className="size-5" />
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Accepted by auditor
              </div>
              <div className="text-xs text-muted-foreground">
                {regulatoryResponse.respondedOn}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            All 74 reevaluated resources passed. Control SAMA-3.3.5 is now compliant
            with zero public resources.
          </p>
        </Surface>
        <Surface>
          <SurfaceHeader title="Evidence" />
          <dl className="px-5 py-4">
            <KeyValue label="Evaluation sync" mono>
              {s.sync}
            </KeyValue>
            <div className="mt-4">
              <KeyValue label="Reevaluated resources">{s.reevaluated}</KeyValue>
            </div>
          </dl>
        </Surface>
      </div>
    </div>
  )
}

function ReevalStat({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: number
  tone?: 'default' | 'success' | 'muted'
}) {
  return (
    <div className="px-5 py-4">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div
        className={
          'mt-1 text-2xl font-semibold tabular-nums ' +
          (tone === 'success'
            ? 'text-success'
            : tone === 'muted'
              ? 'text-muted-foreground'
              : 'text-foreground')
        }
      >
        {value}
      </div>
    </div>
  )
}

function CompareCard({
  label,
  before,
  after,
}: {
  label: string
  before: string
  after: string
}) {
  return (
    <div className="rounded-lg border border-border px-4 py-3">
      <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm text-muted-foreground line-through">{before}</span>
        <ArrowRight className="size-3.5 text-muted-foreground" />
        <span className="text-sm font-semibold text-success">{after}</span>
      </div>
    </div>
  )
}

export function TimelineItem({
  label,
  date,
  done,
  last,
  tone = 'default',
}: {
  label: string
  date: string
  done?: boolean
  last?: boolean
  tone?: 'default' | 'warning' | 'success'
}) {
  return (
    <li className="relative flex gap-3 pb-4 last:pb-0">
      {!last ? (
        <span
          className="absolute left-[7px] top-4 h-full w-px bg-border"
          aria-hidden
        />
      ) : null}
      <span
        className={
          'relative z-10 mt-0.5 size-3.5 shrink-0 rounded-full border-2 ' +
          (tone === 'warning'
            ? 'border-warning bg-warning-muted'
            : tone === 'success'
              ? 'border-success bg-success-muted'
              : done
                ? 'border-raseen bg-raseen-muted'
                : 'border-border bg-card')
        }
      />
      <div className="min-w-0">
        <div className="text-sm text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{date}</div>
      </div>
    </li>
  )
}
