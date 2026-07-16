'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAsyncAction } from '@/hooks/useAsyncAction'

interface Props {
  eventId: string
  eventTitle: string
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export default function ExtractButton({ eventId, eventTitle, size = 'default', className }: Props) {
  const { loading, run } = useAsyncAction()

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    await run(async () => {
      const res = await fetch(`/api/events/${eventId}/export`)
      if (!res.ok) throw new Error(`${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `emargement-${eventTitle}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    }, (err) => `Erreur lors de l'extraction (${err instanceof Error ? err.message : 'inconnu'})`)
  }

  return (
    <Button className={cn('w-fit', className)} size={size} variant='outline' onClick={handleClick} disabled={loading}>
      {loading ? 'Extraction...' : 'Extraire les participants'}
    </Button>
  )
}
