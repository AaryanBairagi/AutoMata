import React from 'react'

type Props = {children: React.ReactNode}

const Layout = ({children}: Props) => {
  return (
    <div className="flex flex-col overflow-auto pb-20 border rounded-3xl border-muted-foreground/20">
      {children}
    </div>
  )
}

export default Layout