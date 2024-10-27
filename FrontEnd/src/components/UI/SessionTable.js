import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'

function SessionTable({ title }) {
  const exercises = [
    {
      name: 'Bench Press',
      img: '/images/bench-press.jpg',
      sets: [3, 4, 6],
      weight: 50,
    },
    {
      name: 'Cable Flys',
      img: '/images/cable-fly.jpg',
      sets: [3, 4, 6, 5],
      weight: 14,
    },
    {
      name: 'Curls',
      img: '/images/seated-dumbbell-curl.jpg',
      sets: [3, 4, 6],
      weight: 10,
    },
  ]

  const { userData } = useUser()

  return (
    <div className="main-color w-[100%] h-[92%] rounded-md mx-2 mt-2 flex flex-col items-center p-4 shadow-xl">
      <h1 className="text-xl">
        {userData.user ? `${userData.user.username}'s ${title}` : title}
      </h1>
      <ul className="w-full mt-3 flex flex-wrap overflow-auto justify-between custom-scrollbar">
        {exercises.map((exercise) => (
          <li className="secondary-color h-[12rem] w-[46%] md:w-[44%] xl:w-[46%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl">
            <img
              src={exercise.img}
              alt={exercise.name}
              className="h-full w-[40%] object-cover rounded-sm"
            />
            <div className="w-full flex flex-col items-center justify-center">
              <p className="text-center light-text text-base xl:text-base mt-1 tracking-wider">
                {exercise.name}
              </p>
              <div className="light-text pt-2 flex flex-col items-center">
                <p>Sets</p>
                <div className="flex space-x-3 px-5 flex-wrap max-h-[2.8rem] overflow-hidden">
                  {exercise.sets.map((set) => (
                    <p className="text-red-700">{set}</p>
                  ))}
                </div>
                <p>Weight</p>
                <span>
                  <p className="inline pr-1 text-red-700">{exercise.weight}</p>
                  kg
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SessionTable
