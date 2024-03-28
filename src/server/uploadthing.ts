'use server'

import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

export async function deleteFiles(url: string) {
  console.log('deleting', url)
  await utapi.deleteFiles(url)
}
