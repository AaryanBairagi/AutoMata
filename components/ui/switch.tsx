"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
      "peer inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-zinc-700 shadow-sm transition-all outline-none",
      "data-[state=checked]:bg-green-400 data-[state=unchecked]:bg-zinc-700",
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className="block h-6 w-6 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1"
    />
  </SwitchPrimitive.Root>
  )
}

export { Switch }
