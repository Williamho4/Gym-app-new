import Logo from './Logo'
import Nav from './Nav'

function Header() {
  return (
    <header className="secondary-color sticky top-0 z-[20] mx-auto flex flex-wrap w-full items-center justify-between px-4 pr-6 p-1">
      <Logo />
      <Nav />
    </header>
  )
}

export default Header
