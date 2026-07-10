'use client'

import { finalReport, verification } from '@/lib/demo-data'
import { PageHeader, ScreenContainer } from './page-header'
import { Badge, StatusDot, Surface, SurfaceHeader } from '@/components/demo/ui'
import { Button } from '@/components/ui/button'
import { useDemo } from '../demo-context'
import { ChevronRight, FileCheck2, ShieldCheck } from 'lucide-react'

export function ReportsScreen() {
  const { dispatch } = useDemo()
  return (
    <ScreenContainer>
      <PageHeader
        title="Reports"
        description="Issued assessment reports and public verification records."
      />

      <Surface>
        <SurfaceHeader title="Issued reports" />
        <ul className="divide-y divide-border">
          <li>
            <button
              type="button"
              onClick={() => dispatch({ type: 'navigate', view: 'report' })}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-success-muted text-success">
                <FileCheck2 className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-foreground">
                    {finalReport.title}
                  </span>
                  <Badge variant="success">
                    <StatusDot tone="success" />
                    {finalReport.outcome}
                  </Badge>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  <span className="font-mono">{finalReport.id}</span> · Issued{' '}
                  {finalReport.issued} · {finalReport.assessed} controls assessed
                </div>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        </ul>
      </Surface>

      <Surface className="mt-5">
        <SurfaceHeader
          title="Public verification"
          description="Share a verification code so third parties can confirm a report is authentic."
        />
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-raseen-muted text-raseen">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <div className="font-mono text-sm text-foreground">{verification.code}</div>
              <div className="text-xs text-muted-foreground">
                Verification record for {finalReport.id}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch({ type: 'navigate', view: 'verification' })}
          >
            Open verification
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </Surface>
    </ScreenContainer>
  )
}
