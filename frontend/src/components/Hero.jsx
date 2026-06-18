import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='hero-cntr'>
      <div className='hero-content'>
        <h1>Shorten your links, <span>instantly</span></h1>
        <p>Paste a long URL and get a clean, shareable short link in seconds. No signup required to try.</p>
        <Link to="/register" className='hero-btn'>Get Started</Link>
      </div>
    </div>
  )
}

export default Hero