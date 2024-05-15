import React, { useEffect } from "react";
import { Switch, Route, Routes, Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Dashboard from "./dashboard";
import NavBar from "../Components/NavBar";

import Customer from "./Customer";
import Products from "./Products";
import Orders from "./Orders";
import { DnsSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const tokenId = localStorage.getItem("tokenId");
  const navigate = useNavigate();
  useEffect(()=>{
    const fetch=()=>{
      if(!tokenId)
        {
            navigate("/");
        }
    };
    fetch();
  },[])
  return (
    <div>
      <div className="flex">
        <SideBar />
        <main className="grow">
          <NavBar />
           <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default Home;
