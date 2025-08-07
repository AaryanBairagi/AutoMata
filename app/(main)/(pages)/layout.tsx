import React from 'react'

type Props = {children: React.ReactNode}

const Layout = ({children}: Props) => {
  return (
      <div className="flex flex-col overflow-auto pb-20 border rounded-3xl border-muted-foreground/20 
          bg-gradient-to-br from-[#f8f9fa] via-[#e9ecef] to-[#dee2e6] 
        dark:from-[#1e1e1e] dark:via-[#2c2c2c] dark:to-[#3a3a3a]">      
          {children}
      </div>
  )
}

export default Layout