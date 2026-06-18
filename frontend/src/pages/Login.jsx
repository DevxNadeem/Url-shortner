import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      console.log(data)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='register-cntr'>
      <div className='register-box'>
        <div className='register-header'>
          <h2>Welcome back</h2>
          <p>Login to your account</p>
        </div>

        <div className='register-form'>
          <div className='form-group'>
            <label>Email</label>
            <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" onChange={handleChange} />
          </div>
          <button className='register-btn' onClick={handleSubmit}>Login</button>
        </div>

        <p className='register-login'>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login