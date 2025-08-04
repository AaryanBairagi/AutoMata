import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'


const Navbar = () => {
  return (
    <div>
        <header className='fixed left-0 right-0 top-0 bg-black/40 backdrop-blur-lg py-4 px-4 z-[100]
        flex items-center justify-between border-b border-gray-800'>

          {/* LeftSide Logo */}
          <aside className='flex items-center gap-2'>
            <p className='text-3xl font-bold'>Auto</p>
            <Image 
                src="/fuzzieLogo.png" 
                alt="Image" height={15} width={15} className='shadow-md' /> 
            <p className='text-3xl font-bold'>Mata</p>
          </aside>

          {/* Central Navigation Links */}
          <nav className='absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block'>
            <ul className='flex items-center gap-4 list-none'>
              <li>
                <Link href='#'>Products</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">Clients</Link>
              </li>
              <li>
                <Link href="#">Resources</Link>
              </li>
              <li>
                <Link href="#">Documentation</Link>
              </li>
              <li>
                <Link href="#">Enterprise</Link>
              </li>
            </ul>
          </nav>

          {/* RightSide Button */}
          <aside>
            <Link href='/dashboard' className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] 
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">

            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
            bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full
            bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">

              Dashboard

            </span>
          </Link>

          <Link href="/sign-in" className="ml-3 relative inline-flex h-10 overflow-hidden rounded-full p-[1px] 
            focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">

            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] 
              bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full
            bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">

              Login

            </span>
          </Link>
          {/* Menu Icon */}

          <MenuIcon className='md:hidden' />
          </aside>
        </header>
    </div>
  )
}

export default Navbar