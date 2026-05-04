'use client'
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/components/global/custom-modal";
import WorkFlowForm from "@/components/forms/workflow-form";
import { useBilling } from "@/providers/billing-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          className="ml-2 text-black bg-white border border-gray-800 hover:text-black/80 hover:bg-white/60 hover:border-black/80"
          size="icon"
          {...(credits !== '0' 
            ? { onClick: handleClick }
            : { disabled: true })}
        >
          <Plus />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>Create new Workflow</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

}

export default WorkflowButton