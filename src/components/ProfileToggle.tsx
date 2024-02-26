import { LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu'
import { Separator } from './ui/separator'

export function ProfileToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="size-8 rounded-sm">
          <AvatarImage src="https://github.com/dewdadim.png" alt="Profile" />
          <AvatarFallback className="size-8 rounded-sm bg-secondary">
            IMG
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="grid gap-4 py-4 px-2">
          <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
            <Avatar className="size-10 rounded-sm">
              <AvatarImage
                src="https://github.com/dewdadim.png"
                alt="Profile"
              />
              <AvatarFallback>IMG</AvatarFallback>
            </Avatar>
            <h4 className="font-medium leading-none">Nadim Hairi</h4>
          </DropdownMenuItem>

          <Separator />

          <div className="grid gap-2">
            <DropdownMenuItem className="w-full justify-start px-2 flex gap-2 cursor-pointer">
              <Settings />
              <p className="leading-none">Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full justify-start px-2 flex gap-2 cursor-pointer">
              <Settings />
              <p className="leading-none">REcomendation dooo</p>
            </DropdownMenuItem>
          </div>

          <Separator />

          <DropdownMenuItem className="w-full justify-start px-2 flex gap-2 cursor-pointer">
            <LogOut />
            <p className="leading-none">Logout</p>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
