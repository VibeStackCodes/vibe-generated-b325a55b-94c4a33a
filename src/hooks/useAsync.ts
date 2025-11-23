import { useState, useEffect, useCallback } from 'react';
import { AsyncState } from '@/types';

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
): AsyncState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  const execute = useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const response = await asyncFunction();
      setState({ status: 'success', data: response });
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, refetch: execute };
}
