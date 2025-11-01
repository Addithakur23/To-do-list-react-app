import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-blue-400 p-3 mb-2'>
        <div className="logo text-lg mx-2">
           <b>iTask</b>
        </div>
        <ul className='flex gap-8 mx-4 hover:bold  transition-all cursor-pointer '>
            <li >Home</li>
            <li>Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
