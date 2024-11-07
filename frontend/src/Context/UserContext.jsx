import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const response = await axios.get('https://urbanvogue-backend.onrender.com/getProfile', {
                        headers: {
                            'Authorization': `${localStorage.getItem('auth-token')}`
                        }
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error("There was an error fetching user profile!", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserProfile();
    }, []);

    const contextValue = {
        user,
        loading,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
