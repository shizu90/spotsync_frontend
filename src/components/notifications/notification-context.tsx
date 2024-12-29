import { useAuthStore } from '@/hooks/auth-store';
import React, { createContext } from 'react';
import io from 'socket.io-client';

const { auth } = useAuthStore.getState();

const socket = io(`${import.meta.env.VITE_API_URL}/ws/notifications`, {
    extraHeaders: {
        Authorization: auth ? `Bearer ${auth.bearerToken}` : '',
    }
});

export const NotificationContext = createContext(socket);

interface NotificationProviderProps {
    children: React.ReactNode;
}

export const NotificationProvider = (props: NotificationProviderProps) => (
    <NotificationContext.Provider value={socket}>{props.children}</NotificationContext.Provider>
);