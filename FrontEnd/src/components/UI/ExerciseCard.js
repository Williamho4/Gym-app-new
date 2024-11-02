function ExerciseCard({ sets, selectedExercise }) {
  return (
    <li className="secondary-color h-[10rem] w-[90%] lg:w-[42%] xl:w-[42%] rounded-md m-2 mb-3 flex pt-2 pb-2 pl-2 shadow-xl mr-3.5">
      <>
        <img
          src={selectedExercise.imgUrl}
          alt="exercise"
          className="h-full w-[40%] object-cover rounded-sm"
        />

        <div className="w-full flex flex-col justify-center">
          <p className="text-center light-text text-base xl:text-base mb-1 tracking-wider">
            {selectedExercise.name}
          </p>
          <div className="flex flex-col items-center overflow-auto custom-scrollbar scrollbar-thumb-white">
            {sets.length > 0 && <p className="light-text">Sets</p>}
            <div className="flex space-x-3 w-full justify-center items-center flex-wrap px-3">
              {sets.length > 0 &&
                sets.map((set, index) => (
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
  )
}

export default ExerciseCard
