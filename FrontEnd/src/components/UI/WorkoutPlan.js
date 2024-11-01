import ExerciseCard from './ExerciseCard'
import { useExercises } from '../../context/ExercisesContext'
import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import { v4 as uuidv4 } from 'uuid'

function WorkoutPlan() {
  const { plannedExercises, setPlannedExercises } = useExercises()
  const [date, setDate] = useState(null)
  const { userData, setUserData } = useUser()
  const { userSavedWorkouts } = useExercises()

  const duplicateWorkout = userSavedWorkouts.some(
    (workout) => workout.date === date
  )

  const refreshUserData = () => {
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
          }
        } catch (err) {
          console.error('Token verification failed:', err)
        }
      }

      verifyToken()
    }
  }

  const handleConfirmedWorkout = (e) => {
    e.preventDefault()

    const sendWorkoutToDatabase = async () => {
      if (plannedExercises.length <= 0) {
        return alert('You need to add an exercise')
      }

      if (!date) {
        return alert('Please Provide Date')
      }

      if (date < new Date().toLocaleDateString()) {
        return alert('Date has already passed')
      }

      if (duplicateWorkout) {
        return alert('Already have workout on this date')
      }

      const plannedExercisesNoImg = plannedExercises.map(
        ({ exercise, sets }) => {
          const { img, imgUrl, ...rest } = exercise
          return { exercise: rest, sets }
        }
      )

      const list = {
        plannedExercises: plannedExercisesNoImg,
        date,
        id: uuidv4(),
      }

      try {
        const response = await fetch('http://localhost:4000/exercises/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.tokens[0].token}`,
          },
          body: JSON.stringify({ workout: list }),
        })

        if (!response.ok) {
          const errorMessage = await response.text()
          throw new Error(
            `HTTP error! Status: ${response.status} - ${errorMessage}`
          )
        }

        setPlannedExercises([])
        refreshUserData()
      } catch (err) {
        console.log(err)
      }
    }

    sendWorkoutToDatabase()
  }

  return (
    <div className="main-color min-h-[46rem] max-h-[46rem] rounded-xl w-[100%] md:w-[80%] lg:w-[70%] xl:w-[40%] m-3 flex flex-col items-center shadow-xl p-2.5 xl:p-6">
      <div>
        <form className="flex space-x-3" onSubmit={handleConfirmedWorkout}>
          <input
            type="date"
            className="px-1 rounded-md p-1"
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="bg-blue-400 rounded-md text-lg p-1" type="submit">
            Confirm Workout
          </button>
        </form>
      </div>
      <ul className="w-full mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
        {plannedExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.exercise._id}
            sets={exercise.sets}
            selectedExercise={exercise.exercise}
          ></ExerciseCard>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutPlan
