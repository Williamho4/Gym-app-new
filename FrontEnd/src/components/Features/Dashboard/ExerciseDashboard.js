import React from 'react'
import WeeklySessions from '../../UI/WeeklySessions'

import { useUser } from '../../../context/UserContext'

function ExerciseDashboard({ workouts }) {
  const { userData } = useUser()

  return (
    <>
      {/* Normal Screens */}

      <section className="justify-center w-full h-[44rem] md:mt-6 lg:mt-16 hidden lg:flex">
        <div className=" w-[50%] md:w-[50%] lg:w-[50%] xl:w-[40%] flex flex-col h-[99%]">
          <div className=" w-full h-[100%] flex items-center overflow-auto">
            {workouts && (
              <div className="main-color w-[100%] h-[92%] rounded-md mx-2 mt-2 flex flex-col items-center p-4 shadow-xl">
                <h1 className="text-xl">
                  {userData?.user
                    ? `${userData.user.username}'s Workout`
                    : 'Workout'}
                </h1>
                <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
                  {workouts[0]?.plannedExercises.map((exercise) => (
                    <li className="secondary-color h-[10rem] w-[90%] lg:w-[42%] xl:w-[42%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5">
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
            )}
          </div>
          <div className=" w-full h-[100%] flex items-center overflow-auto">
            {workouts && (
              <div className="main-color w-[100%] h-[92%] rounded-md mx-2 mt-2 flex flex-col items-center p-4 shadow-xl">
                <h1 className="text-xl">
                  {userData?.user
                    ? `${userData.user.username}'s Workout`
                    : 'Workout'}
                </h1>
                <ul className="w-full  mt-3 flex flex-wrap overflow-auto justify-center custom-scrollbar">
                  {workouts[4]?.plannedExercises.map((exercise) => (
                    <li className="secondary-color h-[10rem] w-[90%] lg:w-[42%] xl:w-[42%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5">
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
            )}
          </div>
        </div>
        <div className="w-[50%] md:w-[46%] lg:w-[36%] xl:w-[32%] h-[100%] flex justify-center items-center ">
          <WeeklySessions></WeeklySessions>
        </div>
      </section>
    </>
  )
}

export default ExerciseDashboard
