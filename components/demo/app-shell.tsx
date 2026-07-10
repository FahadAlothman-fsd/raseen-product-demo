'use client'

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

export function AppShell() {
  const { state } = useDemo()

  if (!state.signedIn) {
    return (
      <div className="flex h-screen flex-col bg-background">
        <div className="flex-1 overflow-y-auto">
          <SsoScreen />
        </div>
        <PresenterBar />
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
      <PresenterBar />
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
