import { useState, useEffect, useCallback } from 'react';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getLocalStorage(key, initialValue);
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      setLocalStorage(key, value);
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = getLocalStorage(key, initialValue);
      setStoredValue(newValue);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
