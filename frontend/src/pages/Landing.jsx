import React from 'react'
import Navbar from '../components/Navbar'
import Hero from "../components/Hero"
import Footer from "../components/Footer"

function Landing() {
  return (
    <div className='Landing-cntr'>
     <Navbar/>
     <Hero/>
     <Footer/>
    </div>
  )
}

export default Landing