import ExerciseDashboard from '../Features/Dashboard/ExerciseDashboard'
import { useUser } from '../../context/UserContext'
import { useExercises } from '../../context/ExercisesContext'

function HomePage() {
  const { userData } = useUser()
  const { userSavedWorkouts } = useExercises()

  return (
    <>
      {userData?.user ? (
        <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] mt-2 md:mt-0">
          <ExerciseDashboard workouts={userSavedWorkouts} />
        </section>
      ) : (
        <h1 className="text-center mt-[26rem] text-3xl">Please Log In</h1>
      )}
    </>
  )
}

export default HomePage
