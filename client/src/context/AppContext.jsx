import { createContext, useContext } from "react";

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    cosnt [theme, setTheme] = useState(localStorage.getItem('theme' || 'light'));



    const value = {}

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => useContext(AppContext)