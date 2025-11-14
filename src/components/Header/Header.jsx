import React from "react";
import { Button, LogoutBtn } from "../index";
import {Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const Header = () => {
  const authRequired = useSelector((state)=> state.auth.status);
  
  const navItems = [
    {
      page: "Posts",
      url: "/",
      active: true,
    },
    {
      page: "AddPost",
      url: "/add-post",
      active: authRequired,
    },
    {
      page: "Login",
      url: "/login",
      active: !authRequired,
    },
    {
      page: "Signup",
      url: "/signup",
      active: !authRequired,
    },
  ];
  return (
    <>
        <div className="w-full px-3 py-3  bg-slate-600 flex items-center justify-between">
          <Link to={'/'} className="text-xl md:text-2xl font-semibold text-white capitalize tracking-wider">blogs</Link>
          {/* <button onClick={()=> authService.checkAllSessions()}>session</button> */}
          <div className="flex space-x-2">
            {
                navItems.map((item) => (
                item.active && <div key={item.page}>
                    <Link to={item.url}>
                        <Button
                        classname="text-sm py-1 px-2 md:text-base md:px-3 md:py-2.5 rounded-full bg-slate-600 text-white 
                        hover:bg-white hover:text-black font-semibold
                        transition-colors duration-300"
                        >
                            {item.page}
                        </Button>
                    </Link>
                </div>
            ))
            }
          {
            authRequired && <LogoutBtn></LogoutBtn>
          }
          </div>

        </div>
    </>
  );
};

export default Header;
