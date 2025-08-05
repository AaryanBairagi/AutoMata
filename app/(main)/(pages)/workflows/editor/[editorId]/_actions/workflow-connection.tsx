'use server'

import { db } from '@/lib/db'

export const onCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string[]
) => {
  const existingFlow = await db.workflows.findUnique({
    where: { id: flowId },
  });

  if (!existingFlow) {
    console.error(`Workflow not found for update (ID: ${flowId})`);
    return { error: 'Workflow not found' };
  }

  const flow = await db.workflows.update({
    where: { id: flowId },
    data: { nodes, edges, flowPath },
  });

  return { message: 'Flow saved' };
};


export const onFlowPublish = async (workflowId: string, state: boolean) => {
  console.log("Requested publish update for workflow:", workflowId, "State:", state);

  const existing = await db.workflows.findUnique({
    where: { id: workflowId },
  });

  if (!existing) {
    console.error(`Workflow not found for publish (ID: ${workflowId})`);
    return 'Workflow not found';
  }

  const published = await db.workflows.update({
    where: { id: workflowId },
    data: { publish: state },
  });

  return published.publish ? 'Workflow published' : 'Workflow unpublished';
};


export const getWorkflowById = async (workflowId: string) => {
  const workflow = await db.workflows.findUnique({
    where: {
      id: workflowId,
    },
  });

  return workflow;
};

