"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  user: {
    name: string;
    email: string;
  };
  onUpdate: (name: string) => Promise<any>;
};

export default function ProfileForm({ user, onUpdate }: Props) {
  const [name, setName] = useState(user.name);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        await onUpdate(name);
        toast.success("Profile updated successfully 🚀");
      } catch (err) {
        toast.error("Something went wrong ❌");
      }
    });
  };

  return (
    <div className="space-y-6">

      {/* NAME */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          Full Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border 
                     bg-zinc-900/50 backdrop-blur
                     focus:outline-none focus:ring-2 
                     focus:ring-purple-500
                     transition-all"
        />
      </div>

      {/* EMAIL */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          Email
        </label>

        <input
          value={user.email}
          disabled
          className="w-full px-4 py-3 rounded-xl border 
                     bg-zinc-800/50 text-muted-foreground 
                     cursor-not-allowed"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full py-3 rounded-xl font-medium text-white 
                   bg-purple-600 hover:bg-purple-700
                   transition-all disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}