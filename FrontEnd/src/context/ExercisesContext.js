import React, { createContext, useContext, useEffect, useState } from 'react'

const ExercisesContext = createContext()

export const useExercises = () => useContext(ExercisesContext)

export const ExercisesProvider = ({ children }) => {
  const [exercises, setExercises] = useState([])
  const [plannedExercises, setPlannedExercises] = useState([])

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
  }, [exercises])

  return (
    <ExercisesContext.Provider
      value={{ exercises, plannedExercises, setPlannedExercises }}
    >
      {children}
    </ExercisesContext.Provider>
  )
}
