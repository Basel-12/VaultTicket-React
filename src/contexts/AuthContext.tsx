import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useState } from "react";


interface AuthContextType {
    isAuthenticated: boolean,
    login : (username: string, password : string ) => void ,
    register: (username: string, password : string ) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: React.ReactNode}) =>{
    const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);


    const login = async(username : string,password : string)=>{
            try{
                const res = await axios.post('/api/Auth/login',{
                    username,
                    password
                })


            }catch(err : any){
                throw new Error(`${err.message || 'Invalid Credntials' } `)
            }
    }


    const register = async (username : string, password : string)=>{
        try{
            const res = await axios.post('/api/Auth/register',{
                username,
                password,
                role: 'User'
            })
        }catch(err:any){
            throw new Error("something went wrong")
        }
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, login , register}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;