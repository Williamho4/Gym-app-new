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
  const [setCount, setSetCount] = useState(1)
  const [sets, setSets] = useState([])
  const [setCountConfirmed, setSetCountConfirmed] = useState(false)

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

  const handleSelect = (e) => {
    setSelectedExercise(e)
  }

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

  const handleConfirmedExercise = (e) => {
    e.preventDefault()

    if (sets.length <= 0) {
      return alert('Fill in all sets')
    }

    for (let i = 0; i < sets.length; i++) {
      if (sets[i] === undefined) {
        return alert('Please fill in all sets.')
      }
    }

    if (
      sets.every((set) => set.reps !== undefined && set.weight !== undefined)
    ) {
    } else {
      return alert('Fill in all sets')
    }

    sets.map((set) => (set.id = uuidv4()))

    setPlannedExercises((prev) => [
      ...prev,
      {
        exercise: selectedExercise,
        sets: sets,
        id: uuidv4(),
      },
    ])

    setSets([])

    setSelectedExercise(null)
    setSetCountConfirmed(false)
  }

  const confirmSetCount = (e) => {
    e.preventDefault()
    setSetCountConfirmed(true)
  }

  const handleSetRepChange = (index, type, value) => {
    value = parseInt(value) || 0
    if (value < 0) value = 0

    const newSets = [...sets]
    newSets[index] = {
      ...newSets[index],
      [type]: parseInt(value),
    }
    setSets(newSets)
  }

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
            {!setCountConfirmed && !isLoading && selectedExercise && (
              <form
                className="flex items-center justify-center w-full space-x-3 mr-[4rem] mt-9 md:mt-0"
                onSubmit={confirmSetCount}
              >
                <label>Number Of Sets</label>
                <div className="flex space-x-3">
                  <input
                    className="px-2 rounded-md"
                    type="number"
                    min="1"
                    max="4"
                    onChange={(e) => setSetCount(parseInt(e.target.value))}
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
            {setCountConfirmed && (
              <form className="flex flex-col space-y-2">
                {Array.from({ length: setCount }).map((set, index) => (
                  <div
                    className="flex w-full space-x-1 justify-evenly"
                    key={index}
                  >
                    <div className="flex flex-col items-center">
                      {index === 0 && <label htmlFor="">Reps</label>}
                      <input
                        className="w-[100%] rounded-md p-1 px-8 pl-10 text-center"
                        type="number"
                        min="1"
                        max="30"
                        placeholder={`Set${index + 1}`}
                        onChange={(e) =>
                          handleSetRepChange(index, 'reps', e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      {index === 0 && <label htmlFor="">Weight</label>}
                      <input
                        className="w-[100%] rounded-md p-1 px-7 pl-10 text-center"
                        type="number"
                        min="1"
                        max="500"
                        placeholder={`Set${index + 1}`}
                        onChange={(e) =>
                          handleSetRepChange(index, 'weight', e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
                <div className="flex space-x-1 w-full">
                  <button
                    className="w-[50%] rounded-md p-1 bg-blue-400"
                    onClick={handleConfirmedExercise}
                  >
                    Confirm Exercise
                  </button>
                  <button
                    className="w-[50%] rounded-md p-1 bg-blue-400"
                    onClick={() => {
                      setSetCountConfirmed(false)
                      setSets([])
                    }}
                  >
                    Change Number Of Sets
                  </button>
                </div>
              </form>
            )}
          </div>
          {selectedExercise && (
            <ExerciseCard
              sets={sets}
              selectedExercise={selectedExercise}
            ></ExerciseCard>
          )}
        </div>
      )}
    </div>
  )
}

export default Input
