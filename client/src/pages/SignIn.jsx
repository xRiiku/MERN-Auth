import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function SignIn() {
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
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch(error){
      dispatch(signInFailure(error))
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ""}</p>
    </div>
  )
}
