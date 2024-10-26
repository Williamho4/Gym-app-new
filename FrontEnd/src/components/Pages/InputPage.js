import Input from '../UI/Input'
import WorkoutPlan from '../UI/WorkoutPlan'

function InputPage() {
  return (
    <div className="flex flex-col lg:flex-row justify-center mt-6 items-center mx-6">
      <Input></Input>
      <WorkoutPlan></WorkoutPlan>
    </div>
  )
}

export default InputPage
