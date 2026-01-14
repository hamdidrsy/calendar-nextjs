"use client"

import { useState, useCallback } from 'react';

/**
 * Modal açma/kapama işlemleri için custom hook
 * @param initialState - Modal'ın başlangıç durumu (varsayılan: false)
 */
export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    // Modal'ı aç
    //useCallback nedir ?
    //useCallback, React'te bir fonksiyonun bellekteki referansını korumak için kullanılan bir hook'tur.
    const open = useCallback(() => setIsOpen(true), []);

    // Modal'ı kapat
    const close = useCallback(() => setIsOpen(false), []);

    // Modal durumunu değiştir
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    return { isOpen, open, close, toggle };
};
