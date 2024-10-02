import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'
import { useAuth0 } from '@auth0/auth0-react'


function App() {

  const {user , loginWithRedirect , isAuthenticated , logout} = useAuth0();
  console.log("current user is ", user)
 
  return (
    <>
     
      <Navbar/>
      {
        isAuthenticated ? <button className= 'mx-5 my-5  text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'  onClick={e=>{logout()}}>Logout</button> : <button className='mx-5 my-5 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => loginWithRedirect()}>Log In</button>
      }
      
      <div className='min-h-[87vh]' >
      <Manager/>
     </div>
     <Footer/>

    </>
  )
}

export default App
