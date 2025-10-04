import React from 'react'
import { Stripe } from 'stripe'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import BillingDashboard from './_components/billing-dashboard'

type Props = {
    searchParams?: { [key: string]: string | undefined }
}

const Billing = async ({ searchParams }: Props) => {
    const session_id = await searchParams?.session_id ?? ''

    if (session_id) {
        const stripe = new Stripe(process.env.STRIPE_SECRET!, {
            typescript: true,
            apiVersion: '2025-07-30.basil',
        })

        const session = await stripe.checkout.sessions.listLineItems(session_id)
        const user = await currentUser()

        const description = session.data?.[0]?.description

        if (user && description) {
            let credits = '0'

            if (description === 'Developer') {
                credits = '100'
            } else if (description === 'Startup') {
                credits = '5000'
            } else if (description === 'Enterprise') {
                credits = 'Unlimited'
            }

            await db.user.update({
                where: {
                    clerkId: user.id
                },
                data: {
                    tier: description,
                    credits
                }
            })
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg'>
                <span>BILLING</span>
            </h1>
            <BillingDashboard />
        </div>
    )
}

export default Billing




