import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdAlternateEmail } from "react-icons/md";

import { FaRegEye } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { serverUrl } from "../App";
import { alertHandler } from "../components/customAlert";
import { useDispatch } from "react-redux";
import { getUserData } from "../redux/userSlice";
import Loader from "../childComponent/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setload] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setload(true);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      alertHandler("Login Successfully")
      dispatch(getUserData(result?.data));
      navigate("/");
      setload(false);
    } catch (error) {
        // alertHandler(error.response.data);
      console.log(error);

      setload(false);
    }
  };
  return (
    <div className="flex w-full font1   h-screen items-center justify-center">
      <div className="left rounded-bl-2xl rounded-tl-2xl  overflow-hidden relative  w-[20rem] h-[31.8rem] border border-[#292E3A]  ">
        <div className="img w-full h-full">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW91dHViZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
        </div>
      </div>
      <div className="register rounded-br-2xl rounded-tr-2xl w-[20rem] flex flex-col justify-center h-[31.8rem]  border border-[#292E3A] bg-[#020211]  p-5 py-2">
        {/* <FaArrowLeft className="w-4 h-4" /> */}
        <h3 className="text-xl mb-0.5 ">Login </h3>
        <p className="text-[10px] text-gray-500 pb-3">
          Enter details to login your account
        </p>
        <form onSubmit={handleLogin} className="form flex flex-col gap-2">
          <div className="inp">
            <label className="text-[13px] text-[#e4e2e2de] " htmlFor="Email">
              {" "}
              Email
            </label>
            <div className="flex mt-1 overflow-hidden  items-center rounded-md bg-[#070A17]  border border-gray-800">
              <div className="bg-[#010103] p-2 py-2 h-full w-8 flex items-center justify-center">
                {" "}
                <MdAlternateEmail className="w-3 h-3  " />
              </div>{" "}
              <input
                required
                type="text"
                className="  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="inp">
            <label className="text-[14px] text-[#e4e2e2de] " htmlFor="Password">
              {" "}
              Password
            </label>

            <div className="flex mt-1 overflow-hidden  items-center rounded-md bg-[#070A17]  border border-gray-800">
              <div className="bg-[#010103] p-2 py-2 h-full w-8 flex items-center justify-center">
                {" "}
                <RiLockPasswordLine className="w-3 h-3  " />
              </div>{" "}
              <input
                required
                type="text"
                className="  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div className="btn_eye mr-2">
                       <FaRegEye className="w-4 h-4  " />
                       </div> */}
            </div>
          </div>
          <div className="sec flex justify-end">
            <Link
              to={"/forgotpassword"}
              className=" hover:underline cursor-pointer text-center text-[11px]"
            >
              Forgot Password?
            </Link>
          </div>

          <div className=" mt-1 ">
            <button className="btn w-full p-2  rounded-sm py-2 text-xs flex items-center justify-center">
              {load ? <Loader/> : "Login"}
            </button>
          </div>
          <div className="sec mb-1">
            <p className="text-center text-[11px] ">
              Don't have an account?{" "}
              <Link to={"/register"} className="font-medium ">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
