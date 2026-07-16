import { useEffect, useState } from 'react'
import { Theme } from '@/features/themes/types'
import { getThemes } from '@/features/themes/services/theme-service'

export function useThemes() {
  const [themes, setThemes] = useState<Theme[]>([])

  useEffect(() => {
    getThemes().then(setThemes)
  }, [])

  return themes
}
