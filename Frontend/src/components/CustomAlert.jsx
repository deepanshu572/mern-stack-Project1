import React, { useEffect, useState } from "react";

let msgHolder;
export const alertHandler = async (msg) => {
  if (msg) {
    msgHolder(msg);
  }
};

const CustomAlert = () => {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    msgHolder = (message) => {
      setMsg(message);
      setVisible(true);
    };
  },[]);
  const handleAlert = () => {
    setMsg("");
    setVisible(false);
  };

  return visible ? (
    <div className="h-screen w-full flex items-start  z-[1095] justify-center fixed left-0 top-0 bg-[#00000072]">
      <div className="flex_alert bg-[#202124] p-4 w-[18rem] h-[6rem] rounded-sm mt-5">
        <h3 className="pb-2 capitalize text-xs ">{msg}</h3>
        <div className="flex justify-end">
          <button
            onClick={handleAlert}
            className="p-1 btn text-xs px-3 bg-red-300 rounded-full "
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CustomAlert;
