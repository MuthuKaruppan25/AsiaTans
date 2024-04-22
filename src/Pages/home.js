import React from "react";
import { Switch, Route, Routes, Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Dashboard from "./dashboard";
import NavBar from "../Components/NavBar";

import Customer from "./Customer";
import Products from "./Products";
import Orders from "./Orders";
import { DnsSharp } from "@mui/icons-material";

const Home = () => {
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
