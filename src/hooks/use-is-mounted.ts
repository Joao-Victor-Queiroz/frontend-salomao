import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

/**
 * Hook para verificar se o componente já foi montado no cliente (browser).
 * Utiliza `useSyncExternalStore` para evitar erros de hidratação do SSR e
 * evitar chamadas síncronas de `setState` dentro de `useEffect` (regra react-hooks/set-state-in-effect).
 */
export function useIsMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )
}
