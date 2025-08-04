import React from 'react'
import SideBar from '@/components/sidebar'
import InfoBar from '@/components/infobar'

type Props = {children : React.ReactNode}

const Layout = (props:Props) => {
return (
    <div className="flex min-h-screen w-full">
        <SideBar/>
        <div className="ml-0 flex-1 flex flex-col">
            <InfoBar />
            <div className="flex-1 flex flex-col">
                {props.children}
            </div>
        </div>
    </div>
    )
}

export default Layout