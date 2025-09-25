import React from "react";
import { Container, Button, LogoutBtn } from "../index";
import {Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const Header = () => {
  const authRequired = useSelector((state)=> state.auth.status);
  
  const navItems = [
    {
      page: "Home",
      url: "/",
      active: true,
    },
    {
      page: "AddPost",
      url: "/add-post",
      active: authRequired,
    },
    // {
    //   page: "EditPost",
    //   url: "/edit-post",
    //   active: authRequired,
    // },
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
        <div className="w-full p-4 bg-slate-600 flex items-center justify-between">
          <Link to={'/'} className="text-2xl font-semibold text-white uppercase">blog</Link>

          <div className="flex space-x-2">
            {
                navItems.map((item) => (
                item.active && <div key={item.page}>
                    <Link to={item.url}>
                        <Button
                        classname="px-4 py-2 rounded-full bg-slate-600 text-white 
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
