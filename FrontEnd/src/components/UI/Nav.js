import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useUser } from '../../context/UserContext'

const NavLinks = () => {
  const { loggedIn } = useUser()

  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/workoutPlanner">Workout Planner</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      {!loggedIn && <NavLink to="/login">Login</NavLink>}
    </>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="w-1/5 light-text">
        <div className="hidden lg:flex w-full justify-between">
          <NavLinks></NavLinks>
        </div>
        <div className="lg:hidden flex justify-end">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {isOpen && (
        <div className=" flex lg:hidden flex-col items-center basis-full pb-2 light-text">
          <NavLinks></NavLinks>
        </div>
      )}
    </>
  )
}

export default Nav
