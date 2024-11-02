import { useExercises } from '../../context/ExercisesContext'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Dropdown from './Dropdown'
import ExerciseCard from './ExerciseCard'

function Input() {
  const { exercises, setPlannedExercises, plannedExercises } = useExercises()
  const [shownExercises, setShownExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState(null)
  const [setCount, setSetCount] = useState(0)
  const [setsState, setSetsState] = useState([])

  useEffect(() => {
    if (exercises.length > 0 && !hasLoaded) {
      setHasLoaded(true)
      setIsLoading(false)

      setShownExercises(exercises)
    }
  }, [exercises])

  const muscleGroups = [
    'All',
    'Chest',
    'Back',
    'Legs',
    'Arms',
    'Core',
    'Shoulders',
  ]

  const sortBy = ['Popular', 'Favorites']

  const handleMuscleFilter = (muscle) => {
    if (muscle === 'All') {
      setSelectedMuscleFilter('All')
      return setShownExercises(exercises)
    }

    const filteredExercises = exercises.filter(
      (exercise) => exercise.muscle === muscle.toLowerCase()
    )

    setSelectedMuscleFilter(muscle)
    setShownExercises(filteredExercises)
  }

  const handleSelect = (e) => {
    setSelectedExercise(e)
  }

  const handleChange = (e) => {
    setSetCount(parseInt(e.target.value))
  }

  useEffect(() => {
    const sets = Array.from({ length: setCount }, () => ({
      reps: 0,
      weight: 0,
    }))
    sets.map((set) => (set.id = uuidv4()))
    setSetsState(sets)
  }, [setCount])

  const handleConfirmedExercise = (e) => {
    e.preventDefault()

    if (setsState.length <= 0 || setsState.length > 4) {
      return alert('Sets must be between 1 and 4')
    }

    setPlannedExercises((prev) => [
      ...prev,
      {
        exercise: selectedExercise,
        sets: setsState,
        id: uuidv4(),
      },
    ])

    setSetCount(0)
    setSelectedExercise(null)
  }

  console.log(plannedExercises)

  return (
    <div className="main-color h-auto lg:max-h-[46rem] rounded-xl w-[100%] md:w-[80%] lg:w-[70%] xl:w-[40%] m-3 flex flex-col items-center shadow-xl">
      <h1 className="pt-4 text-lg tracking-wider">Plan Workout</h1>
      {!isLoading && (
        <div className="flex justify-between w-full pt-5 px-3 md:px-14">
          <Dropdown
            type={'Muscle Group'}
            dropdownList={muscleGroups}
            onClick={handleMuscleFilter}
            totalResults={shownExercises.length}
            selectedFilter={selectedMuscleFilter}
          />
          <Dropdown type={'Sort By'} dropdownList={sortBy} />
        </div>
      )}
      <ul
        className={`flex flex-wrap justify-center mt-5 md:mt-4 lg:mt-6 h-full w-full md:px-4 overflow-auto scrollbar-hide ${
          !selectedExercise && 'mb-10'
        }`}
      >
        {isLoading && (
          <h1 className="text-4xl mt-[35%] h-[20rem]">Loading Exercises....</h1>
        )}
        {shownExercises.length === 0 && !isLoading && (
          <h1 className="text-3xl mt-20 mb-10">No Exercises Found</h1>
        )}
        {shownExercises.map((exercise) => (
          <li
            key={exercise._id}
            className={`secondary-color h-[5rem] w-[42%] md:w-[44%] xl:w-[46%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl cursor-pointer ${
              selectedExercise?.name === exercise.name && 'bg-red-600'
            }`}
            onClick={() => handleSelect(exercise)}
          >
            <img
              src={exercise.imgUrl}
              alt={exercise.name}
              className="h-[100%] w-[40%]  lg:w-[28%] object-fill rounded-sm"
            />
            <div className="w-full flex flex-col items-center justify-center">
              <p className="text-center light-text text-base xl:text-base mt-1 tracking-wider">
                {exercise.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {selectedExercise && (
        <div className="flex flex-col items-center lg:flex-row md:justify-center lg:space-x-4 2xl:space-x-20 py-4 md:py-10 w-full lg:max-w-[90%]">
          {' '}
          <div className="h-auto mb-8 space-y-4 flex flex-col items-start">
            {!isLoading && selectedExercise && (
              <form
                className="flex items-center justify-center w-full space-x-3 mr-[4rem] mt-9 md:mt-0"
                onSubmit={handleConfirmedExercise}
              >
                <label>Number Of Sets</label>
                <div className="flex space-x-3">
                  <input
                    className="px-2 rounded-md"
                    type="number"
                    min="0"
                    max="4"
                    onChange={handleChange}
                  />
                  <button
                    className="bg-blue-400 px-2 py-1 rounded-md"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            )}
          </div>
          {selectedExercise && (
            <ExerciseCard
              sets={setsState}
              selectedExercise={selectedExercise}
            ></ExerciseCard>
          )}
        </div>
      )}
    </div>
  )
}

export default Input
