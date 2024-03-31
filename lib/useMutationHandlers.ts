import { useEffect } from 'react'

interface InitialOptions {
  isSuccess?: boolean;
  data?: any;
  isError?: boolean;
  error?: any;
}

export const useMutationHandlers = <TOptions extends InitialOptions>(
  options: TOptions,
  onSuccess?: (data: NonNullable<TOptions['data']>) => void,
  onFailure?: (error: NonNullable<TOptions['error']>) => void
) => {
  const { isSuccess, data, isError, error } = options

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(data)
      // if ('success' in (data || {}) && data.success === false) {
      //   onFailure?.(data)
      // } else {
      //   onSuccess?.(data)
      // }
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isError) {
      onFailure?.(error)
    }
  }, [isError, error])
}
