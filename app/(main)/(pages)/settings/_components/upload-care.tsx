'use client' 

import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import React from 'react'

type Props = {}

const UploadCareButton = (props: Props) => {
return (
    <div>
        <FileUploaderRegular
            sourceList="local, camera, facebook, gdrive"
            classNameUploader="uc-dark uc-gray"
            pubkey="f255023775be6874c593" />
    </div>
    )
}

export default UploadCareButton





