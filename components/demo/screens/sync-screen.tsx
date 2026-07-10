'use client'

import { Button } from '@/components/ui/button'
import { PageHeader, ScreenContainer } from './page-header'
import { Surface, SurfaceHeader, Badge, KeyValue, SideSheet } from '../ui'
import { syncJobs, type SyncJob } from '@/lib/demo-data'
import { Check, Clock, ChevronRight, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useDemo } from '../demo-context'

export function SyncScreen() {
  const { dispatch } = useDemo()
  const [job, setJob] = useState<SyncJob | null>(null)

  const totalEval = syncJobs.reduce((s, j) => s + j.evaluations, 0)

  return (
    <ScreenContainer>
      <PageHeader
        title="Sync jobs"
        description="Scheduled and on-demand evaluations against connected clouds."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch({ type: 'navigate', view: 'compliance' })}
          >
            Back to compliance
          </Button>
        }
      />

      <Surface className="mb-5">
        <div className="grid grid-cols-3 divide-x divide-border">
          <Metric label="Syncs (7 days)" value={syncJobs.length.toString()} />
          <Metric label="Evaluations run" value={totalEval.toString()} />
          <Metric label="Schedule" value="Daily 02:00 AST" />
        </div>
      </Surface>

      <Surface>
        <SurfaceHeader
          title="Recent sync jobs"
          description="Newest first"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-5 py-2.5 font-medium">Job ID</th>
                <th className="px-3 py-2.5 font-medium">Integration</th>
                <th className="px-3 py-2.5 font-medium">Started</th>
                <th className="px-3 py-2.5 font-medium">Duration</th>
                <th className="px-3 py-2.5 font-medium">Evaluations</th>
                <th className="px-3 py-2.5 font-medium">Changes</th>
                <th className="px-3 py-2.5 font-medium">Result</th>
                <th className="px-5 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {syncJobs.map((j) => (
                <tr
                  key={j.id}
                  className="cursor-pointer border-b border-border last:border-0 transition-colors hover:bg-muted/60"
                  onClick={() => setJob(j)}
                >
                  <td className="px-5 py-3 font-mono text-[0.8rem] text-foreground">
                    {j.id}
                  </td>
                  <td className="px-3 py-3 text-foreground">{j.integration}</td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {j.startedAt}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {j.duration}
                  </td>
                  <td className="px-3 py-3 text-foreground">{j.evaluations}</td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {j.changes > 0 ? `${j.changes} changed` : 'None'}
                  </td>
                  <td className="px-3 py-3">
                    <Badge
                      variant={j.result === 'success' ? 'success' : 'warning'}
                    >
                      {j.result === 'success' ? 'Success' : 'Partial'}
                    </Badge>
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

      <SideSheet
        open={!!job}
        onClose={() => setJob(null)}
        title={<span className="font-mono text-sm">{job?.id}</span>}
        subtitle={job ? `${job.integration} · ${job.startedAt}` : ''}
      >
        {job ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Badge variant={job.result === 'success' ? 'success' : 'warning'}>
                {job.result === 'success' ? (
                  <Check className="size-3" />
                ) : (
                  <Clock className="size-3" />
                )}
                {job.result === 'success' ? 'Completed' : 'Completed with notes'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-secondary/40 p-4">
              <KeyValue label="Resources read">{job.resources}</KeyValue>
              <KeyValue label="Evaluations">{job.evaluations}</KeyValue>
              <KeyValue label="Duration">{job.duration}</KeyValue>
              <KeyValue label="Config changes">{job.changes}</KeyValue>
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Pipeline
              </h3>
              <ul className="space-y-2">
                {[
                  'Snapshot resource inventory',
                  'Normalize configuration',
                  'Evaluate control rules',
                  'Persist evidence',
                ].map((s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2"
                  >
                    <span className="grid size-4 place-items-center rounded-full bg-success-muted text-success">
                      <Check className="size-3" />
                    </span>
                    <span className="text-sm text-foreground">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </SideSheet>
    </ScreenContainer>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <span className="grid size-8 place-items-center rounded-lg bg-secondary text-muted-foreground">
        <RefreshCw className="size-4" />
      </span>
      <div>
        <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </div>
        <div className="text-lg font-semibold text-foreground">{value}</div>
      </div>
    </div>
  )
}
