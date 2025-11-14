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
      className="text-sm py-1 px-2 md:text-base md:px-3 md:py-2.5 rounded-full bg-slate-800
       text-white font-semibold  hover:bg-slate-950
        transition-colors duration-300"
        onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
