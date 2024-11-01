import SessionTable from '../UI/SessionTable'
import { useSearchParams } from 'react-router-dom'
import { useExercises } from '../../context/ExercisesContext'
import { useEffect, useState } from 'react'

function WorkoutPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const { userSavedWorkouts, loadingExericises } = useExercises()

  const [workout, setWorkout] = useState([])

  useEffect(() => {
    if (!loadingExericises && userSavedWorkouts.length > 0 && id) {
      const filteredWorkouts = userSavedWorkouts.filter(
        (workout) => workout.id === id
      )
      setWorkout(filteredWorkouts)
    }
  }, [id, userSavedWorkouts, loadingExericises])

  return (
    <section className="w-[100%] flex justify-center items-center h-[50rem] ">
      <div className="main-color w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] min-h-[30rem] max-h-[50rem] rounded-md flex flex-col items-center justify-between p-4 shadow-xl">
        <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
          {workout[0]?.plannedExercises.map((exercise, index) => (
            <li
              key={index}
              className="secondary-color h-[10rem] w-[90%] lg:w-[42%] xl:w-[42%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5"
            >
              <>
                <img
                  src={`http://localhost:4000/exercises/${exercise.exercise._id}/image`}
                  alt="exercise"
                  className="h-full w-[40%] object-cover rounded-sm"
                />

                <div className="w-full flex flex-col justify-center">
                  <p className="text-center light-text text-base xl:text-base mb-1 tracking-wider">
                    {exercise.exercise.name}
                  </p>
                  <div className="flex flex-col items-center overflow-auto custom-scrollbar">
                    {exercise.sets.length > 0 && (
                      <p className="light-text">Sets</p>
                    )}
                    <div className="flex space-x-3 w-full justify-center items-center flex-wrap px-3">
                      {exercise.sets.map((set) => (
                        <div
                          key={set.id}
                          className="flex space-x-1 w-auto justify-center"
                        >
                          <p className="text-blue-400">{set.reps}</p>{' '}
                          <p className="text-red-600">{set.weight}</p>
                          {set.weight && <p className="light-text">KG</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            </li>
          ))}
        </ul>
        <div className="py-4">
          <button className="bg-red-600 rounded-md text-lg p-2 ml-2">
            Start Workout
          </button>
        </div>
      </div>
    </section>
  )
}

export default WorkoutPage
