import { useEffect, useState } from 'react'
import { useExercises } from '../../context/ExercisesContext'

function SearchWorkoutPage() {
  const { userSavedWorkouts } = useExercises()
  const [workouts, setWorkouts] = useState([])
  const [date, setDate] = useState(0)

  useEffect(() => {
    const chosenWorkout = userSavedWorkouts.filter(
      (workout) => workout.date === date
    )

    setWorkouts(chosenWorkout)
  }, [date])

  console.log(workouts)

  return (
    <>
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] mt-2 md:mt-0">
        <div className="main-color w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] min-h-[30rem] max-h-[50rem] rounded-md flex flex-col items-center justify-center p-4 shadow-xl">
          <h1 className="flex space-x-2 text-2xl">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </h1>
          {workouts.length > 0 && (
            <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
              {workouts[0]?.plannedExercises.map((exercise) => (
                <li
                  key={exercise.id}
                  data-id={exercise.id}
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
                              <p className="text-blue-400">{set.reps}</p>
                              <p className="text-red-600">{set.weight}</p>
                              <p className="light-text">KG</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

export default SearchWorkoutPage
