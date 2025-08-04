'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

const CustomSwitch = ({ defaultChecked = false, onChange }: Props) => {
  const [checked, setChecked] = useState(defaultChecked)

  const toggle = () => {
    const newValue = !checked
    setChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        checked ? 'bg-primary' : 'bg-input/80'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out',
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  )
}

export default CustomSwitch
