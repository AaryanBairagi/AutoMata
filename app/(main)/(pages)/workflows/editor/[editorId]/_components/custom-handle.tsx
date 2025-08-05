import React, { CSSProperties } from 'react'
import { HandleProps , Handle , useStore } from '@xyflow/react'
import { useEditor } from '@/providers/editor-provider'


type Props = HandleProps & {style?: CSSProperties}

const selector = (s : any) => ({
    nodeInternals : s.nodeInternals,
    edges: s.edges
})

const CustomHandle = (props: Props) => {
    const {state} = useEditor();
    const { nodeInternals , edges } = useStore(selector);
    
    return <Handle {...props} 
        isValidConnection={(e) => {
            const sourcesFromHandleInState = state.editor.edges.filter((edge) => edge.source === e.source).length
            const sourceNode = state.editor.elements.find((node) => node.id === e.source)
            //target
            const targetFromHandleInState = state.editor.edges.filter((edge) => edge.target === e.target).length

            if (targetFromHandleInState === 1) return false
            if (sourceNode?.type === 'Condition') return true
            if (sourcesFromHandleInState < 1) return true
            return false
        }}
        className="!h-3 !w-3 bg-primary dark:bg-neutral-200 border border-black" />
}

export default CustomHandle