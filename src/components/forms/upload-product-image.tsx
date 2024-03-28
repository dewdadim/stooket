import React, { useState } from 'react'
import { toast } from 'sonner'
import { deleteFiles } from '@/server/uploadthing'
import { Loader2, X } from 'lucide-react'
import { AspectRatio } from '../ui/aspect-ratio'
import { UploadButton } from '@/utils/uploadthing'
import Image from 'next/image'

interface productImageProps {
  id: number
  value: { url: string }
}

export let productImages: productImageProps[]

const ImageInput = () => {
  const [imagePreviews, setImagePreview] = useState<productImageProps[]>([])

  const addImagePreview = (url: string) => {
    setImagePreview([
      ...imagePreviews,
      {
        id: imagePreviews.length,
        value: {
          url: url,
        },
      },
    ])
  }

  const deleteImagePreview = async (imagePreview: string) => {
    try {
      const UUID = imagePreview.split('/').slice(-1)[0]
      await deleteFiles(UUID)
      setImagePreview(imagePreviews.filter((a) => a.value.url !== imagePreview))
      productImages.filter((a) => a.value.url !== imagePreview)

      console.log(imagePreviews)
    } catch (error) {
      console.error(error)
    }
  }

  // const [imagePreviews, setImagePreview] = useState<imageProps[]>([])
  // const [currentImageURL, setCurrentImageURL] = useState()

  // const addImagePreview = (url: string) => {
  //   setImagePreview([
  //     ...imagePreviews,
  //     {
  //       id: imagePreviews.length,
  //       value: {
  //         url: url,
  //       },
  //     },
  //   ])
  // }

  // const deleteImagePreview = async (imagePreview: string) => {
  //   try {
  //     const UUID = imagePreview.split('/').slice(-1)[0]
  //     await deleteFiles(UUID)
  //     setImagePreview(imagePreviews.filter((a) => a.value.url !== imagePreview))

  //     console.log(imagePreviews)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const { fields, append, remove } = useFieldArray({
  //   name: 'productImages',
  //   control: form.control,
  // })

  return (
    <div className="overflow-auto">
      <div className="flex flex-wrap gap-4 md:gap-2">
        {imagePreviews.map((imagePreview) => (
          <div
            className="size-40 rounded-md bg-slate-400 md:size-36"
            key={imagePreview.id}
          >
            <div className="absolute z-10 flex size-40 items-center justify-center rounded-md opacity-0 hover:bg-black hover:bg-opacity-45 hover:opacity-100 md:size-36">
              <X
                className="z-10 size-10 cursor-pointer rounded-md"
                onClick={() => {
                  deleteImagePreview(imagePreview.value.url)
                }}
                color="#ffff"
              />
            </div>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={imagePreview.value.url}
                alt="image"
                className="rounded-md object-cover"
                fill
              />
            </AspectRatio>
          </div>
        ))}
        {imagePreviews.length < 4 ? (
          <div className="flex size-40 items-center justify-center rounded-md border-2 border-dashed border-secondary md:size-36">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                addImagePreview(res[0].url)
                productImages.push({
                  id: imagePreviews.length,
                  value: { url: res[0].url },
                })
                toast.dismiss('onUploadBegin')
                toast.success('File uploaded!')
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
                },
                allowedContent() {
                  return <div>Image (max 4MB)</div>
                },
              }}
              appearance={{
                container:
                  'size-36 bg-slate-400 bg-opacity-0 hover:bg-opacity-10',
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ImageInput

{
  /* <div>
          <div>Product Images</div>
          <div>
            <div className="overflow-auto">
              <div>
                <div className="flex flex-wrap gap-4 md:gap-2">
                  {imagePreviews.map((imagePreview) => (
                    <div
                      className="size-40 rounded-md bg-slate-400 md:size-36"
                      key={imagePreview.id}
                    >
                      <div className="absolute z-10 flex size-40 items-center justify-center rounded-md opacity-0 hover:bg-black hover:bg-opacity-45 hover:opacity-100 md:size-36">
                        <X
                          className="z-10 size-10 cursor-pointer rounded-md"
                          onClick={() => {
                            remove(imagePreview.id)
                            deleteImagePreview(imagePreview.value.url)
                          }}
                          color="#ffff"
                        />
                      </div>
                      <AspectRatio ratio={1 / 1}>
                        <Image
                          src={imagePreview.value.url}
                          alt="image"
                          className="rounded-md object-cover"
                          fill
                        />
                      </AspectRatio>
                    </div>
                  ))}
                  {imagePreviews.length < 4 ? (
                    <div className="flex size-40 items-center justify-center rounded-md border-2 border-dashed border-secondary md:size-36">
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          addImagePreview(res[0].url)
                          append({ url: res[0].url })
                          toast.dismiss('onUploadBegin')
                          toast.success('File uploaded!')
                          console.log(imagePreviews[1])
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
                          },
                          allowedContent() {
                            return <div>Image (max 4MB)</div>
                          },
                        }}
                        appearance={{
                          container:
                            'size-36 bg-slate-400 bg-opacity-0 hover:bg-opacity-10',
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div> */
}

{
  /* {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`productImages.${index}.url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Product Images URL
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))} */
}
