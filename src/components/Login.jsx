import React, { useState } from 'react'
import {Button, Input} from './index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authService } from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import {login as stateLogin,logout as stateLogout} from '../store/authSlice'

const Login = () => {

  const {register,handleSubmit} = useForm()
  const [error,setError] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const login = (formData)=> {
    setError({})
    console.log('login formData: ',formData,loading)
    setLoading(true)
    authService.login(formData)
    .then(userData => {
      if(userData)
         dispatch(stateLogin(userData))
      else
         dispatch(stateLogout())
      }).catch(()=> {
        console.log('error in login')
      }).finally(()=>{
        setLoading(false)
        console.log('navigating to /')
        navigate('/')
    })
  }
  const onError = (formError)=> {
    setError(formError)
  }

  return (
    
    loading ?
      <div className="flex items-center justify-center mt-[40%]">
        <div className="w-14 h-14 border-4 border-white border-dashed rounded-full animate-spin"></div>
      </div>  : 
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>

      <form onSubmit={handleSubmit(login,onError)}>
        {/* <!-- Email --> */}
        <div className="mb-4">
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
        <div className="mb-4">
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
          classname='w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg  hover:bg-indigo-700 transition duration-300'
        >
          Login
        </Button>

        {/* <!-- Sign up link --> */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account? 
          <Link to='/signup' className="text-indigo-600 font-medium hover:underline">Sign Up</Link>
        </p>
      </form>
      </div>
    
  )
}

export default Login