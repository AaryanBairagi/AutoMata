import React from 'react'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

type Props = {
    credits: number
    tier: string
}

const CreditTracker = ({ credits, tier }: Props) => {
return (
    <div className="p-6">
        <Card className="p-6">
            <CardContent className="flex flex-col gap-6">
                <CardTitle className="font-light">Credit Tracker</CardTitle>
                <Progress
                    value={
                    tier === 'Developer'
                    ? (credits / 100) * 100
                    : tier === 'Startup'
                    ? (credits / 5000) * 100
                    : 100
                    }
                className="w-full h-3 bg-zinc-300 rounded-full overflow-hidden shadow-inner hover:bg-white hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] transition-all"
                />
            <div className="flex justify-end">
                <p>
                {credits}/{tier === 'Developer' ? 100 : tier === 'Startup' ? 5000 : 'Unlimited'}
                </p>
            </div>
            </CardContent>
        </Card>
    </div>
    )
}

export default CreditTracker




// import React from 'react'
// import { Progress } from '@/components/ui/progress'
// import { Card, CardContent, CardTitle } from '@/components/ui/card'

// type Props = {
//     credits: number
//     tier: string
// }

// const CreditTracker = ({ credits, tier }: Props) => {
// return (
//     <div className="p-6">
//         <Card className="p-6">
//             <CardContent className="flex flex-col gap-6">
//                 <CardTitle className="font-light">Credit Tracker</CardTitle>
//                 <Progress
//                     value={
//                         tier === 'Developer'
//                         ? (credits / 50) * 100
//                         : tier === 'Startup'
//                         ? (credits / 500) * 100
//                         : 100
//                     }
//                     className="w-full bg-zinc-300" />

//             <div className="flex justify-end">
//                 <p>
//                 {credits}/
//                 {tier === 'Developer' ? 50 : tier === 'Startup' ? 500 : 'Unlimited'}
//                 </p>
//             </div>
//             </CardContent>
//         </Card>
//     </div>
//     )
// }

// export default CreditTracker


