import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === 'undefined') return null;
        try {
            return JSON.parse(storedUser);
        } catch (e) {
            console.error('Failed to parse user from local storage', e);
            return null;
        }
    });
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [backendUrl] = useState(import.meta.env.VITE_BACKEND_URL || "http://localhost:5000");
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!user) return;
        const fetchChats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${backendUrl}/api/chats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) setChats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchChats();
    }, [user, backendUrl]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

    const addNotification = (message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setChats([]);
        setSelectedChat(null);
        navigate('/login');
    };

    const refreshUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${backendUrl}/api/auth/data`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                const userData = data.user || data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
            }
        } catch (error) {
            console.error('Refresh failure', error);
        }
    };

    const value = {
        user, setUser,
        chats, setChats,
        selectedChat, setSelectedChat,
        theme, toggleTheme,
        notifications, addNotification,
        backendUrl,
        logout,
        refreshUser,
        messages, setMessages
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
};