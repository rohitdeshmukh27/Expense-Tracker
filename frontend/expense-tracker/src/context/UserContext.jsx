import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateUser = (userData) => {
    setUser(userData);
  };

  //function to clear user data (eg on logout)
  const clearuser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearuser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
