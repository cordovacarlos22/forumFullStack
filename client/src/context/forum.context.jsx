import { createContext, useState, useEffect } from 'react'

const ForumContext = createContext()

const ForumProvider = ({ children }) => {
    const mainUrl = /* import.meta.env.VITE_FORO_API || */ 'http://localhost:3000/api/v1';
    const [forums, setForums] = useState([])

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const response =await fetch(`${mainUrl}/forum`)
                if (!response.ok) {
                    throw new Error(`Error fetching forums:  ${response.status} ${response.statusText}`)
                }
                const data = await response.json()
                console.log('Fetching forums:', data);
                setForums(data)
            } catch (error) {
                console.error('Error fetching forums:', error);
            }
        }

        fetchForums()
    },[])

    return (
        <ForumContext.Provider value={{ forums, setForums }}>
            {children}
        </ForumContext.Provider>
    )
}

export { ForumContext, ForumProvider }