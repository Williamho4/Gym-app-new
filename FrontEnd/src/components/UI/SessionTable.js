import { Children } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

function TodaysSession({ workouts, date, day }) {
  const { userData } = useUser()
  const Navigate = useNavigate()

  const todaysWorkout = workouts.filter((workout) => workout.date === date)

  return (
    <div className="flex justify-center">
      <div className="main-color w-[90%] max-h-[44rem] md:h-[20rem] rounded-md flex flex-col items-center p-4 shadow-xl">
        <h1 className="text-xl">
          {userData?.user
            ? `${
                day === 'Today'
                  ? `${userData.user.username}'s workout Today`
                  : `${userData.user.username}'s Next workout`
              }`
            : 'Workout'}
          {day === 'Today' && todaysWorkout.length > 0 && (
            <button
              className="bg-red-600 rounded-md text-lg px-1 ml-2"
              onClick={() => Navigate(`/workout?id=${todaysWorkout[0].id}`)}
            >
              Start Workout
            </button>
          )}
        </h1>
        <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
          {todaysWorkout[0]?.plannedExercises.map((exercise, index) => (
            <li
              key={index}
              className="secondary-color h-[10rem] w-[90%] 2xl:w-[42%]  rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5"
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
    </div>
  )
}

export default TodaysSession
