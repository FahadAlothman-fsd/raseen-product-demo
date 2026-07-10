'use client'

import {
  monitoringContract,
  coveredControls,
  type CoveredControl,
} from '@/lib/demo-data'
import { PageHeader } from './page-header'
import {
  Badge,
  KeyValue,
  StatusDot,
  Surface,
  SurfaceHeader,
} from '@/components/demo/ui'

function resultBadge(result: CoveredControl['result']) {
  if (result === 'Compliant')
    return (
      <Badge variant="success">
        <StatusDot tone="success" />
        Compliant
      </Badge>
    )
  if (result === 'Non-compliant')
    return (
      <Badge variant="danger">
        <StatusDot tone="danger" />
        Non-compliant
      </Badge>
    )
  return (
    <Badge variant="warning">
      <StatusDot tone="warning" />
      Attention
    </Badge>
  )
}

export function ContractScreen() {
  const covered = monitoringContract.coverageCovered
  const total = monitoringContract.coverageTotal
  const pct = Math.round((covered / total) * 100)

  return (
    <div className="mx-auto max-w-[1180px] px-6 py-6">
      <PageHeader
        breadcrumb={['Continuous Compliance', 'Monitoring contract']}
        title={monitoringContract.name}
        description="Contractual scope for automated, evidence-backed control monitoring."
        actions={
          <Badge variant="success">
            <StatusDot tone="success" />
            {monitoringContract.status}
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Surface>
            <SurfaceHeader
              title="Contract terms"
              description="Framework, coverage and schedule agreed for the 2026 monitoring period."
            />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-5 md:grid-cols-3">
              <KeyValue label="Framework">{monitoringContract.framework}</KeyValue>
              <KeyValue label="Status">{monitoringContract.status}</KeyValue>
              <KeyValue label="Schedule">{monitoringContract.schedule}</KeyValue>
              <KeyValue label="Period start">{monitoringContract.periodStart}</KeyValue>
              <KeyValue label="Period end">{monitoringContract.periodEnd}</KeyValue>
              <KeyValue label="Connected integrations">
                {monitoringContract.integrations.join(', ')}
              </KeyValue>
            </dl>
          </Surface>

          <Surface>
            <SurfaceHeader
              title="Covered controls"
              description={`${covered} of ${total} configuration-capable controls under continuous monitoring.`}
              actions={<Badge variant="raseen">{`${covered}/${total} covered`}</Badge>}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    <th className="px-5 py-2.5 font-medium">Control</th>
                    <th className="px-5 py-2.5 font-medium">Domain</th>
                    <th className="px-5 py-2.5 font-medium">Type</th>
                    <th className="px-5 py-2.5 font-medium">Resources</th>
                    <th className="px-5 py-2.5 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {coveredControls.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-border/70 last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-5 py-3">
                        <div className="font-mono text-[0.8rem] text-foreground">{c.id}</div>
                        <div className="text-xs text-muted-foreground">{c.title}</div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{c.domain}</td>
                      <td className="px-5 py-3 text-muted-foreground">{c.type}</td>
                      <td className="px-5 py-3 tabular-nums text-muted-foreground">
                        {c.resources > 0 ? c.resources : '—'}
                      </td>
                      <td className="px-5 py-3">{resultBadge(c.result)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Surface>
        </div>

        <div className="flex flex-col gap-5">
          <Surface className="p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Coverage
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums text-foreground">
                {pct}%
              </span>
              <span className="text-sm text-muted-foreground">of scope</span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {covered} of {total} configuration-capable controls are mapped to live
              integration evidence.
            </p>
          </Surface>

          <Surface>
            <SurfaceHeader title="Contractual scope" />
            <dl className="flex flex-col divide-y divide-border">
              <div className="flex items-center justify-between px-5 py-3">
                <dt className="text-sm text-muted-foreground">Monitoring window</dt>
                <dd className="text-sm font-medium text-foreground">Full year 2026</dd>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <dt className="text-sm text-muted-foreground">Evaluation cadence</dt>
                <dd className="text-sm font-medium text-foreground">Daily</dd>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <dt className="text-sm text-muted-foreground">Time zone</dt>
                <dd className="text-sm font-medium text-foreground">AST (UTC+3)</dd>
              </div>
              <div className="flex items-center justify-between px-5 py-3">
                <dt className="text-sm text-muted-foreground">Evidence retention</dt>
                <dd className="text-sm font-medium text-foreground">7 years</dd>
              </div>
            </dl>
          </Surface>

          <Surface className="p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Connected integrations
            </div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {monitoringContract.integrations.map((name) => (
                <li key={name} className="flex items-center gap-2.5 text-sm text-foreground">
                  <StatusDot tone="success" />
                  {name}
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </div>
    </div>
  )
}
