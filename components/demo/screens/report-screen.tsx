'use client'

import { finalReport, verification, org } from '@/lib/demo-data'
import { PageHeader, ScreenContainer } from './page-header'
import {
  Badge,
  KeyValue,
  QrGlyph,
  StatusDot,
  Surface,
  SurfaceHeader,
  SideSheet,
} from '@/components/demo/ui'
import { RaseenWordmark, SamawiWordmark } from '../logo'
import { Button } from '@/components/ui/button'
import { useDemo } from '../demo-context'
import { useState } from 'react'
import { Check, Download, ShieldCheck } from 'lucide-react'

export function ReportScreen() {
  const { dispatch } = useDemo()
  const r = finalReport
  const [preview, setPreview] = useState(false)

  return (
    <ScreenContainer className="max-w-[1100px]">
      <PageHeader
        breadcrumb={['Reports', r.id]}
        title={r.title}
        description={`Report ${r.id} · Issued ${r.issued} by ${r.signedBy}`}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: 'navigate', view: 'verification' })}
            >
              <ShieldCheck className="size-4" />
              Verify
            </Button>
            <Button size="sm" onClick={() => setPreview(true)}>
              <Download className="size-4" />
              Download report
            </Button>
          </div>
        }
      />

      {/* Outcome banner */}
      <Surface className="mb-5 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-success-muted/40 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-success text-success-foreground">
              <Check className="size-6" />
            </span>
            <div>
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Overall outcome
              </div>
              <div className="text-xl font-semibold text-foreground">{r.outcome}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <OutcomeStat label="Assessed" value={r.assessed} />
            <OutcomeStat label="Compliant" value={r.compliant} tone="success" />
            <OutcomeStat label="Partial" value={r.partiallyCompliant} tone="warning" />
            <OutcomeStat label="Non-compliant" value={r.nonCompliant} tone="muted" />
          </div>
        </div>
      </Surface>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Surface>
            <SurfaceHeader title="Executive summary" />
            <p className="px-5 py-4 text-sm leading-relaxed text-foreground">
              {r.executiveSummary}
            </p>
          </Surface>

          <Surface>
            <SurfaceHeader title="Assessment timeline" />
            <ol className="px-5 py-4">
              {r.timeline.map((t, i) => (
                <li
                  key={t.label}
                  className="relative flex gap-4 pb-4 last:pb-0"
                >
                  {i < r.timeline.length - 1 ? (
                    <span
                      className="absolute left-[31px] top-6 h-full w-px bg-border"
                      aria-hidden
                    />
                  ) : null}
                  <span className="grid w-16 shrink-0 justify-center text-xs font-medium text-muted-foreground">
                    {t.date}
                  </span>
                  <span className="relative z-10 mt-1 size-2.5 shrink-0 rounded-full border-2 border-raseen bg-card" />
                  <span className="text-sm text-foreground">{t.label}</span>
                </li>
              ))}
            </ol>
          </Surface>

          <Surface>
            <SurfaceHeader title="Evidence coverage" />
            <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {r.evidenceCoverage.map((e) => (
                <div key={e.label} className="px-5 py-4">
                  <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {e.label}
                  </dt>
                  <dd className="mt-1 text-base font-semibold text-foreground">
                    {e.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Surface>
        </div>

        <div className="space-y-5">
          <Surface>
            <SurfaceHeader title="Report details" />
            <dl className="space-y-4 px-5 py-4">
              <KeyValue label="Report ID" mono>
                {r.id}
              </KeyValue>
              <KeyValue label="Issued to">{r.issuedTo}</KeyValue>
              <KeyValue label="Framework">{r.framework}</KeyValue>
              <KeyValue label="Issued">{r.issued}</KeyValue>
            </dl>
          </Surface>

          <Surface className="p-5">
            <div className="flex items-start gap-4">
              <div className="size-20 shrink-0 rounded-lg border border-border p-1.5">
                <QrGlyph seed={verification.code} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Verification code
                </div>
                <div className="mt-1 font-mono text-sm break-all text-foreground">
                  {verification.code}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Scan or enter to verify authenticity.
                </div>
              </div>
            </div>
          </Surface>

          <Surface className="p-5">
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Signature
            </div>
            <div className="mt-3 border-b border-border pb-2">
              <span className="font-serif text-lg text-foreground italic">
                {r.signedBy}
              </span>
            </div>
            <div className="mt-2 text-sm text-foreground">{r.signedBy}</div>
            <div className="text-xs text-muted-foreground">{r.signerTitle}</div>
          </Surface>
        </div>
      </div>

      {/* Local report preview (no fetch) */}
      <SideSheet
        open={preview}
        onClose={() => setPreview(false)}
        title="Report preview"
        subtitle={`${r.id} · Bundled document`}
        width="max-w-2xl"
        footer={
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Local bundled preview — no external download.
            </span>
            <Button size="sm" onClick={() => setPreview(false)}>
              Close preview
            </Button>
          </div>
        }
      >
        <ReportDocument />
      </SideSheet>
    </ScreenContainer>
  )
}

function OutcomeStat({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: number
  tone?: 'default' | 'success' | 'warning' | 'muted'
}) {
  const color =
    tone === 'success'
      ? 'text-success'
      : tone === 'warning'
        ? 'text-warning-foreground'
        : tone === 'muted'
          ? 'text-muted-foreground'
          : 'text-foreground'
  return (
    <div className="text-center">
      <div className={'text-2xl font-semibold tabular-nums ' + color}>{value}</div>
      <div className="mt-0.5 text-[0.65rem] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  )
}

/* Bundled, print-styled document rendered locally */
function ReportDocument() {
  const r = finalReport
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative flex items-center justify-between overflow-hidden border-b border-white/10 px-6 py-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/raseen-blue-background.png"
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[#151642]/82" aria-hidden />
        <div className="relative flex items-center gap-3">
          <RaseenWordmark variant="white" className="text-xl" />
          <span className="hidden items-center gap-1.5 text-xs text-white/60 sm:flex">
            <span className="h-4 w-px bg-white/25" />
            by
            <SamawiWordmark variant="white" className="h-3" />
          </span>
        </div>
        <Badge variant="solidSuccess" className="relative">
          <StatusDot tone="success" className="bg-success-foreground" />
          {r.outcome}
        </Badge>
      </div>
      <div className="space-y-5 px-6 py-6">
        <div>
          <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Assessment report
          </div>
          <h2 className="mt-1 text-lg font-semibold text-foreground">{r.title}</h2>
          <div className="mt-1 font-mono text-xs text-muted-foreground">{r.id}</div>
        </div>

        <dl className="grid grid-cols-2 gap-4 rounded-lg bg-secondary/40 p-4 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Issued to</dt>
            <dd className="text-foreground">{org.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Framework</dt>
            <dd className="text-foreground">{r.framework}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Issued</dt>
            <dd className="text-foreground">{r.issued}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Region</dt>
            <dd className="text-foreground">{org.region}</dd>
          </div>
        </dl>

        <div>
          <h3 className="mb-1.5 text-sm font-semibold text-foreground">
            Executive summary
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {r.executiveSummary}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            { l: 'Assessed', v: r.assessed },
            { l: 'Compliant', v: r.compliant },
            { l: 'Partial', v: r.partiallyCompliant },
            { l: 'Non-compliant', v: r.nonCompliant },
          ].map((s) => (
            <div key={s.l} className="rounded-lg border border-border px-2 py-3">
              <div className="text-lg font-semibold tabular-nums text-foreground">
                {s.v}
              </div>
              <div className="text-[0.6rem] tracking-wide text-muted-foreground uppercase">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between border-t border-border pt-4">
          <div>
            <div className="border-b border-border pb-1 font-serif text-base text-foreground italic">
              {r.signedBy}
            </div>
            <div className="mt-1 text-xs text-foreground">{r.signedBy}</div>
            <div className="text-xs text-muted-foreground">{r.signerTitle}</div>
          </div>
          <div className="size-16 rounded-md border border-border p-1">
            <QrGlyph seed={verification.code} />
          </div>
        </div>
      </div>
    </div>
  )
}
