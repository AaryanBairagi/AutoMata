'use client'

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { toast } from "sonner"
import { onFlowPublish } from "../_actions/workflow-connections"

type Props = {
    name: string
    description: string
    id: string
    publish: boolean | null
}

const Workflow = ({ name, description, id, publish }: Props) => {

const [isPublished, setIsPublished] = useState(publish ?? false)

const onPublishFlow = async (event: any) => {
    const response = await onFlowPublish(
        id,
        event.target.ariaChecked === 'false'
    )
    if(response) toast.message(response)
}

const IMAGES = [
    { imgID: 1, src: '/googleDrive.png', alt: 'Google Drive' },
    { imgID: 2, src: '/notion.png', alt: 'Notion' },
    { imgID: 3, src: '/discord.png', alt: 'Discord' }
    ]

return (
    <div className="flex py-6 justify-center">
    <Card className="flex w-full max-w-6xl items-center justify-between border border-white/10 bg-white/5 backdrop-blur-lg p-4 shadow-md rounded-lg">
        
        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
            <Link href={`/workflows/editor/${id}`}>
                <div className="flex items-center gap-4">
                {IMAGES.map((image) => (
                    <Image
                    key={image.imgID}
                    src={image.src}
                    alt={image.alt}
                    height={50}
                    width={50}
                    className="p-1 border-1 rounded-full border-white" />
                ))}
            </div>
            </Link>
        </div>

        {/* MIDDLE */}
        <CardContent className="flex-1 px-4">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center gap-2 p-4">
            <Switch
                checked={isPublished}
                onCheckedChange={async (checked) => {
                setIsPublished(checked)
                const response = await onFlowPublish(id, checked)
                if (response) toast.message(response)
                }}
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600 h-6 w-12 border-1 border-accent-foreground" />

            <Label htmlFor={`workflow-${id}`} className="text-muted-foreground">
                {isPublished ? "ON" : "OFF"}
            </Label>
            
        </div>
    </Card>
    </div>
)
}

export default Workflow










// 'use client'

// import { Card , CardContent } from "@/components/ui/card"
// import Link from "next/link"
// import Image from "next/image"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"

// type Props = {
//     name : string
//     description : string
//     id : string 
//     publish : boolean | null
// }

// const Workflow = ({name,description,id,publish}: Props) => {
//     const IMAGES = [
//         {
//             imgID:1,
//             src:'/googleDrive.png',
//             alt:'Google Drive'
//         },
//         {
//             imgID:2,
//             src:'/notion.png',
//             alt:'Notion'
//         },
//         {
//             imgID:3,
//             src:'/discord.png',
//             alt:'Discord'
//         }
//     ]
        
// return (
//     <div className="flex py-6 justify-center">
//     <Card className="flex w-full max-w-6xl items-center justify-between border border-white/10 bg-white/5 backdrop-blur-lg p-4 shadow-md rounded-lg">
        
//         {/* LEFT SIDE  */}
//         <div className="flex items-center gap-6">
//             <Link href={`/workflows/editor/${id}`}>
//                 <div className="flex items-center gap-4">
//                     {
//                         IMAGES.map((image)=>(
//                             <Image
//                             key={image.imgID} 
//                             src={image.src} 
//                             alt={image.alt}
//                             height={50}
//                             width={50}
//                             className="p-1 border-1 rounded-full border-white/70 " />
//                         ))
//                     }
//                 </div>
//             </Link>
//         </div>

//         <CardContent className="flex-1 px-4">
//             <h3 className="text-lg font-semibold text-white">{name}</h3>
//             <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
//         </CardContent>  
        
//         {/* RIGHT SIDE  */}

// {/* <div className="flex flex-col items-center gap-2 p-4">
//   <Label htmlFor={`workflow-${id}`} className="text-muted-foreground">
//     {publish ? "ON" : "OFF"}
//   </Label>
//   <Switch
//     id={`workflow-${id}`}
//     checked={publish ?? false}
//     onCheckedChange={(checked) => {
//       console.log("Switch toggled:", checked);
//       // TODO: trigger your API or state update here
//     }}
//     className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600 h-6 w-12"
//   />
// </div> */}


//         <div className="flex flex-col items-center gap-2 p-4">
//             <Label htmlFor="airplane-mode" className="text-muted-foreground"> { publish? "ON" : "OFF" } </Label>
//             <Switch
//             id='airplane-mode'
//             // onClick={onPublishFlow}
//             defaultChecked={publish!}
//             className="border border-white/60 " 
//             />
//         </div>

//     </Card>
//     </div>
// )
// }

// export default Workflow