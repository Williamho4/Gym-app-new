import React from 'react'
import WeeklySessions from '../../UI/WeeklySessions'
import SessionTable from '../../UI/SessionTable'

function ExerciseDashboard({ workouts }) {
  const today = new Date()

  const nextDate = workouts
    .map((workout) => ({
      date: new Date(workout.date),
    }))
    .filter((workout) => workout.date > today)
    .reduce((nearest, current) => {
      return !nearest || current.date < nearest.date ? current : nearest
    }, null)

  return (
    <div className="flex flex-col justify-center w-full mt-8  md:h-[50rem] md:flex-row space-y-10 md:space-y-0">
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
      <section className="w-[100%] md:w-[50%] lg:w-[46%] xl:w-[32%] h-[50rem] flex justify-center mt-6 md:mt-0">
        <WeeklySessions workouts={workouts}></WeeklySessions>
      </section>
    </div>
  )
}

export default ExerciseDashboard
