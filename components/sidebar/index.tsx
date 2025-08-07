'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { sidebar } from '@/lib/constant';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Separator } from '../ui/separator';
import { Database, GitBranch, LucideMousePointer } from 'lucide-react';
import { ModeToggle } from '../global/mode-toggle';

const SideBar = () => {
    const pathname = usePathname();

    return (
        <nav className='flex flex-col border items-center justify-between gap-10 py-6 px-2 w-24 min-h-screen flex-shrink-0 bg-background border-muted-foreground/20'>
            <div className="flex flex-col items-center gap-8 overflow-y-auto hide-scrollbar">
            <Link href="/" className="font-bold text-white text-lg tracking-tight hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition duration-300">
                automata.
            </Link>

            <ul className="flex flex-col items-center gap-6">
            <TooltipProvider>
                {sidebar.map((item) => {
                    const Icon = item.Component;
                    const isActive = pathname === item.href;

                    return (
                    <Tooltip key={item.name} delayDuration={0}>
                    <TooltipTrigger asChild>
                    <li className="relative list-none">
                        {isActive && (
                            <span className="absolute -left-3 h-10 w-1 rounded-full bg-purple-400" />
                        )}
                        <Link href={item.href} className={clsx('group h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110', { 'bg-[#EEE0FF] dark:bg-[#2F006B]': isActive, })} >
                            <Icon selected={isActive} />
                        </Link>
                    </li>
                    </TooltipTrigger>
                    <TooltipContent
                        side="right"
                        className="bg-[#f3e8ff] text-[#3b0764] border border-[#e9d5ff] shadow-sm px-3 py-1 rounded-md text-sm font-medium backdrop-blur-sm">
                    <p>{item.name}</p>
                    </TooltipContent>
                </Tooltip>
                );
            })}
            </TooltipProvider>
            </ul>

        <Separator className="my-4" />

        <div className="flex flex-col items-center gap-6 px-2 py-4 border border-white/20 rounded-full bg-white/5 dark:bg-[#353346]/30 hover:bg-[#EEE0FF] dark:hover:bg-purple-300 hover:text-black transition-all duration-200">
            {[LucideMousePointer, GitBranch, Database].map((Icon, i) => (
                <div key={i} className="relative p-2 rounded-full border border-black/10 dark:border-t-2 dark:border-t-[#353346]
                    hover:bg-[#EEE0FF] dark:hover:bg-[#2e006bfa] hover:text-black dark:hover:text-white
                    transition-all duration-200" >
                    <Icon size={20} className="text-white dark:text-white transtion-colors" />
                    {i !== 2 && (
                    <div className="absolute left-1/2 h-6 border-l-2 border-muted-foreground/50 transform -translate-x-1/2 -bottom-[30px]" />
                    )}
                </div>
            ))}
        </div>
        </div>

        <div className="flex flex-col items-center gap-4">
            <ModeToggle />
        </div>
    </nav>
    );
};

export default SideBar;







