"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadThing";

type Props = {
  onUploadComplete: (url: string) => void;
};

export default function ProfilePictureUpload({ onUploadComplete }: Props) {
  return (
    <UploadButton<OurFileRouter>
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
      }}
    />
  );
}