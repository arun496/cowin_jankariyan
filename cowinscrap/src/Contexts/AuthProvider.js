import React, { useState, useEffect } from 'react'
import axios from "axios";
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (email, password) => {
        return fetch(`/user/login/${email}/${password}`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data?.user) setCurrentUser(data.user);
        })
    }

    const signup = (email, password, username, pincode) => {
        return fetch(`/user/signup/${email}/${password}/${username}/${pincode}`, {
            method: "POST",
            mode: "no-cors",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data?.user) setCurrentUser(data.user);
        })
    }

    const signout = () => {
        setCurrentUser(null);
    }

    useEffect(() => {
        // Sign out on unmount of the appplication
        return () => {
            signout();
        }
    }, [])

    useEffect(() => {
        console.log(currentUser);
    })

    let AuthValues = { currentUser, signout, login, signup };

    return (
        // This provider value will be applied to AuthProvider Component's children
        <AuthContext.Provider value={AuthValues}>
            {children}
        </AuthContext.Provider>
    )
}
