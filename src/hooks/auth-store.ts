import { User } from '@/types/users';
import { create } from 'zustand';

export type AuthObject = {
    bearerToken: string;
    user: User;
    rememberMe: boolean;
};

type AuthStore = {
    auth: AuthObject | null,
    signedIn: boolean,
    signIn: (auth: AuthObject) => void,
    signOut: () => void,
};

function _getAuth(): AuthObject | null {
    const auth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    if (!auth) {
        return null;
    }
    return JSON.parse(auth);
}

function _signedIn(): boolean {
    return localStorage.getItem('auth') || sessionStorage.getItem('auth') ? true : false;
}

export const useAuthStore = create<AuthStore>((set) => ({
    auth: _getAuth(),
    signedIn: _signedIn(),
    signIn: (auth: AuthObject) => {
        if (auth.rememberMe) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            sessionStorage.setItem('auth', JSON.stringify(auth));
        }
    
        set({ auth, signedIn: true })
    
    },
    signOut: () => {
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
    
        set({ auth: null, signedIn: false });
    },
}));