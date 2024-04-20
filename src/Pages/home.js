import React from "react";
import { Switch, Route, Routes } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Dashboard from "./dashboard";
import NavBar from "../Components/NavBar";

import Customer from "./Customer";
import Products from "./Products";
import Orders from "./Orders";

const Home = () => {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <main className="grow">
          <NavBar />
          <Orders/>
        </main>
      </div>
    </div>
  );
};

export default Home;
