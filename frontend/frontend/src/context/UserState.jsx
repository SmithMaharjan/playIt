import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // Initialize userData from localStorage (or cookies) if it exists
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem("userData");
        return savedData ? JSON.parse(savedData) : null;
    });
    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData))
    }, [userData]);

    const logInUser = (userDatas) => {
        console.log(userData, "contextttt");
        setUserData(userDatas);
        console.log(userDatas, "Updated user data");
        localStorage.setItem("token", userDatas.accessToken);
    };

    const value = {
        userData, setUserData,
        logInUser
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
