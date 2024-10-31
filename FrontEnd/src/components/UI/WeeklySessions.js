import React from 'react'

function WeeklySessions({ workouts }) {
  const today = new Date()
  const currentDay = today.getDay() // 0 (Sun) to 6 (Sat)

  // Calculate the offset to get to Monday
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay // If today is Sunday, go back 6 days, otherwise adjust to Monday

  // Get the start of the week (Monday)
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() + mondayOffset) // Set to Monday

  // Get the end of the week (Sunday)
  const endOfWeek = new Date(today)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // Set to the following Sunday

  // Filter workouts for this week
  const thisWeeksWorkouts = workouts.filter((workout) => {
    const workoutDate = new Date(workout.date)
    return workoutDate >= startOfWeek && workoutDate <= endOfWeek
  })

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  // Loop through each workout and convert the date string to a Date object
  thisWeeksWorkouts.forEach((workout) => {
    // Convert date string to a Date object
    const dateObject = new Date(workout.date)

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeekIndex = dateObject.getDay()
    const dayName = daysOfWeek[dayOfWeekIndex] // Get the corresponding day name

    // Log the results
    workout.day = dayName
  })

  thisWeeksWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="secondary-color w-[96%] h-[95%] rounded-md flex flex-col pb-2 shadow-xl">
      <h1 className="text-center p-4 pb-2 text-xl md:text-lg light-text">
        This Week
      </h1>
      <ul className="m-1 md:mr-2 space-y-3 overflow-auto p-2 xl:pl-4 custom-scrollbar scrollbar-thumb-primary">
        {thisWeeksWorkouts.map((workout, index) => (
          <li
            key={workout.date}
            className="main-color rounded-md shadow-xl flex flex-col items-center p-4 pb-6 px-4 overflow-auto h-auto min-h-[15rem]"
          >
            <h1 className="text-2xl mb-3">{workout.day}</h1>
            <div className="flex flex-wrap gap-5 justify-center w-full">
              <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
                {workout.plannedExercises.map((exercise, index) => (
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
                            {exercise.sets.length > 0 &&
                              exercise.sets.map((set, index) => (
                                <div
                                  key={index}
                                  className="flex space-x-1 w-auto justify-center"
                                >
                                  <p className="text-blue-400">{set.reps}</p>{' '}
                                  <p className="text-red-600">{set.weight}</p>
                                  {set.weight && (
                                    <p className="light-text">KG</p>
                                  )}
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WeeklySessions
