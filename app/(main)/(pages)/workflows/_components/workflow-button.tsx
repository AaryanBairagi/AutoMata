'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import WorkFlowForm from "@/components/forms/workflow-form";
type Props = {}

const WorkflowButton = (props: Props) => {
    const { setOpen , setClose } = useModal()

    const handleClick=()=>{
        setOpen(
            <CustomModal 
            title="Create a Workflow Automation"
            subheading="Workflows are a powerful tool that help you automate your tasks">
                <WorkFlowForm/>
            </CustomModal>
        )
    }

return (
    <Button className="ml-2 text-black bg-white border-1 border-gray-800 hover:text-white hover:border-white" size={'icon'} onClick={handleClick}>
        <Plus />
    </Button>
)
}

export default WorkflowButton