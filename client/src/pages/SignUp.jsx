import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/oAuth'
import { signUpStart, signUpSuccess, signUpFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value}) 
    //mantenemos el valor que haya en formData con el spread operator y le añadimos el nuevo valor
    //con e.target.id obtenemos el valor segun id (username) y con e.target.value obtenemos el valor de ese id (Username)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(signUpStart())
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signUpFailure(data))
        return
      }
      dispatch(signUpSuccess(data))
      navigate('/sign-in')
    } catch(error){
      dispatch(signUpFailure(error))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Confirm Password" id="confirmPassword" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ""}</p>
    </div>
  )
}
