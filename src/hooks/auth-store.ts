import { create } from 'zustand';

export type AuthObject = {
    bearerToken: string;
    userId: string;
    userName: string;
    email: string;
    rememberMe: boolean;
};

type AuthStore = {
    auth: AuthObject | null,
    signedIn: boolean,
    signIn: (auth: AuthObject) => void,
    signOut: () => void,
};

export const useAuthStore = create<AuthStore>((set) => ({
    auth: null,
    signedIn: false,
    signIn: (auth: AuthObject) => {
        if (auth.rememberMe) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            sessionStorage.setItem('auth', JSON.stringify(auth));
        }
    
        set({ auth, signedIn: true })
    
    },
    signOut: () => set({ auth: null, signedIn: false }),
}));