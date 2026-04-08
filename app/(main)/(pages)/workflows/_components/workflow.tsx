'use client'

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { toast } from "sonner"
import { onFlowPublish, onFlowDelete } from "../_actions/workflow-connections"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

type Props = {
    name: string
    description: string
    id: string
    publish: boolean | null
}

const Workflow = ({ name, description, id, publish }: Props) => {
    const router = useRouter();
    const [isPublished, setIsPublished] = useState(publish ?? false)
    const [isVisible, setIsVisible] = useState(true)

    const handleDelete = async () => {
        const result = await onFlowDelete(id)

        if (result) {
            toast.success("Workflow deleted!")
            setIsVisible(false) 
        } else {
            toast.error("Failed to delete workflow.")
        }
    }

    const IMAGES = [
        { imgID: 1, src: '/googleDrive.png', alt: 'Google Drive' },
        { imgID: 2, src: '/notion.png', alt: 'Notion' },
        { imgID: 3, src: '/discord.png', alt: 'Discord' }
    ]

    if (!isVisible) return null

    return (
        <div className="flex py-6 justify-center">
        <Card 
            onClick={() => router.push(`/workflows/editor/${id}`)}
            className="relative flex w-full max-w-6xl items-center justify-between border border-white/10 bg-white/5 backdrop-blur-lg p-4 shadow-md rounded-lg"
        >
                
        {/* DELETE DIALOG */}
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <button onClick={(e)=> {e.stopPropagation()}} className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 transition-all">
            <Trash2 className="w-4 h-4 text-zinc-400 hover:text-red-400" />
                </button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-zinc-900 border border-zinc-800">
            <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
                Delete Workflow
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
                This action cannot be undone. This will permanently delete your workflow.
            </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
                Cancel
            </AlertDialogCancel>

            <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete()
                }}
            >
             Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>

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
                <div className="flex flex-col items-center gap-3">
  
                <Switch
                    onClick={(e)=>{e.stopPropagation()}}
                    checked={isPublished}
                    onCheckedChange={async (checked) => {
                    setIsPublished(checked)
                    const response = await onFlowPublish(id, checked)
                    if (response) toast.message(response)
                    }}
                />
                
                <p className="text-sm text-zinc-400">
                    {isPublished ? "Active" : "Inactive"}
                </p>

                </div>

            </Card>
        </div>
    )
}

export default Workflow




