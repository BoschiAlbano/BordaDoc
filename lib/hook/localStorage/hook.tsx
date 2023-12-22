"use client";

import { useState, Dispatch, SetStateAction } from "react";

type UseLocalStorageProps<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(
    llave: string,
    valor: T
): UseLocalStorageProps<T> {
    const [store, setStore] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(llave);
            return item ? JSON.parse(item) : valor;
        } catch (error) {
            return valor;
        }
    });

    const setValue: Dispatch<SetStateAction<T>> = (value) => {
        try {
            setStore(value);
            window.localStorage.setItem(llave, JSON.stringify(value));
        } catch (error) {
            // Manejar errores, si es necesario
        }
    };

    return [store, setValue];
}
