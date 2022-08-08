import React from 'react';
import { createContext, useState } from 'react';

const AuthContext = createContext({});

// Citation for the following function
// Date: 08.07.22
// Altered from:
// https://github.com/gitdagray/react_persist_login/blob/main/src/context/AuthProvider.js
// Author: Dave Gray
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;