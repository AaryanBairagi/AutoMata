"use client";

type Props = {
  credits: number;
  tier: string;
};

const CreditTracker = ({ credits, tier }: Props) => {
  const max =
    tier === "Developer" ? 100 : tier === "Startup" ? 5000 : Infinity;

  const percent =
    tier === "Enterprise" ? 100 : Math.min((credits / max) * 100, 100);

  return (
    <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-500/10">
      <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">

        <div className="flex justify-between items-center">
          <h3 className="text-sm text-zinc-400">Credit Usage</h3>
          <p className="text-white font-medium">
            {tier === "Enterprise" ? "Unlimited" : `${credits} / ${max}`}
          </p>
        </div>

        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

      </div>
    </div>
  );
};

export default CreditTracker;







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
//                     tier === 'Developer'
//                     ? (credits / 100) * 100
//                     : tier === 'Startup'
//                     ? (credits / 5000) * 100
//                     : 100
//                     }
//                 className="w-full h-3 bg-zinc-300 rounded-full overflow-hidden shadow-inner hover:bg-white hover:shadow-[0_0_10px_2px_rgba(255,255,255,0.7)] transition-all"
//                 />
//             <div className="flex justify-end">
//                 <p>
//                 {credits}/{tier === 'Developer' ? 100 : tier === 'Startup' ? 5000 : 'Unlimited'}
//                 </p>
//             </div>
//             </CardContent>
//         </Card>
//     </div>
//     )
// }

// export default CreditTracker
