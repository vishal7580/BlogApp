import { Link, useNavigate } from "react-router-dom";
import Input from "./Input"; // assuming you have a custom Input component
import Button from "./Button"; // assuming you have a custom Button component
import { useForm } from "react-hook-form"
import { useState } from "react";
import { authService } from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";



const Signup = () => {

  const {register,handleSubmit} = useForm()
  const [error,setError] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signUp(formData){
    setError({})
    console.log(formData)
    
    authService.createAccount(formData)
    .then((user)=> {
      dispatch(login(user)) //stores user in state
      authService.login(user)
      navigate('/')
    })
  }
  const onError = (formError)=> {
    setError(formError)
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit(signUp,onError)}>
        {/* <!-- Name --> */}
        <div className="mb-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            
            {...register("name", { required: true })}
          />
        </div>

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
            label="Password"
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
          classname="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg 
                  hover:bg-indigo-700 transition duration-300"
        >
          Sign Up
        </Button>

        {/* <!-- Login link --> */}
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
