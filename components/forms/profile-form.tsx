'use client'

import React, { use , useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EditUserProfileSchema } from '@/lib/types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'

type Props = {
  user: any
  onUpdate?: any
}

const ProfileForm = ({ user, onUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: 'onChange',
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      
    
    name: user.name,
    email: user.email,
    },
  })

  const handleSubmit = async (
    values: z.infer<typeof EditUserProfileSchema>
  ) => {
    setIsLoading(true)
    await onUpdate(values.name)
    setIsLoading(false)
  }

  useEffect(() => {
    form.reset({ name: user.name, email: user.email })
  }, [user])

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User full name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={true}
                  placeholder="Email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={`relative overflow-hidden w-[160px] border-1 border-black text-center px-6 py-3 font-medium text-white transition-all duration-300 
              rounded-lg shadow-md bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 
              hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600
              focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50`} >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            'Save User Settings'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm




// 'use client'
// import React , {useEffect, useState} from 'react'
// import { useForm } from 'react-hook-form';
// import z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { EditUserProfileSchema } from '@/lib/types';
// import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from '../ui/form';
// import { Input } from '../ui/input';
// import { Button } from '../ui/button';
// import { Loader2 } from 'lucide-react';

// type Props = {
//     user:any,
//     onUpdate?:any
// }

// const ProfileForm = ({user,onUpdate}: Props) => {
// const [isLoading , setIsLoading] = useState();

// const form = useForm<z.infer<typeof EditUserProfileSchema>>({
//     resolver: zodResolver(EditUserProfileSchema),
//     defaultValues: {
//     name: user.name,
//     email:user.email,
//     },
// })


// const handleSubmit = async(
//     values:z.infer<typeof EditUserProfileSchema>
// )=>{
//     setIsLoading(true)
//     await onUpdate(values.name)
//     setIsLoading(false)
// }

// useEffect(()=>{
//     form.reset({ name:user.name , email:user.email})
// } , [user]);
// return(
//     <Form {...form} >
//         <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>

//             {/* NAME FIELD */}

//             <FormField disabled={isLoading} control={form.control} name="name" 
//             render={ ( {field} ) => (
//                 <FormItem>
//                     <FormLabel className="text-lg">Use Full Name</FormLabel>
//                     <FormControl>
//                         <Input placeholder="Name" {...field} />
//                     </FormControl>
//                 <FormMessage />
//                 </FormItem>
//             )} />

//             {/* EMAIL FIELD */}

//             <FormField disabled={isLoading || true} control={form.control} name="email" 
//             render={
//                 ({field})=>(
//                     <FormItem>
//                         <FormLabel className='text-lg'>Use Email</FormLabel>
//                         <FormControl>
//                             <Input placeholder="Email" type="email" {...field} />
//                         </FormControl>
//                     <FormMessage />
//                     </FormItem>
//                 )
//             } />

//             <Button type="submit" className='self-start bg-white text-[#2F006B] hover:bg-[#2F006B] hover:text-white hover:border-[1px]'>
//                 {isLoading ? <><Loader2 className="h-4 w-4 mr-0.5 animate-spin" />Saving</>: 'Save User Settings'}
//             </Button>
//         </form>
//     </Form>
//     )   
// }

// export default ProfileForm



