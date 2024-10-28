import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from './UserContext'

const ExercisesContext = createContext()

export const useExercises = () => useContext(ExercisesContext)

export const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState([])
  const [userSavedWorkouts, setUserSavedWorkouts] = useState([])
  const [plannedExercises, setPlannedExercises] = useState([])

  const { userData } = useUser()

  useEffect(() => {
    const fetchSavedWorkouts = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/exercises/savedWorkouts',
          {
            headers: {
              Authorization: `Bearer ${userData.user.tokens[0].token}`,
            },
          }
        )

        const data = await response.json()
        setUserSavedWorkouts(data)
      } catch (err) {
        console.log(err)
      }
    }

    if (userData) {
      fetchSavedWorkouts()
    }
  }, [userData])

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:4000/exercises')
        const data = await response.json()

        const exercisesWithImages = await Promise.all(
          data.map(async (exercise) => {
            // Fetch the image Blob
            const imgResponse = await fetch(
              `http://localhost:4000/exercises/${exercise._id}/image`
            )
            const blob = await imgResponse.blob() // Get image as Blob
            const url = URL.createObjectURL(blob) // Create a URL for the Blob

            // Return a new object with the exercise data and the image URL
            return { ...exercise, imgUrl: url }
          })
        )

        setExercises(exercisesWithImages)
      } catch (err) {}
    }

    fetchExercises()
  }, [userData])

  return (
    <ExercisesContext.Provider
      value={{
        exercises,
        plannedExercises,
        setPlannedExercises,
        userSavedWorkouts,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  )
}
