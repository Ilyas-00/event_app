import { useState } from 'react'
import { toast } from 'sonner'

export function useAsyncAction() {
  const [loading, setLoading] = useState(false)

  async function run(action: () => Promise<void>, onError: (err: unknown) => string) {
    setLoading(true)
    try {
      await action()
    } catch (err) {
      toast.error(onError(err))
    } finally {
      setLoading(false)
    }
  }

  return { loading, run }
}
