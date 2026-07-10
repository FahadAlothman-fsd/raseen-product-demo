'use client'

import { verification, finalReport } from '@/lib/demo-data'
import { RaseenLockup } from '../logo'
import { Badge, KeyValue, QrGlyph, StatusDot, Surface } from '@/components/demo/ui'
import { Button } from '@/components/ui/button'
import { useDemo } from '../demo-context'
import { useState } from 'react'
import { BadgeCheck, Lock, Search, ShieldCheck } from 'lucide-react'

export function VerificationScreen() {
  const { dispatch } = useDemo()
  const v = verification
  const [code, setCode] = useState(v.code)
  const [verified, setVerified] = useState(true)

  return (
    <div className="min-h-full bg-secondary/30">
      {/* Public-style header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3.5">
          <RaseenLockup subtitle={false} />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Public verification
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-tight text-balance text-foreground">
            Verify a RASEEN assessment report
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Enter a report verification code to confirm the document is authentic and
            has not been altered since it was issued.
          </p>
        </div>

        {/* Search */}
        <form
          className="mx-auto mt-6 flex max-w-xl items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            setVerified(code.trim().toUpperCase() === v.code.toUpperCase())
          }}
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="Verification code"
              className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 font-mono text-sm text-foreground shadow-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            />
          </div>
          <Button type="submit" size="sm" className="h-9">
            Verify
          </Button>
        </form>

        {/* Result */}
        {verified ? (
          <Surface className="mx-auto mt-8 max-w-xl overflow-hidden">
            <div className="flex items-center gap-3 border-b border-border bg-success-muted/40 px-6 py-4">
              <span className="grid size-10 place-items-center rounded-full bg-success text-success-foreground">
                <BadgeCheck className="size-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {v.result}
                </div>
                <div className="text-xs text-muted-foreground">
                  This report was issued by RASEEN and matches the original record.
                </div>
              </div>
            </div>

            <div className="flex gap-5 px-6 py-5">
              <div className="hidden size-24 shrink-0 rounded-lg border border-border p-1.5 sm:block">
                <QrGlyph seed={v.code} />
              </div>
              <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
                <KeyValue label="Issued to">{v.issuedTo}</KeyValue>
                <KeyValue label="Framework">{v.framework}</KeyValue>
                <KeyValue label="Issued">{v.issued}</KeyValue>
                <KeyValue label="Report ID" mono>
                  {finalReport.id}
                </KeyValue>
                <div className="col-span-2">
                  <KeyValue label="Document hash" mono>
                    {v.hash}
                  </KeyValue>
                  <p className="mt-1 font-mono text-[0.7rem] break-all text-muted-foreground">
                    {v.fullHash}
                  </p>
                </div>
              </dl>
            </div>

            <div className="flex items-center justify-between border-t border-border px-6 py-3.5">
              <span className="flex items-center gap-1.5 text-sm text-foreground">
                <ShieldCheck className="size-4 text-success" />
                Signature{' '}
                <span className="font-medium text-success">{v.signature}</span>
              </span>
              <Badge variant="neutral">
                <StatusDot tone="success" />
                Verified record
              </Badge>
            </div>
          </Surface>
        ) : (
          <Surface className="mx-auto mt-8 max-w-xl px-6 py-8 text-center">
            <p className="text-sm text-muted-foreground">
              No matching record found. Check the code and try again.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setCode(v.code)
                setVerified(true)
              }}
            >
              Reset to sample code
            </Button>
          </Surface>
        )}

        <div className="mt-8 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: 'navigate', view: 'report' })}
          >
            Back to report
          </Button>
        </div>
      </div>
    </div>
  )
}
