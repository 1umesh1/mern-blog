import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class="bg-green-400 border-gray dark:bg-gray-900"> 
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
   <ul>
    <li className='inline-block py-4'>
         <Link to="/" className="pl-6 pr-8"> Home</Link>
        </li>
    </ul>
    <ul>
    <li className='inline-block py-4'>
         <Link to="/about" className="pl-6 pr-8"> About</Link>
        </li>
    </ul>
    <ul>
    <li className='inline-block py-4'>
         <Link to="/articles" className="pl-6 pr-8"> Articles</Link>
        </li>
    </ul>
    </div>
   </nav>
  )
}

export default Navbar