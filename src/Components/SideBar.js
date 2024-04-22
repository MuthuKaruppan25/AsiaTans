import React, { useState } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Logo from "../Assets/TANS.png";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
const SideBar = () => {
  const navLinks = [
    {
      name: "DashBoard",
      icon: SpaceDashboardOutlinedIcon,
      link: "/home/dashboard",
    },
    {
      name: "Products",
      icon: ShoppingBagOutlinedIcon,
      link: "/home/products",
    },
    {
      name: "Customer",
      icon: PersonOutlinedIcon,
      link: "/home/customers",
    },
    {
      name: "Order",
      icon: ShoppingCartOutlinedIcon,
      link: "/home/orders",
    },
    {
      name: "Invoice",
      icon: DescriptionOutlinedIcon,
      link: "/home/invoice",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="flex">
      <div className="px-10 py-3 flex flex-col r w-30 h-screen border border-r-1 ">
        <div className="logo-div flex space-x-2 items-center">
          <img src={Logo} className="w-17 h-[50px]" />
          <span className="text-3xl font-bold ">Tans</span>
        </div>
        <span className="mt-8 text-slate-500">Menu</span>
        <div className="flex flex-col space-y-5 mt-4">
          {navLinks.map((item, index) => {
            return (
              <Link to={item.link} key={index}>
                <div
                  className={
                    "flex space-x-3 pl-2 pr-12 pt-2 pb-2 rounded-xl font-semibold" +
                    (active === index ? " bg-[#4367de] text-white " : " ")
                  }
                  onClick={() => setActive(index)}
                >
                  <item.icon />
                  <span className="">{item?.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
