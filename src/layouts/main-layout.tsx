import type { ReactNode } from 'react'

import { AppFooter } from '@/components/common/app-footer'
import { AppHeader } from '@/components/common/app-header'

interface Props {
  children: ReactNode
}

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[--color-background]">
      <AppHeader />

      <main className="flex-1">
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-4
            py-6
            sm:px-6
            lg:px-8
          "
        >
          {children}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}