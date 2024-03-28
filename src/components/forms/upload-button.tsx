'use client'

import { UploadButton } from '@/utils/uploadthing'
import { utapi } from '@/server/uploadthing'

export async function OurUploadButton() {
  const del = await utapi.deleteFiles('dw')

  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </>
  )
}
