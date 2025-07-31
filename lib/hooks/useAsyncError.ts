import { useCallback, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface AsyncActions<T> {
  execute: (asyncFunction: () => Promise<T>) => Promise<T | null>
  reset: () => void
}

export const useAsync = <T = unknown>(): AsyncState<T> & AsyncActions<T> => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await asyncFunction()
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error))
      setState({ data: null, loading: false, error: errorObj })
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return { ...state, execute, reset }
}

export const useAsyncCallback = <T extends unknown[], R>(
  asyncFunction: (...args: T) => Promise<R>
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: T): Promise<R | null> => {
      setLoading(true)
      setError(null)

      try {
        const result = await asyncFunction(...args)
        return result
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        return null
      } finally {
        setLoading(false)
      }
    },
    [asyncFunction]
  )

  return { execute, loading, error }
}
