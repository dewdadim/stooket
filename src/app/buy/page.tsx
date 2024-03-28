import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { MultiUploader } from '@/components/ui/file-input'

export default function page() {
  return (
    <MaxWidthWrapper>
      <div className="mt-32 text-2xl">
        <MultiUploader />
      </div>
    </MaxWidthWrapper>
  )
}
