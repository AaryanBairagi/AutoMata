import React from 'react'
import WorkflowButton from './_components/workflow-button'
import WorkFlows from './_components'

type Props = {}

const Page = (props: Props) => {
return (
    <div className="p-6">
        <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-xl p-5 shadow-lg">
    
        <div>
        <h1 className="text-3xl font-semibold text-white">Workflows</h1>
            <p className="text-sm text-zinc-400">Automate your processes visually</p>
        </div>

        <WorkflowButton />
    
        </div>

        <WorkFlows />
    </div>
)
}

export default Page