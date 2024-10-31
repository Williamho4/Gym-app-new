import { useNavigate } from 'react-router-dom'

const Logo = () => {
  const navigate = useNavigate()

  return (
    <div
      className="logo w-14 h-14 cursor-pointer"
      onClick={() => navigate('/')}
    >
      <img src="/images/straight-arm-lat-pulldown.png" alt="" />
    </div>
  )
}

export default Logo
