import React from 'react'
import WorkflowButton from './_components/workflow-button'
import WorkFlows from './_components'

type Props = {}

const Page = (props: Props) => {
return (
    <div className='flex flex-col gap-4 relative'>
        <h1 className='text-4xl p-6 flex items-center border-2 border-white/60 rounded-lg bg-background/50 backdrop-blur-lg'>
            WORKFLOWS
            <WorkflowButton />
        </h1>
        <WorkFlows />
    </div>
)
}

export default Page