import { cn } from '@/lib/utils'
import { CategoryCard } from './category-icon'
import categories from '@/data/category.json'

export function CategoryList({ className }: { className?: string }) {
  return (
    <div className={cn('mt-4 flex gap-4 overflow-auto', className)}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          icon={category.icon}
          title={category.title}
        />
      ))}
    </div>
  )
}
