import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      console.log(data)
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='register-cntr'>
      <div className='register-box'>
        <div className='register-header'>
          <h2>Create an account</h2>
          <p>Start shortening your links today</p>
        </div>

        <div className='register-form'>
          <div className='form-group'>
            <label>Name</label>
            <input type="text" name="name" placeholder="John Doe" onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" onChange={handleChange} />
          </div>
          <button className='register-btn' onClick={handleSubmit}>Register</button>
        </div>

        <p className='register-login'>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Register