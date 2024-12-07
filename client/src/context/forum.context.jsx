import { createContext, useState, useEffect } from 'react';

// Create the context
const ForumContext = createContext();

// Create the provider
const ForumProvider = ({ children }) => {
    const mainUrl = import.meta.env.VITE_FORO_API;
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchForums = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${mainUrl}/forum`);
                if (!response.ok) {
                    throw new Error(`Error fetching forums: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Fetching forums:', data);
                setForums(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching forums:', error);
            }
        };

        fetchForums();
    }, []);

    const filteredForums = forums
        .map((forum) => {
            const forumTitleMatches = forum.title?.toLowerCase().includes(searchTerm.toLowerCase());

            const filteredPosts = forum.posts?.filter((post) => {
                const postMatches = post.title?.toLowerCase().includes(searchTerm.toLowerCase());
                const commentsMatch = post.comments?.some((comment) =>
                    comment.content?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                const authorMatches = post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase());
                return postMatches || commentsMatch || authorMatches;
            });

            if (forumTitleMatches || (filteredPosts && filteredPosts.length > 0)) {
                return {
                    ...forum,
                    posts: filteredPosts,
                };
            }

            return null;
        })
        .filter((forum) => forum !== null)
        .filter((forum) => selectedCategory === '' || forum.category?.toLowerCase() === selectedCategory.toLowerCase());

    const data = {
        forums,
        setForums,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        filteredForums,
    };

    return <ForumContext.Provider value={data}>{children}</ForumContext.Provider>;
};

// Export the context and provider
export { ForumContext, ForumProvider };