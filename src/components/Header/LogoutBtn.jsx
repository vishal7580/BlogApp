import React from "react";
import { authService } from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogout = ()=> {
    authService.logout()
    .then(()=> {
      dispatch(logout())
      console.log('Logged Out')
    }).finally(()=> {
      navigate('/')
    })
  }

  return (
    <button
      className="px-2 py-1.5 rounded-full bg-slate-600
       text-white hover:text-black font-semibold  hover:bg-white 
        transition-colors duration-300"
        onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
