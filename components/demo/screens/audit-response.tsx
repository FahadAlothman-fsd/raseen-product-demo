'use client'

import { regulatoryResponse, submissionRound1 } from '@/lib/demo-data'
import {
  Badge,
  FileChip,
  StatusDot,
  Surface,
  SurfaceHeader,
} from '@/components/demo/ui'
import { Button } from '@/components/ui/button'
import { useDemo } from '../demo-context'
import { Check, Paperclip, Send } from 'lucide-react'

export function ResponsePanel() {
  const { state, dispatch } = useDemo()
  const r = regulatoryResponse
  const submitted = state.responseSubmitted || state.submissionRound === 2

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-5">
        <Surface>
          <SurfaceHeader
            title="Regulatory response"
            description={`Draft prepared ${r.respondedOn} by ${r.respondedBy}`}
            actions={
              submitted ? (
                <Badge variant="success">
                  <Check className="size-3" />
                  Submitted
                </Badge>
              ) : (
                <Badge variant="warning">
                  <StatusDot tone="warning" />
                  {r.status}
                </Badge>
              )
            }
          />
          <div className="px-5 py-4">
            <label
              htmlFor="response-body"
              className="mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
            >
              Response to auditor
            </label>
            <textarea
              id="response-body"
              defaultValue={r.body}
              readOnly={submitted}
              rows={5}
              className="w-full resize-none rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none read-only:bg-secondary/40 read-only:text-muted-foreground"
              aria-describedby="response-hint"
            />
            <p id="response-hint" className="mt-1.5 text-xs text-muted-foreground">
              Addressed to Layla Al-Harbi, Saudi Central Bank · Re: SAMA-3.3.5 Data
              Encryption
            </p>

            <div className="mt-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <Paperclip className="size-3.5" />
                Attachments
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {r.attachments.map((a) => (
                  <FileChip key={a.name} name={a.name} kind={a.kind} size={a.size} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
            <span className="text-xs text-muted-foreground">
              {submitted
                ? 'Response submitted and accepted by the regulator.'
                : 'Review the response, then submit to the auditor.'}
            </span>
            <Button
              size="sm"
              disabled={submitted}
              onClick={() => dispatch({ type: 'submitResponse' })}
            >
              {submitted ? (
                <>
                  <Check className="size-4" />
                  Response submitted
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Submit response
                </>
              )}
            </Button>
          </div>
        </Surface>
      </div>

      <div className="space-y-5">
        <Surface>
          <SurfaceHeader title="Original request" />
          <div className="px-5 py-4">
            <blockquote className="border-l-2 border-warning pl-4 text-sm leading-relaxed text-muted-foreground">
              {submissionRound1.auditorResponse}
            </blockquote>
          </div>
        </Surface>
        <Surface className="p-5">
          <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Remediation summary
          </div>
          <ul className="mt-3 space-y-2.5">
            {[
              'Removed public access from both buckets',
              'Enabled uniform bucket-level access',
              'Enforced org-level public access prevention',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-success-muted text-success">
                  <Check className="size-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Surface>
      </div>
    </div>
  )
}
