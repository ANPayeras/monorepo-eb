import React, { ReactNode } from 'react'

import LeftSidebar from '@/components/sidebar'
import GlobalAlert from '@/components/global-alert'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex h-screen w-full overflow-hidden'>
      <LeftSidebar />
      <GlobalAlert />
      <div className='w-full bg-slate-200 overflow-y-scroll md:overflow-hidden md:ml-[60px] md:mt-0 mt-[40px] md:h-full p-2 sm:p-4'>
        {children}
      </div>
    </main>
  )
}

export default layout