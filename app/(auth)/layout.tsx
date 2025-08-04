import React from 'react'

type Props = {children : React.ReactNode }

const Layout = ( {children} : Props) => {
    return (
    <div className='flex h-screen w-full justify-center items-center'>
        {children}
    </div>
    )
}

export default Layout