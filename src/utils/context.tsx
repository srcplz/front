import {createContext} from 'react';

export type AuthContextType = {
    isLoggedIn: boolean,
    loginModalOpened: boolean,
    token?: string,
    login: Function,
    logout: Function
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    loginModalOpened: false,
    token: undefined,
    login: ()=>{},
    logout: ()=>{}
})