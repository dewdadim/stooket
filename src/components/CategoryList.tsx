import { cn } from "@/lib/utils"
import { CategoryCard } from "./category-icon"

export function CategoryList({ className }: { className?: string }) {
  return (
    <div className={cn("mt-4 flex gap-4 overflow-auto", className)}>
      <CategoryCard
        icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        title="Free Items"
      />
      <CategoryCard
        icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        title="Foods & Drinks"
      />
      <CategoryCard
        icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        title="Services"
      />
      <CategoryCard
        icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        title="Tech & Gadgets"
      />
      <CategoryCard
        icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        title="Hobby"
      />
    </div>
  )
}
