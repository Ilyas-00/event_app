'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Calendar } from '../ui/calendar'
import { Card, CardContent } from '../ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { frCH } from 'react-day-picker/locale'
import { Badge } from '../ui/badge'
import { colorFromThemeId } from '@/utils/tagColors'
import { Theme } from '@/features/themes/types'
import { getThemes } from '@/features/themes/services/theme-service'

export default function FilterBar() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [search, setSearch] = useState(searchParams.get('search') ?? '')
	const [dates, setDates] = useState<Date | undefined>()
	const [themes, setThemes] = useState<Theme[]>([])
	const [selectedThemeId, setSelectedThemeId] = useState(searchParams.get('theme') ?? '')

	useEffect(() => {
		getThemes().then(setThemes)
	}, [])

	useEffect(() => {
		const t = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString())
			if (search) params.set('search', search)
			else params.delete('search')
			router.replace(`${pathname}?${params}`)
		}, 400)
		return () => clearTimeout(t)
	}, [search])

	function handleThemeChange(themeId: string, checked: boolean) {
		const next = checked ? themeId : ''
		setSelectedThemeId(next)
		const params = new URLSearchParams(searchParams.toString())
		if (next) params.set('theme', next)
		else params.delete('theme')
		router.replace(`${pathname}?${params}`)
	}

	function handleDatesChange(selected: Date | undefined) {
		setDates(selected)
		const params = new URLSearchParams(searchParams.toString())
		if (selected) {
			const formatted = [
				selected.getFullYear(),
				String(selected.getMonth() + 1).padStart(2, '0'),
				String(selected.getDate()).padStart(2, '0'),
			].join('-')
			params.set('date', formatted)
		} else {
			params.delete('date')
		}
		router.replace(`${pathname}?${params}`)
	}

	return (
		<aside className='bg-white w-64 shrink-0 border-r p4 space-y6'>
			<div className='p-4 border-b'>
				<p className='font-semibold'>Filtrez votre recherche</p>
			</div>
			<FieldGroup className='gap-0 px4'>
				<Accordion type="multiple" className="max-w-lg border-b">
					<AccordionItem value="title" className='px-4 py-2'>
						<AccordionTrigger>Titre</AccordionTrigger>
						<AccordionContent className='px-1'>
							<Field>
								<FieldLabel className='text-muted-foreground text-xs'>Rechercher par titre</FieldLabel>
								<Input
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									placeholder='Rechercher…'
								/>
							</Field>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="service" className='px-4 py-2'>
						<AccordionTrigger>Catégorie</AccordionTrigger>
						<AccordionContent>
							<FieldGroup className='gap-4 pt-2'>
								{themes.map(theme => (
									<Field key={theme.id} orientation={'horizontal'}>
										<Checkbox
									id={theme.id}
									className='cursor-pointer'
									checked={selectedThemeId === theme.id}
									onCheckedChange={(checked) => handleThemeChange(theme.id, !!checked)}
								/>
										<Label htmlFor={theme.id} className='w-full text-xs cursor-pointer font-medium'>
											<Badge className={`px-2 py-3 rounded text-sm bg-${colorFromThemeId(theme.name)}-100 text-${colorFromThemeId(theme.name)}-600`}>
												{theme.name}
											</Badge>
										</Label>
									</Field>
								))}
							</FieldGroup>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="date" className='px-4 py-2'>
						<AccordionTrigger>Date</AccordionTrigger>
						<AccordionContent>
							<Field>
								<Card className='p-0 w-fit mx-auto ring-0 rounded-none'>
									<CardContent className='p-0'>
										<Calendar
											locale={frCH}
											className='w-full'
											mode='single'
											disabled={{ before: new Date() }}
											selected={dates}
											onSelect={handleDatesChange}
										/>
									</CardContent>
								</Card>
							</Field>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</FieldGroup>
		</aside>
	)
}
