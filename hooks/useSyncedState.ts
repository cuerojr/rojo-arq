import { useState } from "react";

/**
 * Estado inicializado desde una prop que puede cambiar después del montaje.
 * Se resincroniza cuando el valor externo cambia de verdad (comparado por contenido,
 * no por identidad), sin useEffect ni render intermedio con valor viejo.
 */
export function useSyncedState<T>(external: T) {
  const key = JSON.stringify(external);
  const [value, setValue] = useState<T>(external);
  const [prevKey, setPrevKey] = useState(key);

  if (key !== prevKey) {
    setPrevKey(key);
    setValue(external);
  }

  return [value, setValue] as const;
}