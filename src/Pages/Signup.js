import React, { useState } from "react";
import signup from "../Assets/Signup.png";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../Assets/TANS.png";
import google from "../Assets/google.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const {access_token} = tokenResponse;
      localStorage.setItem("tokenId",access_token);
      navigate("/home",);
    },
  });
  const handleSubmit= ()=>{
    const data={
      email:email,
      password:Password
    }
    fetch("http://192.168.235.166:8000/booking/getBookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("")
      })
      .catch((error) => {
        console.error("Error booking ticket:", error);
      });
  }
  return (
    <div className="flex">
      <div className="h-screen w-[50%] bg-[#4287f5]">
        <img src={signup}></img>
      </div>
      <div className=" w-[50%]">
        <div className="flex items-center mt-[20%] flex-col">
          <img src={logo} className="w-[100px] h-[100px]" />
          <span className="text-semibold text-3xl">Login to your Account</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="border p-2 w-[470px] mt-5 h-[50px] items-center rounded-md border-gray-400">
            <input
              type="text"
              placeholder="Email"
              className="w-full outline-none border-none h-full"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="border p-2 w-[470px] mt-5 h-[50px] items-center rounded-md border-gray-400">
            <input
              type="text"
              placeholder="Password"
              className="w-full outline-none border-none h-full"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button className="pl-[205px] pr-[205px] pt-2 pb-2 bg-blue-500 rounded-lg mt-8 shadow-md" onClick={handleSubmit}>
            <span className="text-white text-semibold text-[20px]">Submit</span>
          </button>
          <span className="text-1xl text-slate-400 mt-5">Or signin with</span>
          <button
            className="p-2 bg-slate-100 shadow-md rounded-full mt-5"
            onClick={() => login()}
          >
            <img src={google} alt="GOOGLE" className="w-[30px] h-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
