'use client'

import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useSession } from 'next-auth/react'

export default function UserMenu() {

  const { data: session } = useSession() 

    const payload = session?.accessToken
    ? JSON.parse(atob(session.accessToken.split('.')[1]))
    : {}

  const { email, name, preferred_username: tgi, family_name: lastname, given_name: firstname } = payload


  return (
    <div className='flex items-center gap-2 cursor-pointer roundedmd py-4 px-2 -my-1 -mx-2 hover:bg-zinc-100'>
      <Avatar size='lg'>
          <AvatarFallback className='border border-primary bg-white text-primary font-semibold text-lg uppercase'>{firstname?.[0]}{lastname?.[0]}</AvatarFallback>
      </Avatar>
      <div className='text-start'>
          <p className='text-sm'>{name}</p>
          <p className='text-xs text-muted-foreground uppercase'>{tgi}</p>
      </div>
    </div>
  )
}
