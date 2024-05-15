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
  const [formerrors, setformerrors] = useState({});
  const [inc,setInc] = useState({});
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const {access_token} = tokenResponse;
      localStorage.setItem("tokenId",access_token);
      navigate("/home",);
    },
  });
  const handleSubmit= ()=>{
    setformerrors(validate(email,Password));
    if(email && Password){
      const err={}
      if(email === "muthukaruppanaakash76@gmail.com" && Password=="Mk_muthu_25")
        {
          navigate('/home');
        }
        else{
          err.t = "Email or Password is incorrect";
        }
    }
  }
  const errors = {}
  const validate=(email,Password)=>{
    if(!email){
      errors.email = "Email is required";
    }
    if(!Password){
      errors.Password = "Password is required";
    }
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
            <p className=" text-red-500">{formerrors.email}</p>
          </div>
          <div className="border p-2 w-[470px] mt-5 h-[50px] items-center rounded-md border-gray-400">
            <input
              type="text"
              placeholder="Password"
              className="w-full outline-none border-none h-full"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <p className=" text-red-500">{formerrors.Password}</p>
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
          <p className=" text-red-500">{inc.t}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
