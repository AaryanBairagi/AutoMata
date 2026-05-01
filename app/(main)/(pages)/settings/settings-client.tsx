"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfilePictureUpload from "@/components/global/profile-pictures";
import ProfileForm from "@/components/forms/profile-form";
import PageHeader from "@/components/global/page-header";
import { updateUserImage, updateUserName } from "./_actions/settings-action";
import { toast } from "sonner";

type Props = {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
};

export default function SettingsClient({ user }: Props) {
  const [image, setImage] = useState(user?.image || null);
  const router = useRouter();

  const handleUpload = async (url: string) => {
    try {
      setImage(url);
      await updateUserImage(url);
      toast.success("Profile picture updated 📸");
      router.refresh();
    } catch {
      toast.error("Upload failed ❌");
    }
  };

  return (
    <div className="w-full px-6 py-10 space-y-8">

      {/* HEADER */}
      <PageHeader
        title="Settings"
        subtitle="Manage your profile and account preferences"
      />

      {/* CENTERED CONTENT */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl space-y-8">

          {/* ================= PROFILE CARD ================= */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 to-pink-500/20">
            <div className="p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10">

              <h2 className="text-lg font-semibold mb-6 text-white">
                Profile
              </h2>

              <div className="flex items-center gap-6">

                {/* AVATAR */}
                <div className="relative group">
                  <img
                    src={image || "/default-avatar.png"}
                    className="w-20 h-20 rounded-full object-cover border border-white/20"
                  />

                  {/* HOVER OVERLAY */}
                  <div className="
                    absolute inset-0 rounded-full bg-black/40 
                    opacity-0 group-hover:opacity-100 
                    transition flex items-center justify-center text-xs text-white
                  ">
                    Change
                  </div>
                </div>

                {/* UPLOAD */}
                <div>
                  <ProfilePictureUpload onUploadComplete={handleUpload} />

                  <p className="text-xs text-zinc-400 mt-2">
                    PNG, JPG up to 4MB
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ================= ACCOUNT CARD ================= */}
          <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 to-pink-500/20">
            <div className="p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10">

              <h2 className="text-lg font-semibold mb-6 text-white">
                Account Info
              </h2>

              <ProfileForm
                user={{
                  name: user?.name || "",
                  email: user?.email || "",
                }}
                onUpdate={updateUserName}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}










// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import ProfilePictureUpload from "@/components/global/profile-pictures";
// import ProfileForm from "@/components/forms/profile-form";
// import { updateUserImage, updateUserName } from "./_actions/settings-action";
// import { toast } from "sonner";
// import PageHeader from "@/components/global/page-header";

// type Props = {
//   user: {
//     name: string;
//     email: string;
//     image: string | null;
//   };
// };

// export default function SettingsClient({ user }: Props) {
//   const [image, setImage] = useState(user?.image || null);
//   const router = useRouter();

//   const handleUpload = async (url: string) => {
//     try {
//       setImage(url);
//       await updateUserImage(url);
//       toast.success("Profile picture updated 📸");
//       router.refresh();
//     } catch {
//       toast.error("Upload failed ❌");
//     }
//   };

//   return (
//       <div className="w-full px-6 py-10 space-y-8">

//            <PageHeader
//             title="Settings"
//             subtitle="Manage your profile and account preferences"
//             />


//         {/* PROFILE CARD */}
//         <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 to-pink-500/20">
//           <div className="p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10">

//             <h2 className="text-lg font-semibold mb-6">Profile</h2>

//             <div className="flex items-center gap-6">

//               {/* AVATAR */}
//               <div className="relative group">
//                 <img
//                   src={image || "/default-avatar.png"}
//                   className="w-20 h-20 rounded-full object-cover border border-white/20"
//                 />

//                 {/* overlay effect */}
//                 <div className="absolute inset-0 rounded-full bg-black/40 
//                                 opacity-0 group-hover:opacity-100 
//                                 transition flex items-center justify-center text-xs">
//                   Change
//                 </div>
//               </div>

//               {/* UPLOAD BUTTON */}
//               <div>
//                 <ProfilePictureUpload onUploadComplete={handleUpload} />

//                 <p className="text-xs text-muted-foreground mt-2">
//                   PNG, JPG up to 4MB
//                 </p>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* ACCOUNT CARD */}
//         <div className="p-[1px] rounded-2xl bg-gradient-to-br from-purple-600/40 to-pink-500/20">
//           <div className="p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-white/10">

//             <h2 className="text-lg font-semibold mb-6">Account Info</h2>

//             <ProfileForm
//               user={{
//                 name: user?.name || "",
//                 email: user?.email || "",
//               }}
//               onUpdate={updateUserName}
//             />
//           </div>
//         </div>

//       </div>
//   );
// }
