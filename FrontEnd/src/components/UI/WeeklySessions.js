import React from 'react'

function WeeklySessions() {
  const exercises = [
    {
      monday: [
        {
          name: 'Pull Ups',
          img: '/images/pull-ups.jpg',
        },
        {
          name: 'Bench Press',
          img: '/images/bench-press.jpg',
        },
        {
          name: 'Cable Flys',
          img: '/images/cable-fly.jpg',
        },
        {
          name: 'Curls',
          img: '/images/seated-dumbbell-curl.jpg',
        },
        {
          name: 'Curls',
          img: '/images/seated-dumbbell-curl.jpg',
        },
      ],
      tuesday: [
        {
          name: 'Pull Ups2',
          img: '/images/pull-ups.jpg',
        },
        {
          name: 'Bench Press2',
          img: '/images/bench-press.jpg',
        },
        {
          name: 'Cable Flys2',
          img: '/images/cable-fly.jpg',
        },
        {
          name: 'Curls2',
          img: '/images/seated-dumbbell-curl.jpg',
        },
        {
          name: 'Curls2',
          img: '/images/seated-dumbbell-curl.jpg',
        },
        {
          name: 'Curls2',
          img: '/images/seated-dumbbell-curl.jpg',
        },
        {
          name: 'Curls2',
          img: '/images/seated-dumbbell-curl.jpg',
        },
        {
          name: 'Curls2',
          img: '/images/seated-dumbbell-curl.jpg',
        },
      ],
      wednesday: [],
    },
  ]

  return (
    <div className="main-color w-[96%] h-[95%] rounded-md flex flex-col pb-2 shadow-xl">
      <h1 className="text-center p-4 pb-2 text-xl md:text-lg">This Week</h1>
      <ul className="m-1 md:mr-2 space-y-3 overflow-auto p-2 xl:pl-4 custom-scrollbar">
        {exercises.map((daysobj) =>
          Object.keys(daysobj).map((day) => (
            <li
              key={day}
              className="secondary-color rounded-md shadow-xl light-text flex flex-col items-center p-4 pb-6 px-4 overflow-auto h-auto min-h-[15rem]"
            >
              <h1 className="text-2xl mb-3">{day}</h1>
              <div className="flex flex-wrap gap-5 justify-center w-full">
                {daysobj[day].map((exercise, index) => (
                  <div
                    key={index}
                    className="w-[45%] md:w-[30%] xl:w-[20%] h-auto flex flex-col items-center"
                  >
                    <p className="text-center truncate">{exercise.name}</p>
                    <img
                      src={exercise.img}
                      alt={exercise.name}
                      className="w-full h-auto max-w-[6rem] max-h-[6rem] md:max-w-[6rem] md:max-h-[6rem] lg:max-w-[6rem] lg:max-h-[6rem] xl:max-w-[5.5rem] xl:max-h-[5.5rem]  object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default WeeklySessions
