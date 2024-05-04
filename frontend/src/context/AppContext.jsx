'use client'
import { createContext, useContext, useState } from "react";
import { useRouter } from 'next/navigation';


const AppContext = createContext();

export const AppProvider = ({ children  }) => {
    
    const router=useRouter();
    const [ currentUser, setCurrentUser ] = useState(
        JSON.parse(sessionStorage.getItem('user'))
      );

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        sessionStorage.removeItem('user');
        setLoggedIn(false);
        setCurrentUser(null);
        // clear the cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/login');
    }

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, logout, currentUser, setCurrentUser }} >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext);
export default useAppContext;