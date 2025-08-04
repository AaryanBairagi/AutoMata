import React from 'react'
import Workflow from './workflow'
import { onGetWorkflows } from '../_actions/workflow-connections'

type Props = {}

const WorkFlows = async (props: Props) => {
    const workflows = await onGetWorkflows()
return (
    <div className="realtive flex flex-col gap-4">
        <section className='flex flex-col gap-4 p-6'>
            {
                workflows?.length
                ? workflows.map((flow)=>(
                    <Workflow 
                        key={flow.id}
                        {...flow}
                    />  )) 
                : (
                    <div className='mt-28 text-muted-foreground flex items-center justify-center'>No WorkFlows</div>
                ) }
        </section>
    </div>
)
}

export default WorkFlows



                        // description='Creating a test workflow'
                        // id="hjgwjhdwqvjhdq"
                        // name="Automation Workflow"
                        // publish={false}
