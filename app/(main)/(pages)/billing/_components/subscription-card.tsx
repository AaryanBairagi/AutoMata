'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Props = {
    onPayment(id: string): void
    products: any[]
    tier: string
}

export const SubscriptionCard = ({ onPayment, products, tier }: Props) => {
    console.log(products);
    return (
        <section className="flex w-full justify-center md:flex-row flex-col gap-6">
        {products &&
            products.map((product: any) => (
                <Card
                    key={product.id}
                    className={`
                    group relative w-full max-w-sm border 
                    ${
                        product.nickname === tier
                        ? 'border-green-500 shadow-green-500/30'
                        : 'border-zinc-700 hover:border-purple-500 hover:shadow-purple-500/20'
                    } 
                    transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl
                `}
                >
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-white">
                        {product.nickname}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5 text-sm text-zinc-300">
                    <CardDescription className="text-zinc-400">
                        {product.nickname === 'Developer'
                        ? 'Get a glimpse of the power of AI automation with our Developer plan'
                        : product.nickname === 'Startup'
                        ? 'Unlock efficiency and scalability with powerful automation tailored for startups.'
                        : product.nickname === 'Enterprise'
                        ? 'End-to-end automation with enterprise-grade performance and flexibility.'
                        : ''}
                    </CardDescription>

                    <div className="flex items-center justify-between text-white">
                    <p>
                    {product.nickname === 'Developer'
                        ? '100'
                        : product.nickname === 'Startup'
                        ? '5000'
                        : 'Unlimited'}{' '}
                        credits
                    </p>
                    <p className="font-bold">
                    {product.nickname === 'Developer'
                        ? '$0'
                        : product.nickname === 'Startup'
                        ? '$19'
                    : '$49'}
                    /mo
                    </p>
                    </div>

                    {product.nickname === tier ? (
                    <Button disabled variant="outline" className="cursor-not-allowed opacity-60">
                        Active
                    </Button>
                    ) : (
                    <Button
                        onClick={() => onPayment(product.id)}
                        variant="outline"
                        className="group-hover:border-purple-300 group-hover:text-purple-300"
                    >
                        Purchase
                    </Button>
                    )}
                </CardContent>
            </Card>
        ))}
    </section>
    )
}




