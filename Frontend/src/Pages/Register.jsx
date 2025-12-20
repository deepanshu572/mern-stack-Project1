import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaUserTie } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { MdOutlineCloudUpload } from "react-icons/md";
import { alertHandler } from "../components/customAlert";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPasword] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState("");
  const [passwordToggle, setpasswordToggle] = useState(false);
  const [load, setload] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    // console.log(e.target.files[0].name);
    setBackendImage(file);

    setFrontendImage(URL.createObjectURL(file));
  };
  const handlePasswordToggle = () => {
    setpasswordToggle(!passwordToggle);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
        setload(true);

    if (backendImage == "") {
      alertHandler("please upload your image !");
      return;
    }
    if (password !== confirmPasword) {
      alertHandler("passord doen't match !");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", backendImage);
    try {
      let result = await axios.post(
        serverUrl + "/api/auth/register",
        formData,
        { withCredentials: true }
      );
      navigate("/");
              setload(false);

    } catch (error) {
      alertHandler(error.response.data.message);
      setload(false);
    }
  };
  return (
    <div className="flex w-full font1   h-screen items-center justify-center">
      <div className="register w-[20rem] border border-[#292E3A] rounded-md bg-[#020211]  p-5 py-2">
        <h3 className="text-xl mb-0.5 ">Create an account</h3>
        <p className="text-[10px] text-gray-500 pb-3">
          Enter details to create an account
        </p>

        <form onSubmit={handleRegister} className="form flex flex-col gap-2">
          <div className="flex_img">
            <label htmlFor="img" className="flex items-center gap-2 ">
              <div className="image w-15 h-15 shrink-0 relative  rounded-full">
                {frontendImage ? (
                  <>
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={frontendImage}
                      alt={frontendImage}
                    />

                    <div className="bg absolute left-0 top-0 bg-[#0b0b0b85] hover:bg-[#0b0b0bba] w-full h-full flex items-center justify-center">
                      {" "}
                      <MdOutlineCloudUpload className="" />{" "}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg absolute left-0 top-0 bg-[#0b0b0b85] hover:bg-[#0b0b0bba] w-full h-full flex items-center justify-center">
                      {" "}
                      <MdOutlineCloudUpload className="" />{" "}
                    </div>
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt={frontendImage}
                    />
                  </>
                )}
              </div>
              {frontendImage ? (
                <p className="text-[10px] text-center text-green-500">
                  Uploded succesfully !
                </p>
              ) : (
                <p className="text-[10px] text-center text-gray-500">
                  Upload your image
                </p>
              )}

              <input
                type="file"
                onChange={(e) => handleImage(e)}
                className="w-full hidden "
                accept="image/*"
                name="image"
                id="img"
              />
            </label>
          </div>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={passwordToggle ? "text" : "password"}
                className=" w-full  p-2 py-2  text-xs outline-none"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type={passwordToggle ? "text" : "password"}
                className=" :fo  w-full  p-2 py-2  text-xs outline-none"
                placeholder="Enter confirm Password"
                value={confirmPasword}
                onChange={(e) => setConfirmPasword(e.target.value)}
              />
              {/* <div className="btn_eye mr-2">
                <FaRegEye className="w-4 h-4  " />
              </div> */}
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
          <div className=" mt-1 ">
            <button className="btn w-full p-2 rounded-sm py-2 text-xs">
             {load ? "loading...." : "Create Account"}
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
