"use client";

import { LayoutDashboard, LogOut, Settings, User2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ProfileToggle() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="size-8 rounded-sm">
          <AvatarImage src={session?.user.image!} alt="Profile" />
          <AvatarFallback className="size-8 rounded-sm bg-secondary">
            IMG
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="w-auto min-w-56" align="center">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-md p-2">
            <Avatar className="size-10 rounded-sm">
              <AvatarImage src={session?.user.image!} alt="Profile" />
              <AvatarFallback className="size-8 rounded-sm bg-secondary">
                IMG
              </AvatarFallback>
            </Avatar>
            <h4 className="font-medium leading-none">{session?.user.name}</h4>
          </div>

          <Separator />

          <div className="flex flex-col">
            <div className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground">
              <User2 />
              <p className="text-sm leading-none">Profile</p>
            </div>
            <div className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground">
              <Settings />
              <p className="text-sm leading-none">Settings</p>
            </div>
            <div className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground">
              <LayoutDashboard />
              <p className="text-sm leading-none">Sales Dashboard</p>
            </div>
          </div>

          <Separator />
          <div
            className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
            onClick={() => {
              signOut();
              router.refresh();
            }}
          >
            <LogOut />
            <p className="text-sm leading-none">Logout</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
