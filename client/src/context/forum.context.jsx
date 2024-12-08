import { createContext, useState, useEffect } from 'react';
import { socket } from '../utils/socket'

// Create the context
const ForumContext = createContext();

// Create the provider
const ForumProvider = ({ children }) => {
    const mainUrl = import.meta.env.VITE_FORO_API;
    const chatApiUrl = import.meta.env.VITE_CHAT_API_URL; // Chat API URL from environment variable
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
        const wakeUpChatApi = async () => {

            setLoading(true);
            try {
                // Wake up the chat API
                await fetch(`${chatApiUrl}`);
                console.log('Chat API is awake!');
                setLoading(false);
            } catch (error) {
                console.error('Failed to wake up Chat API:', error);
            }
        };

        fetchForums();
        wakeUpChatApi();
    }, []);

    const filteredForums = forums
        .filter((forum) => {
            const term = searchTerm?.trim().toLowerCase();
            const forumMatches =
                forum.title?.toLowerCase().includes(term) ||
                forum.category?.toLowerCase().includes(term) ||
                forum.description?.toLowerCase().includes(term);
            const postMatches = forum.posts?.some((post) => {
                const postTitleMatches = post.title?.toLowerCase().includes(term);
                const postContentMatches = post.content?.toLowerCase().includes(term);
                return postTitleMatches || postContentMatches;
            });
            return forumMatches || postMatches;
        })
        .map((forum) => ({
            ...forum,
            posts: forum.posts?.filter((post) => {
                const postTitleMatches = post.title?.toLowerCase().includes(searchTerm?.toLowerCase());
                const postContentMatches = post.content?.toLowerCase().includes(searchTerm?.toLowerCase());
                return postTitleMatches || postContentMatches;
            }),
        }))
        .filter((forum) => forum.posts?.length > 0 || forum.category?.toLowerCase().includes(searchTerm) || forum.title?.toLowerCase().includes(searchTerm));

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