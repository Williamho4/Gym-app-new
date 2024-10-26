import { useState } from 'react'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

function Dropdown({ type, dropdownList, onClick }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative flex flex-col items-center w-[48%] h-auto rounded-xl">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-400 p-3 w-full flex items-center justify-between  text-md rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
      >
        {type}
        {!isOpen ? (
          <FaCaretUp className="h-8" />
        ) : (
          <FaCaretDown className="h-8" />
        )}
        {isOpen && (
          <div className="bg-blue-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full left-0">
            {dropdownList.map((muscle, i) => (
              <div
                className="flex w-full justify-between hover:bg-blue-300 cursor-pointer rounded-md border-l-transparent p-2 items-center"
                onMouseDown={() => {
                  onClick(muscle)
                  setIsOpen(false)
                }}
              >
                <h3 className="tracking-widest">{muscle}</h3>
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  )
}

export default Dropdown
