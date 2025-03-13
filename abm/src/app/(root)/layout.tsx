import LeftSidebar from '@/components/sidebar'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex h-screen w-full overflow-hidden'>
      <LeftSidebar />
      <div className='w-full bg-slate-200 overflow-y-scroll md:overflow-hidden md:ml-[60px] md:mt-0 mt-[40px] md:h-full p-4'>
        {children}
      </div>
    </main>
  )
}

export default layout