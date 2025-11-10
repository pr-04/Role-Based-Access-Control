import React, { createContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }){
  const [user,setUser] = useState(null);
  const [accessToken,setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ user,setUser,accessToken,setAccessToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
