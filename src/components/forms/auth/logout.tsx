'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function Logout() {
  return (
    <div
      className="flex cursor-pointer items-center justify-start gap-2 rounded-md p-2 hover:bg-primary-foreground"
      onClick={() => {
        signOut()
      }}
    >
      <LogOut />
      <p className="text-sm leading-none">Logout</p>
    </div>
  )
}
