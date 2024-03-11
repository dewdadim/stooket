import Image from "next/image"
import Link from "next/link"

interface CategoryCardProps {
  icon: string
  title: string
}

export function CategoryCard(data: CategoryCardProps) {
  return (
    <Link href={"#"}>
      <div className="flex flex-col items-center gap-1 rounded-sm p-2 hover:bg-primary-foreground">
        <Image
          className="size-16 rounded-md bg-secondary"
          src={data.icon}
          width={100}
          height={100}
          alt={data.title}
        />
        <div className="h-12 w-20 text-center">
          <h2 className="text-wrap font-medium">{data.title}</h2>
        </div>
      </div>
    </Link>
  )
}
