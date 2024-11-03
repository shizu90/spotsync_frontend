import { useAuthStore } from '@/hooks/auth-store';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function PrivateRoute(props: { children: React.ReactNode }): JSX.Element {
    const { children } = props;
    const { signedIn } = useAuthStore();
    const location = useLocation();

    return signedIn ? (
        <>{children}</>
    ) : (
        <Navigate
            replace={true}
            to="/sign-in"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    );
}