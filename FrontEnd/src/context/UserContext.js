import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const verifyToken = async () => {
        try {
          const response = await fetch(
            'http://localhost:4000/user/verifyToken',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )

          if (response.ok) {
            const userData = await response.json()
            setUserData(userData)
            setLoggedIn(true)
          }
        } catch (err) {
          console.error('Token verification failed:', err)
          localStorage.removeItem('token')
        }
      }

      verifyToken()
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loggedIn, setLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  )
}
