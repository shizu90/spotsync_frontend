import { useAuthStore } from '@/hooks/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function PrivateRoute(): JSX.Element {
    const { signedIn } = useAuthStore();
    const location = useLocation();

    return signedIn ? (
        <Outlet/>
    ) : (
        <Navigate
            replace={true}
            to="/sign-in"
            state={{ from: `${location.pathname}${location.search}` }}
        />
    );
}