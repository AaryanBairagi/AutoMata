"use client";

type Props = {
  products: any[];
  tier: string;
  onPayment: (id: string) => void;
};

export const SubscriptionCard = ({ products, tier, onPayment }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

      {products.map((product: any) => {
        const isActive = product.name === tier;

        return (
          <div
            key={product.id}
            className={`
              p-[1px] rounded-2xl transition-all
              bg-gradient-to-br from-purple-600/40 to-pink-500/20
              ${isActive ? "scale-[1.02]" : ""}
            `}
          >
            <div className="h-full p-6 rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between">

              {/* HEADER */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {product.name}
                </h2>

                <p className="text-zinc-400 text-sm mb-4">
                  {product.description}
                </p>

                <p className="text-3xl font-bold text-white">
                  ${product.price}
                  <span className="text-sm text-zinc-400"> /mo</span>
                </p>
              </div>

              {/* FEATURES */}
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {product.features?.map((f: string, i: number) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>

              {/* BUTTON */}
              <button
                onClick={() => onPayment(product.priceId)}
                className={`
                  mt-6 w-full py-2.5 rounded-xl text-sm font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "border border-white/20 text-white hover:bg-white/10"
                  }
                `}
              >
                {isActive ? "Current Plan" : "Upgrade"}
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
};









// 'use client'
// import React from 'react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'

// type Props = {
//     onPayment(id: string): void
//     products: any[]
//     tier: string
// }

// export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
//     console.log(products);
//     return (
//         <section className="flex w-full justify-center md:flex-row flex-col gap-6">
//         {products &&
//             products.map((product: any) => (
//                 <Card
//                     key={product.id}
//                     className={`
//                     group relative w-full max-w-sm border 
//                     ${
//                         product.nickname === tier
//                         ? 'border-green-500 shadow-green-500/30'
//                         : 'border-zinc-700 hover:border-purple-500 hover:shadow-purple-500/20'
//                     } 
//                     transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl
//                 `}
//                 >
//                 <CardHeader>
//                     <CardTitle className="text-xl font-semibold text-white">
//                         {product.nickname}
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent className="flex flex-col gap-5 text-sm text-zinc-300">
//                     <CardDescription className="text-zinc-400">
//                         {product.nickname === 'Developer'
//                         ? 'Get a glimpse of the power of AI automation with our Developer plan'
//                         : product.nickname === 'Startup'
//                         ? 'Unlock efficiency and scalability with powerful automation tailored for startups.'
//                         : product.nickname === 'Enterprise'
//                         ? 'End-to-end automation with enterprise-grade performance and flexibility.'
//                         : ''}
//                     </CardDescription>

//                     <div className="flex items-center justify-between text-white">
//                     <p>
//                     {product.nickname === 'Developer'
//                         ? '100'
//                         : product.nickname === 'Startup'
//                         ? '5000'
//                         : 'Unlimited'}{' '}
//                         credits
//                     </p>
//                     <p className="font-bold">
//                     {product.nickname === 'Developer'
//                         ? '$0'
//                         : product.nickname === 'Startup'
//                         ? '$19'
//                     : '$49'}
//                     /mo
//                     </p>
//                     </div>

//                     {product.nickname === tier ? (
//                     <Button disabled variant="outline" className="cursor-not-allowed opacity-60">
//                         Active
//                     </Button>
//                     ) : (
//                     <Button
//                         onClick={() => onPayment(product.id)}
//                         variant="outline"
//                         className="group-hover:border-purple-300 group-hover:text-purple-300"
//                     >
//                         Purchase
//                     </Button>
//                     )}
//                 </CardContent>
//             </Card>
//         ))}
//     </section>
//     )
// }




