'use client'

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Event } from '@/features/events/types';
import { colorFromThemeId, formatEventSchedule } from '@/features/events/utils';
import { CalendarIcon, ClockIcon, MapPinIcon, UserRoundCogIcon, UsersRoundIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import RegisterButton from './register-button';
import ExtractButton from './extract-button';
interface props {
    event: Event | undefined;
    isAdmin: boolean;
}

export default function EventDetails({ event, isAdmin }: props) {

    if (event === undefined) return null

    const { title, summary, description, location, eventDate, durationMinutes, capacity, remainingSeats, themeName, contactTgi } = event;
    const color = colorFromThemeId(themeName);
    const registered = capacity - remainingSeats;

    const { dateFormatted, startTimeFormatted, endTimeFormatted } = formatEventSchedule(eventDate, durationMinutes);

    return (
        <div className="w-full h-full flex flex-col p-2 py-8 bg-white">
            <div className='px-4 flex-1 flex flex-col gap-6'>
                <div className='flex items-center gap-2'>
                    <Badge className={`px-2 py-3 rounded text-sm bg-${color}-100 text-${color}-600`}>
                        {themeName}
                    </Badge>
                    <p className='text-xl font-semibold'>{title}</p>
                </div>

                <div className='flex-1 px-5 flex flex-col space-y-6'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <CalendarIcon />
                            <p className='text-lg'>{dateFormatted}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <ClockIcon />
                            <p className='text-lg'>{startTimeFormatted} - {endTimeFormatted} ({durationMinutes}min)</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <MapPinIcon />
                            <p className='text-lg'>{location}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <UserRoundCogIcon />
                            <p className='text-lg'>{contactTgi}</p>
                        </div>
                    </div>

                    <p className='text-justify text-muted-foreground'>{description ?? summary}</p>
                </div>

                <div className='flex flex-col items-center gap-4 border-t-primary bgprimary px-6 -mx-6 py-8 -my-8 textprimary-foreground'>
                    {isAdmin
                        ? <ExtractButton eventId={event.id} eventTitle={title} size='lg' className='w-full' />
                        : <RegisterButton eventId={event.id} remainingSeats={remainingSeats} isRegistered={event.isRegistered} size='lg' className='w-full' />
                    }
                    <div className='w-full flex items-center gap-4'>
                        <Progress value={registered / capacity * 100} className={cn('h-3 bg-zinc-300', remainingSeats <= 0 && '[&>div]:bg-red-300')} />
                        <div className='flex items-center gap-2'>
                            <UsersRoundIcon />
                            <p className='text-nowrap'>{registered}/{capacity} inscrits</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
