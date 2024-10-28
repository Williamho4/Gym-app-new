import ExerciseDashboard from '../Features/Dashboard/ExerciseDashboard'
import { useUser } from '../../context/UserContext'

function HomePage() {
  const { userData } = useUser()
  return (
    <>
      {userData?.user ? (
        <section>
          <ExerciseDashboard />
        </section>
      ) : (
        <h1 className="text-center mt-[26rem] text-3xl">LOADING...</h1>
      )}
    </>
  )
}

export default HomePage
