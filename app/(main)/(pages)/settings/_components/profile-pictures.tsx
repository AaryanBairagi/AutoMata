'use client'

import React from 'react';
import UploadCareButton from './upload-care';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import { X } from 'lucide-react';

type Props = {
    onDelete?: any,
    onUpload?:any,
    userImage:string | null
}

const ProfilePicture = ({userImage , onDelete , onUpload}: Props) => {
    const router = useRouter();
    const deleteProfileImage=async()=>{
        const response = await onDelete();
        if(response) router.refresh();
    }
return (
    <div className='flex flex-col'>
        <p className='text-lg font-semibold text-white'>Profile Picture</p>
        <div className='flex flex-col items-center justify-center h-[30vh]'>
            {userImage? 
            <>
                <div className='relative h-full w-2/12'>
                    <Image src={userImage} alt="User_Image" fill />
                </div>
                <Button onClick={deleteProfileImage} className='bg-transparent text-white/70 hover:text-white hover:bg-transparent'> <X />Remove Logo</Button>
            </> : <UploadCareButton />}
        </div>
    </div>
    )
}

export default ProfilePicture