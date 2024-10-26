import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loggedIn, setLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  )
}
