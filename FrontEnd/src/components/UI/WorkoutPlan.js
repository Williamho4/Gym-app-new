import ExerciseCard from './ExerciseCard'
import { useExercises } from '../../context/ExercisesContext'
import { useState } from 'react'

function WorkoutPlan() {
  const { plannedExercises } = useExercises()
  const [date, setDate] = useState()

  return (
    <div className="main-color min-h-[46rem] max-h-[46rem] rounded-xl w-[100%] md:w-[80%] lg:w-[70%] xl:w-[40%] m-3 flex flex-col items-center shadow-xl p-2.5 xl:p-6">
      <div className="flex space-x-3">
        <input
          type="date"
          className="px-1 rounded-md"
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="bg-blue-400 p-1 rounded-md text-lg">
          Confirm Workout
        </button>
      </div>
      <ul className="w-full mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
        {plannedExercises.map((exercise) => (
          <ExerciseCard
            sets={exercise.sets}
            selectedExercise={exercise.exercise}
          ></ExerciseCard>
        ))}
      </ul>
    </div>
  )
}

export default WorkoutPlan
