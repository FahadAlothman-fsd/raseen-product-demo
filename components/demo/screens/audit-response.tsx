'use client'

import {
  regulatoryResponse,
  submissionRound1,
  evaluatedResources,
} from '@/lib/demo-data'
import {
  Badge,
  FileChip,
  StatusDot,
  Surface,
  SurfaceHeader,
} from '@/components/demo/ui'
import { Button } from '@/components/ui/button'
import { useDemo } from '../demo-context'
import { Check, FileText, Paperclip, Save, Send } from 'lucide-react'
import { useState } from 'react'

const failedResources = evaluatedResources.filter((r) => r.result === 'Failed')

export function ResponsePanel() {
  const { state, dispatch } = useDemo()
  const r = regulatoryResponse
  const submitted = state.responseSubmitted || state.submissionRound === 2
  const [draftSaved, setDraftSaved] = useState(false)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
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

          {/* Item-level responses for each targeted resource */}
          <div className="border-b border-border px-5 py-4">
            <div className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Item-level responses · {failedResources.length} targeted resources
            </div>
            <div className="space-y-3">
              {failedResources.map((res) => (
                <div
                  key={res.id}
                  className="rounded-lg border border-border bg-panel p-3.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <FileText className="size-4 shrink-0 text-muted-foreground" />
                      <span className="truncate font-mono text-[0.8rem] text-foreground">
                        {res.name}
                      </span>
                    </div>
                    <Badge variant={submitted ? 'success' : 'warning'}>
                      {submitted ? (
                        <>
                          <Check className="size-3" />
                          Resolved
                        </>
                      ) : (
                        'Addressed'
                      )}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {res.finding} · Public access removed and uniform bucket-level
                    access enabled. Re-evaluated against {res.encryption}.
                  </p>
                </div>
              ))}
            </div>
          </div>

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
              onChange={() => setDraftSaved(false)}
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
          <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-3.5">
            <span className="text-xs text-muted-foreground">
              {submitted
                ? 'Response submitted and accepted by the regulator.'
                : draftSaved
                  ? 'Draft saved locally. Submit when ready.'
                  : 'Review the response, then submit to the auditor.'}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={submitted}
                onClick={() => setDraftSaved(true)}
              >
                {draftSaved ? (
                  <>
                    <Check className="size-4" />
                    Draft saved
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save draft
                  </>
                )}
              </Button>
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
          </div>
        </Surface>

        {submitted ? (
          <Surface className="border-success/30 bg-success-muted/40 p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-success text-success-foreground">
                <Check className="size-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Response submitted to Saudi Central Bank
                </div>
                <div className="text-xs text-muted-foreground">
                  Submitted {r.respondedOn} · Awaiting Round 2 re-evaluation
                </div>
              </div>
            </div>
          </Surface>
        ) : null}
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
