import React from "react";

const SideNavItem = ({ text, icon, className, action }) => {
   
  return (
    <>
      <div
       key={text} 
       className={`side_nav_btn flex  ${className}`}
       onClick={action}
       >
        {icon}
        <p className=" text-[13px] ">{text}</p>
      </div>
    </>
  );
};

export default SideNavItem;
