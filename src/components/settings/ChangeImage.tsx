'use client'

import { UploadButton } from '@/utils/uploadthing'
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { changeImage } from '@/actions/change-image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface ChangeImageProps {
  user: User
  className?: string
}

export function ChangeImage({ className, user }: ChangeImageProps) {
  const router = useRouter()
  const { data: session, update } = useSession()
  return (
    <div className={className}>
      <div className="flex flex-row flex-wrap">
        <div className="size-32 md:size-40">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={user.image!}
              alt={user.username!}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="w-full space-y-4 py-4 md:ml-4 md:w-64 md:px-2">
          <p className="text-wrap">
            Make sure the profile image is 1:1 ratio for the best result.
          </p>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              toast.dismiss('onUploadBegin')
              changeImage(res[0].url)
              toast.success('Successfuly changed profile image!')
              update({ image: res[0].url })
              router.refresh()
            }}
            onUploadError={() => {
              toast.error('File is too big!')
            }}
            onUploadBegin={() =>
              toast.info('File uploading...', {
                duration: 60000,
                id: 'onUploadBegin',
              })
            }
            content={{
              button({ isUploading }) {
                if (isUploading)
                  return <Loader2 className="size-4 animate-spin" />
                return <h2>Upload an image</h2>
              },
              allowedContent() {
                return <div></div>
              },
            }}
            appearance={{
              button:
                'text-primary bg-none text-sm text-blue-400 hover:underline',
              container: 'w-max flex-row rounded-md',
            }}
          />
        </div>
      </div>
    </div>
  )
}
