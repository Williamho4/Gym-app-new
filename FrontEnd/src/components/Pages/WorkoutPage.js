import { useSearchParams } from 'react-router-dom'
import { useExercises } from '../../context/ExercisesContext'
import { useUser } from '../../context/UserContext'
import { useEffect, useState } from 'react'

function WorkoutPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const { userSavedWorkouts, loadingExericises } = useExercises()
  const { userData } = useUser()

  const [selectedWorkout, setSelectedWorkout] = useState([])
  const [selectedExercise, setSelectedExercise] = useState([])
  const [selectedSet, setSelectedSet] = useState([])
  const [workoutModal, setWorkoutModal] = useState(false)
  const [repsInput, setRepsInput] = useState(0)
  const [weightInput, setWeightInput] = useState(0)

  useEffect(() => {
    if (!loadingExericises && userSavedWorkouts.length > 0 && id) {
      const filteredWorkouts = userSavedWorkouts.filter(
        (workout) => workout.id === id
      )
      setSelectedWorkout(filteredWorkouts)
    }
  }, [id, userSavedWorkouts, loadingExericises])

  const handleClick = (e) => {
    setWorkoutModal(!workoutModal)

    if (!workoutModal) {
      setSelectedSet([])
    }

    const id = e.currentTarget.getAttribute('data-id')

    const selectedExercise = selectedWorkout[0].plannedExercises.filter(
      (exercise) => exercise.id === id
    )

    setSelectedExercise(selectedExercise)
  }

  const handleSetClick = (e) => {
    const setId = e.currentTarget.getAttribute('data-id')

    const chosenSet = selectedExercise[0].sets.filter((set) => set.id === setId)

    setSelectedSet(chosenSet)
    setRepsInput(chosenSet[0].reps)
    setWeightInput(chosenSet[0].weight)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(repsInput, weightInput)

    selectedSet[0].reps = repsInput
    selectedSet[0].weight = weightInput

    const updatedUserSavedWorkout = userSavedWorkouts.map((workout) =>
      workout.id === selectedWorkout.id ? selectedWorkout : workout
    )

    try {
      const response = await fetch(
        'http://localhost:4000/exercises/updateWorkouts',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.tokens[0].token}`,
          },
          body: JSON.stringify({
            workouts: updatedUserSavedWorkout,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className="w-[100%] flex justify-center items-center h-[50rem] ">
        <div className="main-color w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] min-h-[30rem] max-h-[50rem] rounded-md flex flex-col items-center justify-between p-4 shadow-xl">
          <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
            {selectedWorkout[0]?.plannedExercises.map((exercise) => (
              <li
                onClick={handleClick}
                key={exercise.id}
                data-id={exercise.id}
                className="secondary-color h-[10rem] w-[90%] lg:w-[42%] xl:w-[42%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5 cursor-pointer"
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
        </div>
      </section>
      {workoutModal && (
        <div
          onClick={() => setWorkoutModal(!workoutModal)}
          className={`fixed inset-0 flex justify-center items-center transition-colors ${
            workoutModal ? 'visible bg-black/20' : 'invisible'
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-xl shadow p-6 transition-all ${
              workoutModal ? 'scale-100' : 'scale-125 opacity-0'
            }`}
          >
            <div className="secondary-color h-[20rem]  w-full  rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5">
              <>
                <img
                  src={`http://localhost:4000/exercises/${selectedExercise[0].exercise._id}/image`}
                  alt="exercise"
                  className="h-full w-[40%] object-cover rounded-sm"
                />

                <div className="w-full flex flex-col justify-center">
                  <p className="text-center light-text text-base xl:text-base mb-1 tracking-wider">
                    {selectedExercise[0].exercise.name}
                  </p>
                  <div className="flex flex-col items-center overflow-auto custom-scrollbar">
                    {selectedExercise[0].sets.length > 0 && (
                      <p className="light-text">Sets</p>
                    )}
                    <div className="flex space-x-3 w-full justify-center items-center flex-wrap px-3">
                      {selectedExercise[0].sets.length > 0 &&
                        selectedExercise[0].sets.map((set) => (
                          <div
                            onClick={handleSetClick}
                            key={set.id}
                            data-id={set.id}
                            className="flex space-x-1 w-auto justify-center"
                          >
                            <p className="text-blue-400">{set.reps}</p>{' '}
                            <p className="text-red-600">{set.weight}</p>
                            {set.weight && <p className="light-text">KG</p>}
                          </div>
                        ))}
                    </div>
                    {selectedSet.length > 0 && (
                      <form
                        className="flex flex-col space-y-2 mt-3 items-center"
                        onSubmit={handleSubmit}
                      >
                        <div className="space-x-1 flex justify-center">
                          <input
                            className="w-[14%] text-center rounded-sm"
                            type="number"
                            value={repsInput}
                            onChange={(e) =>
                              setRepsInput(Number(e.target.value))
                            }
                          />
                          <input
                            className="w-[14%] text-center rounded-sm"
                            type="number"
                            value={weightInput}
                            onChange={(e) =>
                              setWeightInput(Number(e.target.value))
                            }
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-green-600 w-[20%] rounded-md"
                        >
                          Confirm
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WorkoutPage
