'use client'

import { Button } from '@/components/ui/button'
import { RaseenWordmark, SamawiWordmark, SamawiTile } from '../logo'
import { Badge } from '../ui'
import { useDemo } from '../demo-context'
import { sso, user, org } from '@/lib/demo-data'
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Check,
  Building2,
  KeyRound,
  Fingerprint,
} from 'lucide-react'
import { useState } from 'react'

type Phase = 'email' | 'discovering' | 'entra' | 'consent'

export function SsoScreen() {
  const { state, dispatch } = useDemo()
  const [email, setEmail] = useState(user.email)
  const [phase, setPhase] = useState<Phase>('email')

  const domain = email.includes('@') ? email.split('@')[1] : org.domain
  const domainKnown = domain === org.domain

  return (
    <div className="relative flex min-h-full w-full items-center justify-center overflow-hidden p-6">
      {/* Branded identity background */}
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/raseen-blue-background.png"
          alt=""
          aria-hidden
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1b46]/55" aria-hidden />
      </div>

      <div className="w-full max-w-4xl overflow-hidden rounded-surface border border-white/10 bg-card shadow-2xl">
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          {/* Brand rail — dark branded surface uses white assets */}
          <div className="relative hidden flex-col justify-between overflow-hidden p-8 md:flex">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/raseen-blue-background.png"
              alt=""
              aria-hidden
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-[#151642]/78" aria-hidden />
            <div className="relative flex items-center justify-between">
              <RaseenWordmark variant="white" className="text-2xl" />
              <span className="rounded-full border border-white/25 px-2 py-0.5 text-[0.65rem] font-medium tracking-wide text-white/80 uppercase">
                Simulation
              </span>
            </div>
            <div className="relative">
              <h1 className="font-berlin text-2xl leading-tight tracking-tight text-balance text-white">
                The trusted operations desk for cloud compliance.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Continuous evidence, regulator-ready audit sessions, and
                verifiable reports, governed from one operational surface.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Continuous configuration monitoring',
                  'SAMA CSF control coverage',
                  'Independently verifiable reports',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-white/90"
                  >
                    <span className="grid size-4 place-items-center rounded-full bg-white/15 text-white">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex items-center gap-2 text-xs text-white/60">
              <span>Operated by</span>
              <SamawiWordmark variant="white" className="h-3.5" />
              <span>· Demo environment</span>
            </div>
          </div>

          {/* Sign-in surface — light, uses black assets */}
          <div className="bg-card p-8">
            {!state.authenticating ? (
              <div className="flex h-full flex-col justify-center">
                <div className="mb-6 md:hidden">
                  <RaseenWordmark className="text-2xl" />
                </div>

                {phase === 'email' && (
                  <>
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
                        setPhase('discovering')
                        window.setTimeout(() => setPhase('entra'), 650)
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
                        <DomainHint domain={domain} known={domainKnown} />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <ArrowRight className="size-4" />
                        Continue
                      </Button>
                    </form>

                    <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2.5">
                      <ShieldCheck className="size-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Federated through {sso.provider}. Simulated for
                        demonstration; no external redirect occurs.
                      </span>
                    </div>
                  </>
                )}

                {phase === 'discovering' && (
                  <div className="flex h-full flex-col justify-center">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                      <span className="size-2 animate-pulse rounded-full bg-info" />
                      Discovering identity provider
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Resolving <span className="font-mono">{domain}</span> to a
                      federated tenant.
                    </p>
                  </div>
                )}

                {phase === 'entra' && (
                  <EntraDiscovery
                    domain={domain}
                    onContinue={() => setPhase('consent')}
                    onBack={() => setPhase('email')}
                  />
                )}

                {phase === 'consent' && (
                  <OrgConsent
                    email={email}
                    onAuthorize={() => dispatch({ type: 'startAuth' })}
                    onBack={() => setPhase('entra')}
                  />
                )}
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

function DomainHint({ domain, known }: { domain: string; known: boolean }) {
  if (known) {
    return (
      <p className="flex items-center gap-1.5 text-xs text-sama">
        <Check className="size-3.5" />
        Single sign-on is enforced for the{' '}
        <span className="font-medium">{domain}</span> domain.
      </p>
    )
  }
  return (
    <p className="text-xs text-muted-foreground">
      SSO is enforced for organization domains. Try an{' '}
      <span className="font-mono">{org.domain}</span> address.
    </p>
  )
}

function EntraDiscovery({
  domain,
  onContinue,
  onBack,
}: {
  domain: string
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-md border border-border bg-background">
          <EntraGlyph />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-foreground">
            Microsoft Entra ID
          </div>
          <div className="text-xs text-muted-foreground">
            Tenant discovered for {domain}
          </div>
        </div>
        <Badge variant="sama" className="ml-auto">
          <Check className="size-3" />
          Federated
        </Badge>
      </div>

      <dl className="mt-5 divide-y divide-border rounded-lg border border-border">
        {[
          ['Tenant', `${org.name}`],
          ['Federation', 'SAML 2.0 · OIDC'],
          ['Enforcement', sso.scope],
          ['Provisioning', sso.provisioning],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between gap-4 px-3 py-2.5"
          >
            <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {k}
            </dt>
            <dd className="text-right text-sm text-foreground">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-center gap-2">
        <Button size="lg" className="flex-1" onClick={onContinue}>
          <Lock className="size-4" />
          Sign in with Entra ID
        </Button>
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}

function OrgConsent({
  email,
  onAuthorize,
  onBack,
}: {
  email: string
  onAuthorize: () => void
  onBack: () => void
}) {
  const scopes = [
    { icon: Fingerprint, label: 'Verify your workforce identity' },
    { icon: Building2, label: `Read ${org.name} organization membership` },
    { icon: KeyRound, label: 'Establish a RASEEN operator session' },
  ]
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-2.5">
        <SamawiTile tone="dark" className="size-9" />
        <div className="leading-tight">
          <div className="text-sm font-semibold text-foreground">
            Organization access
          </div>
          <div className="text-xs text-muted-foreground">
            RASEEN is requesting access on behalf of {org.name}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-border bg-secondary/40 p-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-raseen text-xs font-semibold text-raseen-foreground">
            {user.initials}
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {email}
            </div>
            <div className="text-xs text-muted-foreground">{user.role}</div>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {scopes.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-2.5 text-sm text-foreground"
          >
            <span className="grid size-6 place-items-center rounded-md bg-raseen-muted text-raseen">
              <s.icon className="size-3.5" />
            </span>
            {s.label}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2">
        <Button size="lg" className="flex-1" onClick={onAuthorize}>
          Authorize access
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" size="lg" onClick={onBack}>
          Back
        </Button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Consent is simulated locally. No data leaves this demo environment.
      </p>
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
        <span className="grid size-9 place-items-center rounded-md border border-border bg-background">
          <EntraGlyph />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-foreground">
            Microsoft Entra ID
          </div>
          <div className="text-xs text-muted-foreground">{sso.domain}</div>
        </div>
        <Badge variant="success" className="ml-auto">
          <Check className="size-3" />
          Verified
        </Badge>
      </div>

      <div className="mt-6 rounded-surface border border-border bg-secondary/40 p-4">
        <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Establishing session
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
    <svg viewBox="0 0 23 23" className="size-4" aria-hidden>
      <path fill="#f25022" d="M1 1h10v10H1z" />
      <path fill="#7fba00" d="M12 1h10v10H12z" />
      <path fill="#00a4ef" d="M1 12h10v10H1z" />
      <path fill="#ffb900" d="M12 12h10v10H12z" />
    </svg>
  )
}
