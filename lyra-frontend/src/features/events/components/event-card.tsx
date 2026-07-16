'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Event } from '@/features/events/types';
import { colorFromThemeId } from '@/utils/tagColors';
import { UsersRoundIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import RegisterButton from './register-button'
import ExtractButton from './extract-button'

interface props {
	event: Event;
	eventSelectedId: string | undefined;
	setEventSelected: Dispatch<SetStateAction<Event | undefined>>;
	isAdmin: boolean;
}

export default function EventCard({ event, eventSelectedId, setEventSelected, isAdmin }: props) {

	const descRef = useRef<HTMLParagraphElement>(null);
	const [expanded, setExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(false);

	useEffect(() => {
		if (descRef.current) {
			setIsTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
		}
	}, []);

	
	const { title, summary, eventDate, durationMinutes, capacity, remainingSeats, themeName } = event;
	const color = colorFromThemeId(themeName);

	const startTime = new Date(eventDate).getTime();
	const dateFormatted = new Date(startTime).toLocaleDateString('fr-FR', {
		weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
	});
	const startTimeFormatted = new Date(startTime)
		.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
		.replace(':', 'h');
	const endTimeFormatted = new Date(startTime + durationMinutes * 60 * 1000)
		.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
		.replace(':', 'h');

	const registered = capacity - remainingSeats;

	return (
		<Card
			onClick={() => setEventSelected(event)}
			className={cn(
				'transition-transform duration-300 gap-0 ease-in-out cursor-pointer p-0 overflow-hidden',
				`border-${color}-100 hover:shadow-[0_0_20px_rgb(0,0,0,0.2)]`,
				event.id === eventSelectedId && 'scale-105 shadow-[0_0_20px_rgb(0,0,0,0.2)]',
				remainingSeats <= 0 && !event.isRegistered && 'opacity-60',
			)}
		>
			<CardContent className='m-0 p-0'>
				<div className='flex'>
					<div className={`w-6 grid place-content-center bg-${colorFromThemeId(themeName)}-100`} />
					<div className='flex-1 flex flex-col gap-4 p-4'>
						<div className='flex items-start justify-between'>
							<div className='flex items-center gap-2'>
								<Badge className={`px-2 py-3 rounded text-sm bg-${colorFromThemeId(themeName)}-100 text-${colorFromThemeId(themeName)}-600`}>
									{themeName}
								</Badge>
								<p className='text-lg font-semibold'>{title}</p>
							</div>
							<div>
								<p className='text-end'>{dateFormatted}</p>
								<p className='text-end'>{startTimeFormatted} - {endTimeFormatted}</p>
							</div>
						</div>

						<div>
							<p
								ref={descRef}
								className={cn('text-sm text-justify text-muted-foreground', !expanded && 'line-clamp-2')}
							>
								{summary}
							</p>
							{isTruncated && (
								<Button
									variant='link'
									onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
									className='p-0 -mt-1 text-xs text-muted-foreground hover:text-primary'
								>
									{expanded ? 'Voir moins' : 'Voir plus'}
								</Button>
							)}
						</div>

						<div className='flex justify-end items-center gap-4'>
							<Progress value={registered / capacity * 100} className={cn('h-2 bg-zinc-300', remainingSeats <= 0 && '[&>div]:bg-red-300')} />
							<div className='flex items-center gap-1 flex-1'>
								<UsersRoundIcon size={16} />
								<p className='text-nowrap'>{registered}/{capacity}</p>
							</div>
							{isAdmin
								? <ExtractButton eventId={event.id} eventTitle={title} />
								: <RegisterButton eventId={event.id} remainingSeats={remainingSeats} isRegistered={event.isRegistered} />
							}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
