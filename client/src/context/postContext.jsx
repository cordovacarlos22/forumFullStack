import { createContext, useState, useEffect } from 'react';

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const mainUrl = /* import.meta.env.VITE_FORO_API || */ 'http://localhost:3000/api/v1';
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${mainUrl}/post`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetched posts:', data);
                setPosts(data); // Ajusta según la estructura de datos de tu API
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []); // No necesitas incluir `mainUrl` si es una constante

    return (
        <PostContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };
