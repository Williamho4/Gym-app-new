import { useSearchParams } from 'react-router-dom'
import { useExercises } from '../../context/ExercisesContext'
import { useUser } from '../../context/UserContext'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

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
    } catch (err) {
      console.log(err)
    }

    setSelectedSet([])
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] mt-2 md:mt-0">
        <div className="main-color w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] min-h-[30rem] max-h-[50rem] rounded-md flex flex-col items-center justify-center p-4 shadow-xl">
          <h1 className="flex space-x-2 text-2xl">
            <p>{selectedWorkout[0]?.date}</p>
            <p>{selectedWorkout[0]?.day}</p>
          </h1>
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
            className={`secondary-color rounded-xl shadow p-6 transition-all mx-2 ${
              workoutModal ? 'scale-100' : 'scale-125 opacity-0'
            }`}
          >
            <div className="w-full h-full">
              <>
                <X
                  className="fixed top-3 right-3 light-text cursor-pointer"
                  onClick={() => setWorkoutModal(!workoutModal)}
                />
                <p className="text-center text-2xl light-text mb-[5%] tracking-wider">
                  {selectedExercise[0].exercise.name}
                </p>
                <div className="flex w-full justify-center">
                  <img
                    src={`http://localhost:4000/exercises/${selectedExercise[0].exercise._id}/image`}
                    alt="exercise"
                    className="h-full w-full max-w-[23rem] object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <ul className="flex w-full justify-center pt-[6%] space-x-6">
                    {selectedExercise[0].sets.length > 0 &&
                      selectedExercise[0].sets.map((set, index) => (
                        <li
                          key={set.id}
                          data-id={set.id}
                          onClick={(e) => {
                            handleSetClick(e)
                          }}
                          className="flex space-x-1 w-auto justify-center"
                        >
                          <h1 className="light-text">Set {index + 1}</h1>
                          <div className="flex space-x-1">
                            <p className="text-blue-400">{set.reps}</p>
                            <p className="text-red-600">{set.weight}</p>
                            <p className="light-text">KG</p>
                          </div>
                        </li>
                      ))}
                  </ul>
                  {selectedSet.length > 0 && (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col justify-center p-2 light-text"
                    >
                      <div className="flex justify-center space-x-2">
                        <div className="flex flex-col items-center space-y-1">
                          <label>Reps</label>
                          <input
                            type="number"
                            min="0"
                            value={repsInput}
                            onChange={(e) =>
                              setRepsInput(Number(e.target.value))
                            }
                            className="w-10 rounded-md text-center text-black"
                          />
                        </div>
                        <div className="flex flex-col items-center space-y-1">
                          <label>Weight</label>
                          <input
                            type="number"
                            min="0"
                            value={weightInput}
                            onChange={(e) =>
                              setWeightInput(Number(e.target.value))
                            }
                            className="w-10 rounded-md text-center  text-black"
                          />
                        </div>
                      </div>
                      <div className="w-full flex justify-center">
                        <button
                          type="submit"
                          className="mt-6 bg-green-600 px-2 py-1 rounded-md text-black"
                        >
                          Confirm
                        </button>
                      </div>
                    </form>
                  )}
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
