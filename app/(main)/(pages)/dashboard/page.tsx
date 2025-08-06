'use client'
import dynamic from "next/dynamic"

const Settings = dynamic(() => import('../settings/settings-client'), { ssr: false })

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-4 relative'>
      <h1 className='text-4xl p-6 flex items-center border-b bg-background'>
        DASHBOARD
      </h1>
      <div className="mt-0">
        <Settings />
      </div>
    </div>
  )
}


// import Settings from '../settings/page'

// const DashboardPage = () => {
//   return (
//     <div className='flex flex-col gap-4 relative'>
//       <h1 className='text-4xl p-6 flex items-center border-b bg-background'>
//         DASHBOARD
//       </h1>
//       <div className="mt-4">
//         <Settings />
//       </div>
//     </div>
//   )
// }

// export default DashboardPage