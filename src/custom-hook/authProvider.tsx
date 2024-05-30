import React from "react";
import { useAuth } from "./useAuth";

type Props = {
    children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {
    const {loading} = useAuth();
    
    if(loading){
        return <div>Loading...</div>
    }
    return (
        <div>
            {children}
        </div>
    )
}