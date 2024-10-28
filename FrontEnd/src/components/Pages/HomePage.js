import ExerciseDashboard from '../Features/Dashboard/ExerciseDashboard'
import { useUser } from '../../context/UserContext'
import { useExercises } from '../../context/ExercisesContext'

function HomePage() {
  const { userData } = useUser()
  const { userSavedWorkouts } = useExercises()

  return (
    <>
      {userData?.user ? (
        <section>
          <ExerciseDashboard workouts={userSavedWorkouts} />
        </section>
      ) : (
        <h1 className="text-center mt-[26rem] text-3xl">LOADING...</h1>
      )}
    </>
  )
}

export default HomePage
