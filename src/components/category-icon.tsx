import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  icon: string
  title: string
}

export function CategoryCard(data: CategoryCardProps) {
  return (
    <Link href={'#'}>
      <div className="flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-primary-foreground">
        <Image
          className="rounded-md bg-secondary size-16"
          src={data.icon}
          width={100}
          height={100}
          alt={data.title}
        />
        <div className="text-center h-12 w-20">
          <h2 className="font-medium text-wrap">{data.title}</h2>
        </div>
      </div>
    </Link>
  )
}
