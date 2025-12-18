import React from "react";
import { Link } from "react-router";
import { FaUserTie } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";

const Register = () => {
  return (
    <div className="flex w-full font1   h-screen items-center justify-center">
      <div className="register w-[20rem] border border-[#292E3A] rounded-md bg-[#020211]  p-5 py-2">
        <h3 className="text-xl mb-0.5 ">Create an account</h3>
        <p className="text-[10px] text-gray-500 pb-3">
          Enter details to create an account
        </p>
        <form className="form flex flex-col gap-2">
          <div className="inp">
            <label className="text-[13px] text-[#e4e2e2de]" htmlFor="username">
              {" "}
              Username
            </label>
            <div className="flex mt-1 overflow-hidden  items-center rounded-md bg-[#070A17]  border border-gray-800">
              <div className="bg-[#010103] p-2 py-2 h-full w-8 flex items-center justify-center">
                {" "}
                <FaUserTie className="w-3 h-3  " />
              </div>{" "}
              <input
              required
                type="text"
                className="   w-full  p-2 py-2  text-xs outline-none"
                placeholder="Username"
              />
            </div>
          </div>
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
                className=" :fo  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="inp">
            <label className="text-[13px] text-[#e4e2e2de] " htmlFor="Password">
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
                className=" :fo  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Enter Password"
              />
              {/* <div className="btn_eye mr-2">
              <FaRegEye className="w-4 h-4  " />
              </div> */}
            </div>
          </div>
          <div className="inp">
            <label
              className="text-sm text-[#e4e2e2de] "
              htmlFor="confirm-Password"
            >
              {" "}
              Confirm Password
            </label>
            <div className="flex mt-1 overflow-hidden  items-center rounded-md bg-[#070A17]  border border-gray-800">
              <div className="bg-[#010103] p-2 py-2 h-full w-8 flex items-center justify-center">
                {" "}
                <RiLockPasswordLine className="w-3 h-3  " />
              </div>{" "}
              <input
              required
                type="text"
                className=" :fo  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Enter confirm Password"
              />
                 <div className="btn_eye mr-2">
              <FaRegEye className="w-4 h-4  " />
              </div>
            </div>
          </div>
          <div className=" mt-1 ">
            <button className="btn w-full p-2 rounded-sm py-2 text-xs">
              Next
            </button>
          </div>
          <div className="sec mb-1">
            <p className="text-center text-[11px] ">
              Already have an account?{" "}
              <Link to={"/login"} className="font-medium ">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
