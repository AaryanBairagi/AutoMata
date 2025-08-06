import React from 'react';
import { Book, Headphones, Search } from 'lucide-react';
import { TooltipProvider , Tooltip , TooltipContent , TooltipTrigger } from '../ui/tooltip';
import {Input} from '../ui/input';
import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

type Props = {}

const InfoBar = async (props: Props) => {
    const user = await currentUser()
return (
    <div className="flex flex-row justify-end px-4 py-4 w-full border-t border-r border-muted-foreground/20 items-center gap-6 dark:bg-black">
        <span className='flex items-center bg-muted px-4 rounded-full'>
            <Search />
            <Input placeholder="Quick Search" className="border-none" />
        </span>
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    <Headphones />
                </TooltipTrigger>
                <TooltipContent className="bg-[#f3e8ff] text-[#3b0764] border border-[#e9d5ff] shadow-sm px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm">
                    <p>Contact Support</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    <Book />
                </TooltipTrigger>
                <TooltipContent className="bg-[#f3e8ff] text-[#3b0764] border border-[#e9d5ff] shadow-sm px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm">
                    <p>Guide</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
                { user && 
                    (<UserButton afterSignOutUrl='/' appearance={{
                        elements:{
                        userButtonBox: "flex items-center justify-center border border-gray-700 rounded-full mx-1.5 shadow-sm hover:border-white transition-colors mt-1",            }
                        }} /> 
                )}
    </div>
)
}

export default InfoBar