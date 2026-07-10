'use client'

import { Button } from '@/components/ui/button'
import { PageHeader, ScreenContainer } from './page-header'
import { Surface, Badge, StatusDot, KeyValue, SideSheet } from '../ui'
import { integrations, type Integration } from '@/lib/demo-data'
import { CloudProviderIcon } from './provider-icon'
import {
  Plus,
  RefreshCw,
  Clock,
  Boxes,
  Check,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function IntegrationsScreen() {
  const [wizardOpen, setWizardOpen] = useState(false)
  const [detail, setDetail] = useState<Integration | null>(null)

  return (
    <ScreenContainer>
      <PageHeader
        title="Integrations"
        description="Connected cloud accounts feeding continuous configuration evidence."
        actions={
          <Button size="sm" onClick={() => setWizardOpen(true)}>
            <Plus className="size-4" />
            Connect cloud
          </Button>
        }
      />

      <div className="space-y-3">
        {integrations.map((i) => (
          <Surface key={i.id}>
            <div className="flex flex-wrap items-center gap-4 px-5 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-background">
                <CloudProviderIcon provider={i.provider} className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {i.providerName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {i.name}
                  </span>
                  <Badge variant={i.status === 'healthy' ? 'success' : 'warning'}>
                    <StatusDot
                      tone={i.status === 'healthy' ? 'success' : 'warning'}
                    />
                    {i.statusLabel}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    {i.detailKey}: <span className="font-mono">{i.detailValue}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Boxes className="size-3.5" />
                    {i.resources} resources
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    Last sync {i.lastSync}
                  </span>
                  {i.duration !== '—' ? <span>Duration {i.duration}</span> : null}
                </div>
                {i.note ? (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-warning-muted px-2 py-1 text-xs font-medium text-warning-foreground">
                    <AlertTriangle className="size-3.5" />
                    {i.note}
                  </div>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {i.status === 'attention' ? (
                  <Button variant="outline" size="sm">
                    Renew consent
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <RefreshCw className="size-4" />
                    Sync now
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDetail(i)}
                >
                  Details
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </Surface>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Demo connection — all providers and syncs are simulated locally.
      </p>

      <GcpWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />

      <SideSheet
        open={!!detail}
        onClose={() => setDetail(null)}
        title={detail ? `${detail.providerName} · ${detail.name}` : ''}
        subtitle={detail?.statusLabel}
      >
        {detail ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <KeyValue label={detail.detailKey}>
                <span className="font-mono text-[0.8rem]">
                  {detail.detailValue}
                </span>
              </KeyValue>
              <KeyValue label="Resources">{detail.resources}</KeyValue>
              <KeyValue label="Last sync">{detail.lastSync}</KeyValue>
              <KeyValue label="Duration">{detail.duration}</KeyValue>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 p-3 text-xs leading-relaxed text-muted-foreground">
              Read-only service account with viewer and security-reviewer roles.
              RASEEN never mutates resources in the connected account.
            </div>
          </div>
        ) : null}
      </SideSheet>
    </ScreenContainer>
  )
}

/* ---------- GCP connection wizard ---------- */

const permissions = [
  'roles/viewer',
  'roles/iam.securityReviewer',
  'roles/cloudasset.viewer',
  'roles/storage.objectViewer',
]

function GcpWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const steps = ['Provider', 'Permissions', 'Test connection', 'Done']

  function reset() {
    setStep(0)
    onClose()
  }

  return (
    <SideSheet
      open={open}
      onClose={reset}
      width="max-w-lg"
      title="Connect a cloud account"
      subtitle="Google Cloud · demo connection"
      footer={
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            Step {Math.min(step + 1, steps.length)} of {steps.length}
          </span>
          <div className="flex items-center gap-2">
            {step > 0 && step < 3 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStep((s) => s - 1)}
              >
                Back
              </Button>
            ) : null}
            {step < 2 ? (
              <Button size="sm" onClick={() => setStep((s) => s + 1)}>
                Continue
                <ArrowRight className="size-4" />
              </Button>
            ) : step === 2 ? (
              <Button size="sm" onClick={() => setStep(3)}>
                Run test
              </Button>
            ) : (
              <Button size="sm" onClick={reset}>
                Finish
              </Button>
            )}
          </div>
        </div>
      }
    >
      {/* Stepper */}
      <ol className="mb-6 flex items-center gap-1.5">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-1.5">
            <span
              className={cn(
                'grid size-6 shrink-0 place-items-center rounded-full text-[0.7rem] font-semibold transition-colors',
                i < step
                  ? 'bg-success text-success-foreground'
                  : i === step
                    ? 'bg-raseen text-raseen-foreground'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              {i < step ? <Check className="size-3.5" /> : i + 1}
            </span>
            {i < steps.length - 1 ? (
              <span
                className={cn(
                  'h-px flex-1',
                  i < step ? 'bg-success' : 'bg-border',
                )}
              />
            ) : null}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose the cloud provider to connect. This demo walks through Google
            Cloud.
          </p>
          {(['gcp', 'aws', 'azure'] as const).map((p) => (
            <label
              key={p}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
                p === 'gcp'
                  ? 'border-raseen bg-raseen-muted'
                  : 'border-border bg-card hover:bg-muted',
              )}
            >
              <input
                type="radio"
                name="provider"
                defaultChecked={p === 'gcp'}
                className="accent-[var(--raseen)]"
              />
              <CloudProviderIcon provider={p} className="size-5" />
              <span className="text-sm font-medium text-foreground">
                {p === 'gcp' ? 'Google Cloud' : p === 'aws' ? 'AWS' : 'Azure'}
              </span>
              {p !== 'gcp' ? (
                <span className="ml-auto text-xs text-muted-foreground">
                  Also supported
                </span>
              ) : null}
            </label>
          ))}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-foreground">
              Service account
            </div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              raseen-monitor@acme-production.iam.gserviceaccount.com
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-medium text-foreground">
              Required read-only roles
            </div>
            <ul className="space-y-2">
              {permissions.map((perm) => (
                <li
                  key={perm}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-3 py-2"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-success-muted text-success">
                    <Check className="size-3" />
                  </span>
                  <span className="font-mono text-xs text-foreground">
                    {perm}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            RASEEN will verify permissions and read a sample of resources.
          </p>
          {[
            'Authenticate service account',
            'Verify IAM role bindings',
            'Enumerate Cloud Storage buckets',
            'Read sample resource configuration',
          ].map((c) => (
            <div
              key={c}
              className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5"
            >
              <span className="size-2 rounded-full bg-muted-foreground/40" />
              <span className="text-sm text-foreground">{c}</span>
            </div>
          ))}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 rounded-surface border border-success/30 bg-success-muted/50 px-4 py-6 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-success text-success-foreground">
              <Check className="size-6" />
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Connection successful
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                842 resources discovered in acme-production
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              'Authenticate service account',
              'Verify IAM role bindings',
              'Enumerate Cloud Storage buckets',
              'Read sample resource configuration',
            ].map((c) => (
              <div
                key={c}
                className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5"
              >
                <span className="grid size-4 place-items-center rounded-full bg-success-muted text-success">
                  <Check className="size-3" />
                </span>
                <span className="text-sm text-foreground">{c}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </SideSheet>
  )
}
