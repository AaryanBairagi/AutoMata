import React, { useMemo } from 'react'
import { EditorCanvasCardType } from '@/lib/types';
import { useEditor } from '@/providers/editor-provider';
import { Position, useNodeId } from '@xyflow/react';
import EditorCanvasIconHelper from './editor-canvas-card-icon-helper';
import CustomHandle from './custom-handle';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

type Props = {}

const EditorCanvasCardSingle = ({data}:{data: EditorCanvasCardType}) => {
    const {dispatch,state} = useEditor();
    const nodeId = useNodeId();
    const logo = useMemo(()=>{
        return <EditorCanvasIconHelper type={data.type} />
    }, [data]);

    return (
    <>
        { data.type !== 'Trigger' && data.type !== 'Google Drive' && ( <CustomHandle type="target" position={Position.Top} style={{zIndex:100}} /> ) }
        <Card onClick={(event)=>{
            event.stopPropagation();
            const val = state.editor.elements.find((n)=> n.id === nodeId);
            if(val) 
                dispatch({
                    type: 'SELECTED_ELEMENT' ,
                    payload : {
                        elements: val
                    }
                })
            }}  
            className="relative w-[280px] rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm shadow-lg dark:border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-xl cursor-pointer" > 
            
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                    <div>{logo}</div>
                    <div>
                        <CardTitle className="text-base font-semibold text-white">{data.title}</CardTitle>
                        <CardDescription className="mt-1 space-y-1 text-sm text-white/70">
                            <p className="text-xs font-mono text-white/30">ID: {nodeId}</p>
                            <p>{data.description}</p>
                        </CardDescription>
                    </div>
                </CardHeader>
                <Badge variant="secondary" className="absolute right-2 top-2">{data.type}</Badge>
                <div className={clsx('absolute left-3 top-4 h-2 w-2 rounded-full' , 
                    {'bg-green-500':Math.random() <0.6 , 
                    'bg-orange-500':Math.random() >=0.6 && Math.random() < 0.8 , 
                    'bg-red-500': Math.random() >=0.8 } )}>
                </div>
            </Card>
            <CustomHandle type="source" position={Position.Bottom} style={{ zIndex: 100 }} id="a" />
    </>
    )
}

export default EditorCanvasCardSingle