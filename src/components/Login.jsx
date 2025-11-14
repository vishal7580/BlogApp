import React, { useState } from 'react'
import {Button, Input} from './index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authService } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import {login as stateLogin,logout as stateLogout} from '../store/authSlice'
import Loader from './Loader'

const Login = () => {

  const {register,handleSubmit} = useForm()
  const [error,setError] = useState({})
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (formData)=> {
    setError({})
    setLoading(true)

    try {
      const user = await authService.login(formData)
      dispatch(stateLogin(user))
      navigate('/')
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error.message)
      dispatch(stateLogout())
    }

  }
  const onError = (formError)=> {
    setError(formError)
  }

  return (
    
    loading ?
   <Loader/> : 
      <div className="md:w-full w-10/12 max-w-sm bg-white rounded-2xl shadow-xl p-5 md:p-8">
      <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-3 md:mb-6">Login</h1>

      <form onSubmit={handleSubmit(login,onError)}>
        {/* <!-- Email --> */}
        <div>
          <Input
          label="Email"
            type="email" 
            placeholder="Enter your email"
            error={error?.email?.message}
              {...register("email", {
                required: true , 
                pattern:{
                  value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: 'Invalid Email'
                }
                
              })}
          />
        </div>

        {/* <!-- Password --> */}
        <div>
          <Input
            label='Password'
            type="password" 
            placeholder="Enter your password"
            error={error?.password?.message}
              {...register("password", {
                required: true,
                pattern: {
                  value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: 'At least 8 chars,with atleast 1 digit,1 lowercase, 1 uppercase letter,'
              } })}
          />
        </div>

        {/* <!-- Button --> */}
        <Button
          type="submit"
          classname='text-sm md:text-base w-full py-1.5 md:py-2 bg-indigo-600 text-white font-semibold rounded-lg  hover:bg-indigo-700 transition duration-300'
        >
          Login
        </Button>

        {/* <!-- Sign up link --> */}
        <p className="mt-2 md:mt-4 text-xs md:text-sm text-gray-600 text-center">
          Don’t have an account? 
          <Link to='/signup' className="text-indigo-600 font-medium hover:underline">Sign Up</Link>
        </p>
      </form>
      </div>
    
  )
}

export default Login