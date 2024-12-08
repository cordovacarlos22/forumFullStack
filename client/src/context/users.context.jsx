import { createContext, useState, useEffect } from 'react'

const UsersContext = createContext()

const UsersProvider = ({ children }) => {
    const mainUrl = import.meta.env.VITE_FORO_API
    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {

            if (!token) {
                return
            }
            try {
                const response = await fetch(`${mainUrl}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                const data = await response.json()
                console.log('Fetched users:',data);
                setUsers(data)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers()
    },[mainUrl, token])
        

    return (
        <UsersContext.Provider value={{ users, setUsers }}>
            {children}
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersProvider }