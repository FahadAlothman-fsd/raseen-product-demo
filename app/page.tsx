import { DemoProvider } from '@/components/demo/demo-context'
import { AppShell } from '@/components/demo/app-shell'

export default function Page() {
  return (
    <DemoProvider>
      <AppShell />
    </DemoProvider>
  )
}
