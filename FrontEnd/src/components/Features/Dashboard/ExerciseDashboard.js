import React from 'react'
import WeeklySessions from '../../UI/WeeklySessions'
import SessionTable from '../../UI/SessionTable'

function ExerciseDashboard({ workouts }) {
  // Set 'today' to midnight (no time component)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const nextDate = workouts
    .map((workout) => {
      // Create a Date object from the workout date and set it to midnight as well
      const workoutDate = new Date(workout.date)
      workoutDate.setHours(0, 0, 0, 0)
      return { date: workoutDate }
    })
    .filter((workout) => workout.date > today) // Filter for dates strictly after today
    .reduce((nearest, current) => {
      // Find the smallest date that's still in the future
      return !nearest || current.date < nearest.date ? current : nearest
    }, null)

  return (
    <div className="flex flex-col justify-center items-center w-full mt-8  md:h-[50rem] md:flex-row space-y-10 md:space-x-[-1rem] lg:space-x-[-1.5rem] ">
      <section className="w-[100%] md:w-[50%] lg:w-[46%] xl:w-[40%] h-auto space-y-10 md:space-y-4 px-3">
        <SessionTable
          date={today.toLocaleDateString()}
          workouts={workouts}
          day={'Today'}
        ></SessionTable>
        <SessionTable
          date={nextDate?.date.toLocaleDateString()}
          workouts={workouts}
          day={'Next'}
        ></SessionTable>
      </section>
      <section className="w-[100%] md:w-[50%] lg:w-[46%] xl:w-[32%] h-[50rem] flex justify-center my-6 md:mt-0">
        <WeeklySessions workouts={workouts}></WeeklySessions>
      </section>
    </div>
  )
}

export default ExerciseDashboard
