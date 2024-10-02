import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-antiquewhite'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                   
                    <span>Lock</span><span className='text-green-500'>Box/&gt;</span>
                  
                    
                    </div>
                    <a href="https://github.com/itsbhavik1" target="_blank" className='inline-block'>
                <button className='text-white bg-green-500 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'> 
                    <img className='invert  w-10 p-1' src="/icons/github.svg" alt="github logo" />
                    <span  className='font-bold px-2'>GitHub</span>
                    
                </button>
                </a>
            </div>
        </nav>
  )
}

export default Navbar
