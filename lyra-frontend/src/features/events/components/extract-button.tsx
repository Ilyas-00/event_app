'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  eventId: string
  eventTitle: string
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export default function ExtractButton({ eventId, eventTitle, size = 'default', className }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation()
    setLoading(true)
    try {
      const res = await fetch(`/api/events/${eventId}/export`)
      if (!res.ok) throw new Error(`${res.status}`)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `emargement-${eventTitle}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      toast.error(`Erreur lors de l'extraction (${err instanceof Error ? err.message : 'inconnu'})`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button className={cn('w-fit', className)} size={size} variant='outline' onClick={handleClick} disabled={loading}>
      {loading ? 'Extraction...' : 'Extraire les participants'}
    </Button>
  )
}
