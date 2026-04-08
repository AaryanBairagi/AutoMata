import React from 'react'
import Workflow from './workflow'
import { onGetWorkflows } from '../_actions/workflow-connections'
import MoreCredits from './more-credits'

type Props = {}

const WorkFlows = async (props: Props) => {
    const workflows = await onGetWorkflows()
return (
<div className="realtive w-full">
    <section className="p-6 max-w-6xl mx-auto">

  {/* Credits */}
  <div className="mb-6">
    <MoreCredits />
  </div>

  {/* Workflows */}
  {workflows?.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map((flow) => (
        <Workflow key={flow.id} {...flow} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center mt-32 text-center">
      <div className="text-5xl mb-4">⚡</div>
      <h2 className="text-xl font-semibold text-white">
        No workflows yet
      </h2>
      <p className="text-sm text-zinc-400 mt-2">
        Create your first automation to get started
      </p>
    </div>
  )}

    </section>
</div>
)
}

export default WorkFlows



// description='Creating a test workflow'                        
// id="hjgwjhdwqvjhdq"
// name="Automation Workflow"
// publish={false}
