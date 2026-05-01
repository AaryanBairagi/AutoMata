import React from 'react'

type Props = {children: React.ReactNode}

const Layout = ({children}: Props) => {
  return (
      <div className="flex flex-col overflow-auto pb-20 border-1 border-white/10 rounded-3xl  
          bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] 
          dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800 ">      
          {children}
      </div>
  )
}

export default Layout