'use client'

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CircleAlertIcon } from 'lucide-react'
import { useTransition, useState } from 'react'
import { toast } from 'sonner'
import { createEvent } from '../services/event-actions'
import { useThemes } from '@/features/themes/hooks/useThemes'

const emptyForm = {
    title: '',
    summary: '',
    description: '',
    contactTgi: '',
    contactEmail: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    themeId: '',
}

function calcDurationMinutes(startTime: string, endTime: string): number {
    const [sh, sm] = startTime.split(':').map(Number)
    const [eh, em] = endTime.split(':').map(Number)
    return (eh * 60 + em) - (sh * 60 + sm)
}

export default function CreateEventDialog() {
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [form, setForm] = useState(emptyForm)
    const [isPending, startTransition] = useTransition()
    const themes = useThemes()

    function set(field: keyof typeof emptyForm) {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

    function handleClear() {
        setForm(emptyForm)
    }

    function handleSubmit() {
        const durationMinutes = calcDurationMinutes(form.startTime, form.endTime)
        if (durationMinutes <= 0) {
            toast.error("L'heure de fin doit être après l'heure de départ.")
            return
        }

        startTransition(async () => {
            try {
                await createEvent({
                    title: form.title,
                    summary: form.summary,
                    description: form.description,
                    contactTgi: form.contactTgi,
                    contactEmail: form.contactEmail,
                    location: form.location,
                    eventDate: `${form.date}T${form.startTime}:00`,
                    durationMinutes,
                    themeId: form.themeId,
                    capacity: Number(form.capacity),
                })
                toast.success("Événement créé avec succès.")
                setForm(emptyForm)
                setOpen(false)
            } catch {
                toast.error("Erreur lors de la création de l'événement.")
            }
        })
    }

    return (
        <>
            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) setAlertOpen(true); }}>
                <DialogTrigger asChild>
                    <Button size={'lg'}>Créer un événement</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-xl'>Créer un événement</DialogTitle>
                        <div className='bg-destructive/10 p-2 flex gap-2 rounded-tr-lg rounded-bl-lg'>
                            <CircleAlertIcon size={18} className='text-destructive/50' />
                            <p className='text-destructive/50'>Dans le cas de la création d'une formation, veuillez utiliser la plateforme <strong>Ulearn</strong>.</p>
                        </div>
                    </DialogHeader>

                    <FieldGroup>
                        <div className='grid grid-cols-6 gap-4'>
                            <Field className='col-span-4'>
                                <FieldLabel>Titre</FieldLabel>
                                <Input value={form.title} onChange={set('title')} />
                            </Field>
                            <Field className='col-span-2'>
                                <FieldLabel>Thème</FieldLabel>
                                <Select value={form.themeId} onValueChange={(v) => setForm(prev => ({ ...prev, themeId: v }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {themes.map(t => (
                                                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                            <Field className='col-span-6'>
                                <FieldLabel>Résumé</FieldLabel>
                                <Input value={form.summary} onChange={set('summary')} />
                            </Field>
                            <Field className='col-span-3'>
                                <FieldLabel>TGI contact</FieldLabel>
                                <Input value={form.contactTgi} onChange={set('contactTgi')} />
                            </Field>
                            <Field className='col-span-3'>
                                <FieldLabel>Email contact</FieldLabel>
                                <Input type='email' value={form.contactEmail} onChange={set('contactEmail')} />
                            </Field>
                            <Field className='col-span-6'>
                                <FieldLabel>Date</FieldLabel>
                                <Input type='date' value={form.date} onChange={set('date')} />
                            </Field>
                            <Field className='col-span-3'>
                                <FieldLabel>Heure de départ</FieldLabel>
                                <Input type='time' value={form.startTime} onChange={set('startTime')} />
                            </Field>
                            <Field className='col-span-3'>
                                <FieldLabel>Heure de fin</FieldLabel>
                                <Input type='time' value={form.endTime} onChange={set('endTime')} />
                            </Field>
                            <Field className='col-span-4'>
                                <FieldLabel>Lieu</FieldLabel>
                                <Input value={form.location} onChange={set('location')} />
                            </Field>
                            <Field className='col-span-2'>
                                <FieldLabel>Places disponibles</FieldLabel>
                                <Input type='number' min={1} value={form.capacity} onChange={set('capacity')} />
                            </Field>
                            <Field className='col-span-6'>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea rows={3} value={form.description} onChange={set('description')} />
                            </Field>
                        </div>
                    </FieldGroup>

                    <DialogFooter>
                        <div className='w-full flex justify-between'>
                            <Button variant={'ghost'} onClick={handleClear} disabled={isPending}>
                                Effacer
                            </Button>
                            <div className='flex gap-4'>
                                <DialogClose asChild>
                                    <Button variant={'outline'} disabled={isPending}>Annuler</Button>
                                </DialogClose>
                                <Button onClick={handleSubmit} disabled={isPending}>
                                    {isPending ? 'Création…' : "Créer l'événement"}
                                </Button>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent className="sm:max-w-xl!">
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-xl flex items-center gap-2'>
                            <CircleAlertIcon size={24} /> Lyra - Avertissement
                        </AlertDialogTitle>
                        <div className='p-2 flex gap-5 rounded-tr-lg rounded-bl-lg'>
                            <ul className='list-disc pl-4 text-justify'>
                                <li className='font-semibold'>
                                    Les données classées au dessus du niveau C2, ou les données dont l&apos;exportation
                                    est contrôlée, ne doivent pas être partagées dans <strong>Lyra</strong> par le
                                    biais d&apos;un texte ou en utilisant la fonction de pièce jointe.
                                </li>
                                <li>
                                    Il est de votre responsabilité de vous assurer que toutes les informations fournies
                                    ou jointes sont correctement marquées et peuvent être partagées avec des entités
                                    en dehors de votre pays.
                                </li>
                            </ul>
                        </div>
                        <div className='w-full flex justify-center gap-2 my-1'>
                            <div className='flex items-center justify-center w-12 h-12 rounded border-2 border-green-500 bg-green-100 font-bold text-green-600'>C1</div>
                            <div className='flex items-center justify-center w-12 h-12 rounded border-2 border-blue-500 bg-blue-100 font-bold text-blue-600'>C2</div>
                            {[
                                { level: 'C3', border: 'border-orange-400', bg: 'bg-orange-100', text: 'text-orange-500', line: 'border-orange-400' },
                                { level: 'C4', border: 'border-red-400', bg: 'bg-red-100', text: 'text-red-500', line: 'border-red-400' },
                            ].map(({ level, border, bg, text, line }) => (
                                <div key={level} className={`relative flex items-center justify-center w-12 h-12 rounded border-2 font-bold ${border} ${bg} ${text}`}>
                                    {level}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                        <div className={`w-full border-t-2 ${line} rotate-135`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setAlertOpen(false)}>
                            J&apos;ai compris
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
