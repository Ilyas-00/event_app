'use client'

import { Button } from '@/components/ui/button'
import { registerToEvent, unregisterFromEvent } from '@/features/events/services/event-actions'
import { cn } from '@/lib/utils'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { toast } from 'sonner'

interface Props {
  eventId: string
  remainingSeats: number
  isRegistered: boolean
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export default function RegisterButton({ eventId, remainingSeats, isRegistered, size = 'default', className }: Props) {
  const { loading, run } = useAsyncAction()
  const full = remainingSeats <= 0

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    await run(async () => {
      if (isRegistered) {
        await unregisterFromEvent(eventId)
        toast.success('Désinscription confirmée')
      } else {
        await registerToEvent(eventId)
        toast.success('Inscription confirmée')
      }
    }, () => isRegistered ? "Erreur lors de la désinscription" : "Erreur lors de l'inscription")
  }

  if (!isRegistered && full) {
    return (
      <Button className={cn(className)} size={size} variant='destructive' disabled onClick={(e) => e.stopPropagation()}>
        Complet
      </Button>
    )
  }

  return (
    <Button className={cn(className)} size={size} variant={isRegistered ? 'outline' : 'default'} onClick={handleClick} disabled={loading}>
      {loading
        ? (isRegistered ? 'Désinscription...' : 'Inscription...')
        : (isRegistered ? 'Se désinscrire' : "S'inscrire")}
    </Button>
  )
}
