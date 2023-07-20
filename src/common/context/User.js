import { createContext, useState } from 'react'

export const userContext = createContext()

userContext.displayName = "User"

export const UserProvider = ({children}) => {
    
    const [name, setName] = useState("")
    const [ balance, setBalance ] = useState(0)

    return(
        <userContext.Provider value={{ name, setName, balance, setBalance}}>
            {children}
        </userContext.Provider>

    )
}