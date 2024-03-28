'use client'

import { useState } from 'react'

import { UploadButton, useUploadThing } from '@/utils/uploadthing'
import { OurFileRouter } from '@/app/api/uploadthing/core'

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([])

  const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      alert('uploaded successfully!')
    },
    onUploadError: () => {
      alert('error occurred while uploading')
    },
    onUploadBegin: () => {
      alert('upload has begun')
    },
  })

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : []

  return (
    <div>
      <UploadButton endpoint="imageUploader" />
    </div>
  )
}
