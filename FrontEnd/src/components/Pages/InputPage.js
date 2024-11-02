import Input from '../UI/Input'
import WorkoutPlan from '../UI/WorkoutPlan'

function InputPage() {
  return (
    <div className="flex flex-col lg:flex-row m-2 xl:m-0 items-center justify-center min-h-[calc(100vh-4rem)] lg:space-x-4 space-y-6 lg:space-y-0">
      <Input></Input>
      <WorkoutPlan></WorkoutPlan>
    </div>
  )
}

export default InputPage
