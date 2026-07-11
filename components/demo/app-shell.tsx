'use client'

import { useEffect } from 'react'
import { useDemo } from './demo-context'
import { Sidebar } from './sidebar'
import { TopBar } from './topbar'
import { PresenterBar } from './presenter-bar'
import { SsoScreen } from './screens/sso-screen'
import { OverviewScreen } from './screens/overview-screen'
import { IntegrationsScreen } from './screens/integrations-screen'
import { ComplianceScreen } from './screens/compliance-screen'
import { SyncScreen } from './screens/sync-screen'
import { ContractScreen } from './screens/contract-screen'
import { AuditScreen } from './screens/audit-screen'
import { ReportsScreen } from './screens/reports-screen'
import { ReportScreen } from './screens/report-screen'
import { VerificationScreen } from './screens/verification-screen'
import { PresenterToggle } from './presenter-bar'

export function AppShell() {
  const { state, dispatch } = useDemo()

  // Shift+D toggles presenter mode (hides the bottom chapter bar for clean chapter videos).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      if (typing) return
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault()
        dispatch({ type: 'togglePresenter' })
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [dispatch])

  if (!state.signedIn) {
    return (
      <div className="flex h-screen flex-col bg-background">
        <div className="flex-1 overflow-y-auto">
          <SsoScreen />
        </div>
        {state.presenterMode ? <PresenterToggle /> : <PresenterBar />}
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-background">
            <Screen />
          </main>
        </div>
      </div>
      {state.presenterMode ? <PresenterToggle /> : <PresenterBar />}
    </div>
  )
}

function Screen() {
  const { state } = useDemo()
  switch (state.view) {
    case 'overview':
      return <OverviewScreen />
    case 'integrations':
      return <IntegrationsScreen />
    case 'compliance':
      return <ComplianceScreen />
    case 'sync':
      return <SyncScreen />
    case 'contract':
      return <ContractScreen />
    case 'audit':
      return <AuditScreen />
    case 'reports':
      return <ReportsScreen />
    case 'report':
      return <ReportScreen />
    case 'verification':
      return <VerificationScreen />
    default:
      return <OverviewScreen />
  }
}
