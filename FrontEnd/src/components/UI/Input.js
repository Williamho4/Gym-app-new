import Dropdown from './Dropdown'
import { useExercises } from '../../context/ExercisesContext'
import { useEffect, useState } from 'react'

function Input() {
  const { exercises } = useExercises()
  const [shownExercises, setShownExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (exercises.length > 0 && !hasLoaded) {
      setIsLoading(false)
      setHasLoaded(true)
      setShownExercises(exercises)
    }
  }, [exercises])

  const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Core']

  const sortBy = ['Popular', 'Favorites']

  const handleSelect = (e) => {
    setSelectedExercise(e)

    console.log(selectedExercise)
  }

  const handleMuscleFilter = (muscle) => {
    if (muscle === 'All') {
      return setShownExercises(exercises)
    }

    const filteredExercises = exercises.filter(
      (exercise) => exercise.muscle === muscle.toLowerCase()
    )

    setShownExercises(filteredExercises)
  }

  useEffect(() => {
    console.log(shownExercises)
  }, [shownExercises])

  return (
    <div className="main-color h-auto rounded-xl w-[100%] md:w-[80%] lg:w-[70%] xl:w-[50%] m-3 flex flex-col items-center shadow-xl">
      <h1 className="pt-4 text-lg tracking-wider">Plan Workout</h1>
      <div className="flex justify-between w-full pt-5 px-3 md:px-14">
        <Dropdown
          type={'Muscle Group'}
          dropdownList={muscleGroups}
          onClick={handleMuscleFilter}
        />
        <Dropdown type={'Sort By'} dropdownList={sortBy} />
      </div>
      <ul className="flex flex-wrap justify-center mt-5 md:mt-4 lg:mt-6 max-h-[20rem] w-full md:px-4 overflow-auto scrollbar-hide">
        {isLoading && (
          <h1 className="text-4xl mt-[10rem] h-[20rem]">
            Loading Exercises....
          </h1>
        )}
        {shownExercises.map((exercise) => (
          <li
            className="secondary-color h-[5rem] w-[46%] md:w-[44%] xl:w-[46%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl cursor-pointer"
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
      <div className="flex flex-col items-center md:flex-row md:justify-center lg:space-x-4 2xl:space-x-20 py-5 md:py-10 w-full lg:max-w-[90%]">
        <div className="h-auto mb-8 space-y-4 flex flex-col items-start">
          <div className="flex flex-col w-full">
            <label htmlFor="">Day</label>
            <input className="w-[100%] rounded-md p-1" type="text" />
          </div>
          <div className="flex justify-between space-x-2">
            <div className="flex flex-col">
              <label htmlFor="">Sets</label>
              <input className="w-[100%] rounded-md p-1" type="number" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Weight</label>
              <input className="w-[100%] rounded-md p-1" type="number" />
            </div>
          </div>
        </div>
        <li className="secondary-color h-[10rem] w-[46%] md:w-[38%] lg:w-[46%] xl:w-[46%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5">
          {selectedExercise && (
            <img
              src={selectedExercise.imgUrl}
              alt="hello"
              className="h-full w-[40%] object-cover rounded-sm"
            />
          )}
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-center light-text text-base xl:text-base mt-1 tracking-wider">
              {selectedExercise && selectedExercise.name}
            </p>
            <div className="light-text pt-2 flex flex-col items-center">
              <p>Sets</p>
              <div className="flex space-x-3 px-5 flex-wrap max-h-[2.8rem] overflow-hidden">
                <p className="text-red-700">2</p>
                <p className="text-red-700">2</p>
                <p className="text-red-700">2</p>
              </div>
              <p>Weight</p>
              <span>
                <p className="inline pr-1 text-red-700">20</p>
                kg
              </span>
            </div>
          </div>
        </li>
      </div>
    </div>
  )
}

export default Input
