import React from 'react'
import SideBar from '@/components/sidebar'
import InfoBar from '@/components/infobar'

type Props = { children: React.ReactNode }

const Layout = ({ children }: Props) => {
return (
    <div className="flex min-h-screen w-full overflow-hidden">
        <SideBar />
        <div className="flex flex-1 flex-col">
            <InfoBar />
            <main className="flex-1 overflow-auto px-4 py-6 border-1 border-muted-foreground/20 transition-opacity duration-300 ease-in-out">
            {children}
            </main>
        </div>
    </div>
)
}

export default Layout