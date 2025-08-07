'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import WorkFlowForm from "@/components/forms/workflow-form";
import { useBilling } from "@/providers/billing-provider";
type Props = {}

const WorkflowButton = (props: Props) => {
    const { setOpen , setClose } = useModal()
    const { credits } = useBilling();

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
    <Button 
        className="ml-2 text-black bg-white border-1 border-gray-800 hover:text-white hover:border-white" 
        size={'icon'} 
        // onClick={handleClick}
        {...(credits !=='0' 
            ? {
                onClick:handleClick
            } : {
                disabled:true
            })}
        >
        <Plus />
    </Button>
)
}

export default WorkflowButton