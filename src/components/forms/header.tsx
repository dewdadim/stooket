interface HeaderProps {
  header?: string
  label?: string
}

export const Header = ({ header, label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-3xl font-bold">{header}</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
