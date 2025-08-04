'use client'

import { useEffect, useState } from "react"

import ProfilePicture from './_components/profile-pictures'
import ProfileForm from '@/components/forms/profile-form'
import { getCurrentUserData, removeProfileImage, updateUserName, uploadProfileImage } from "./_actions/settings-action"

export default function SettingsClient() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
        const data = await getCurrentUserData()
        setUser(data)
        }
        fetchData()
    }, [])

    if (!user) return <div className="p-6 text-white">Loading user settings...</div>

    return (
        <div className="flex flex-col gap-4">
            <h1 className="z-[10] flex items-center justify-between border-b bg-background p-6 text-4xl">
            <span>Settings</span>
            </h1>

            <div className="flex flex-col gap-10 p-6">
                <div>
                <h2 className="text-2xl font-bold">User Profile</h2>
                <p className="text-base text-white/50">Add or update your information</p>
                </div>

                <ProfilePicture
                    onDelete={removeProfileImage}
                    userImage={user?.profileImage || ''}
                    onUpload={uploadProfileImage}
                />

                <ProfileForm
                    user={user}
                    onUpdate={updateUserName}
                />
            </div>
        </div>
    )
}
