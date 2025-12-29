import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import { serverUrl } from "../App";
import { alertHandler } from "../components/customAlert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPasword] = useState("");

  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [passwordToggle, setpasswordToggle] = useState(false);

  ///handle ui changes

  const handlePasswordToggle = () => {
    setpasswordToggle(!passwordToggle);
  };

  ///handle form submits

  const handleSendOtp = async (e) => {
    e.preventDefault();
    alert();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendOtp",
        { email },
        {
          extendsCredentials: true,
        }
      );
      alertHandler(result.data.message);
      setStep(2);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyOtp",
        { otp,email },
        {
          extendsCredentials: true,
        }
      );
        alertHandler(result.data.message);
      setStep(3);
    } catch (error) {
      alertHandler(error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/resetPassword",
        { email, NewPassword: password },
        {
          extendsCredentials: true,
        }
      );
        alertHandler(result.data.message);
        navigate("/login")
    } catch (error) {
      alertHandler(error);
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
        {step === 1 && (
          <>
            <h3 className="text-xl mb-0.5 ">Forgot your password? </h3>
            <p className="text-[10px] text-gray-500 pb-3">
              Enter your email address below and we'll send you OTP .
            </p>
            <form onSubmit={handleSendOtp} className="form flex flex-col gap-2">
              <div className="inp">
                <label
                  className="text-[13px] text-[#e4e2e2de] "
                  htmlFor="Email"
                >
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
                <div className=" mt-3 ">
                  <button
                    type="submit"
                    className="btn w-full p-2 rounded-sm py-2 text-xs"
                  >
                    {1 === 2 ? "loading...." : "Send OTP"}
                  </button>
                </div>
              </div>
              <div className="sec mb-1">
                <p className="text-center hover:underline text-[11px] ">
                  <Link to={"/login"} className="font-medium ">
                    Back to login page
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="text-xl mb-0.5 ">Enter your OTP </h3>
            <p className="text-[10px] text-gray-500 pb-3">
              Enter your OTP sent to your email address
            </p>
            <form
              onSubmit={handleVerifyOtp}
              className="form flex flex-col gap-2"
            >
              <div className="inp">
                <label className="text-[13px] text-[#e4e2e2de] " htmlFor="OTP">
                  {" "}
                  OTP
                </label>
                <div className="flex mt-1 overflow-hidden  items-center rounded-md bg-[#070A17]  border border-gray-800">
                  <div className="bg-[#010103] p-2 py-2 h-full w-8 flex items-center justify-center">
                    {" "}
                    <GoVerified className="w-3 h-3  " />
                  </div>{" "}
                  <input
                    required
                    type="text"
                    className="  w-full  p-2 py-2  text-xs outline-none"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div className=" mt-3 ">
                  <button
                    type="submit"
                    className="btn w-full p-2 rounded-sm py-2 text-xs"
                  >
                    {1 === 2 ? "loading...." : "Verify OTP"}
                  </button>
                </div>
              </div>
              <div className="sec mb-1">
                <p className="text-center hover:underline text-[11px] ">
                  <Link to={"/login"} className="font-medium ">
                    Back to login page
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <h3 className="text-xl mb-0.5 ">Reset your Password</h3>
            <p className="text-[10px] text-gray-500 pb-3">
              Enter the new password you want to set
            </p>
            <form
              onSubmit={handleForgotPassword}
              className="form flex flex-col gap-2"
            >
              <div className="inp">
                <label
                  className="text-[13px] text-[#e4e2e2de] "
                  htmlFor="Password"
                >
                  {" "}
                  New Password
                </label>

                <div className="flex mt-1 overflow-hidden  items-center rounded-md bg-[#070A17]  border border-gray-800">
                  <div className="bg-[#010103] p-2 py-2 h-full w-8 flex items-center justify-center">
                    {" "}
                    <RiLockPasswordLine className="w-3 h-3  " />
                  </div>{" "}
                  <input
                    required
                    type={passwordToggle ? "text" : "password"}
                    className=" w-full  p-2 py-2  text-xs outline-none"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
                    type={passwordToggle ? "text" : "password"}
                    className="   w-full  p-2 py-2  text-xs outline-none"
                    placeholder="Enter confirm Password"
                    value={confirmPasword}
                    onChange={(e) => setConfirmPasword(e.target.value)}
                  />
                </div>
              </div>
              <div className="show_password flex gap-1 items-center justify-end">
                <input
                  type="checkbox"
                  className="w-[10px] relative bottom-0.5 "
                  id="password"
                />

                <label
                  htmlFor="password"
                  className="show"
                  onClick={handlePasswordToggle}
                >
                  <p className="text-[11px]">Show my password</p>
                </label>
              </div>
              <div className=" mt-3 ">
                <button className="btn w-full p-2 rounded-sm py-2 text-xs">
                  {1 === 2 ? "loading...." : "Reset Password"}
                </button>
              </div>

              <div className="sec mb-1">
                <p className="text-center hover:underline text-[11px] ">
                  <Link to={"/login"} className="font-medium ">
                    Back to login page
                  </Link>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
