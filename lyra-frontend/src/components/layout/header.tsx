import React from 'react'
import { Button } from '../ui/button'
import CreateEventDialog from '@/features/events/components/create-event-dialog'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LibraryBigIcon } from 'lucide-react'
import LogoutForm from './logout-form'
import UserMenu from './user-menu'

export default function Header({ isAdmin }: { isAdmin: boolean }) {

  return (
    <header className='bg-white h-18 border-b px-8 p-5 flex items-center justify-between'>
        <img
            alt='logo lyra'
            src={'/logo.png'}
            className='h-full object-contain'
        />
        {/* <div className='flex items-center'>
            <Button variant={'ghost'} size={'lg'} className='text-md text-primary hover:bg-white hover:border-primary'>Parcourir</Button>
            <Button variant={'ghost'} size={'lg'} className='text-md text-primary hover:bg-white hover:border-primary'>Historique</Button>
        </div> */}
        <div className='flex items-center gap-4'>
            {isAdmin && <CreateEventDialog/>}
            {/* <Separator orientation='vertical'/> */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserMenu/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-52 mt-2 -ml-2' side='bottom'>
                    <DropdownMenuItem className='text-nowrap'>
                        <LibraryBigIcon/>Événements rejoints
                        </DropdownMenuItem>
                        <LogoutForm />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
  )
}
