'use client'

import { Button } from '@/components/ui/button'
import { RaseenMark } from '../logo'
import { Badge } from '../ui'
import { useDemo } from '../demo-context'
import { sso, user } from '@/lib/demo-data'
import { ShieldCheck, Lock, ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'

export function SsoScreen() {
  const { state, dispatch } = useDemo()
  const [email, setEmail] = useState(user.email)

  return (
    <div className="flex min-h-full w-full items-center justify-center bg-background p-6">
      <div className="w-full max-w-4xl overflow-hidden rounded-surface border border-border bg-card shadow-sm">
        <div className="grid md:grid-cols-2">
          {/* Brand rail */}
          <div className="hidden flex-col justify-between border-r border-border bg-secondary/60 p-8 md:flex">
            <div className="flex items-center gap-2.5">
              <RaseenMark />
              <span className="text-sm font-semibold tracking-tight text-foreground">
                RASEEN
              </span>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-balance text-foreground">
                The trusted operations desk for cloud compliance.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Continuous evidence, regulator-ready audit sessions, and
                verifiable reports — governed from one operational surface.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Continuous configuration monitoring',
                  'SAMA CSF control coverage',
                  'Independently verifiable reports',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-foreground"
                  >
                    <span className="grid size-4 place-items-center rounded-full bg-success-muted text-success">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Badge variant="raseen">Demo environment</Badge>
          </div>

          {/* Sign-in surface */}
          <div className="p-8">
            {!state.authenticating ? (
              <div className="flex h-full flex-col justify-center">
                <div className="mb-6 md:hidden">
                  <RaseenMark />
                </div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  Sign in to RASEEN
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use your organization account to continue.
                </p>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    dispatch({ type: 'startAuth' })
                  }}
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="sso-email"
                      className="text-sm font-medium text-foreground"
                    >
                      Work email
                    </label>
                    <input
                      id="sso-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
                    />
                    <p className="text-xs text-muted-foreground">
                      Single sign-on required for the {sso.domain} domain.
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Lock className="size-4" />
                    Continue with SSO
                  </Button>
                </form>

                <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2.5">
                  <ShieldCheck className="size-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Federated through {sso.provider}. Simulated for demonstration.
                  </span>
                </div>
              </div>
            ) : (
              <EntraHandoff
                email={email}
                onContinue={() => dispatch({ type: 'signIn' })}
                onCancel={() => dispatch({ type: 'reset' })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EntraHandoff({
  email,
  onContinue,
  onCancel,
}: {
  email: string
  onContinue: () => void
  onCancel: () => void
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-md border border-border bg-background">
          <EntraGlyph />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-foreground">
            Microsoft Entra ID
          </div>
          <div className="text-xs text-muted-foreground">{sso.domain}</div>
        </div>
      </div>

      <div className="mt-6 rounded-surface border border-border bg-secondary/40 p-4">
        <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Authenticating
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-raseen text-sm font-semibold text-raseen-foreground">
            {user.initials}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {email}
            </div>
            <div className="text-xs text-muted-foreground">
              Conditional access satisfied · MFA verified
            </div>
          </div>
          <span className="ml-auto grid size-6 place-items-center rounded-full bg-success-muted text-success">
            <Check className="size-4" />
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Just-in-time provisioning confirmed. RASEEN never redirects outside this
        demo environment.
      </p>

      <div className="mt-6 flex items-center gap-2">
        <Button size="lg" className="flex-1" onClick={onContinue}>
          Continue to dashboard
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

function EntraGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path d="M12 2 3 6.5v6C3 18 6.9 21.4 12 22c5.1-.6 9-4 9-9.5v-6L12 2Z" className="fill-raseen/15" />
      <path
        d="M12 4.2 5 7.6v4.9c0 4 3 6.7 7 7.3 4-.6 7-3.3 7-7.3V7.6L12 4.2Z"
        className="fill-none stroke-raseen"
        strokeWidth={1.3}
      />
      <path
        d="m8.5 12.2 2.4 2.4 4.6-4.8"
        className="fill-none stroke-raseen"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
