import {createContext} from 'react';

export type AuthContextType = {
    isLoggedIn: boolean,
    loginModalOpened: boolean,
    token?: string,
    setLoggedIn: (state: boolean) => void,
    setModalOpened: (state: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    loginModalOpened: false,
    token: undefined,
    setLoggedIn: ()=>{},
    setModalOpened: ()=>{},
})