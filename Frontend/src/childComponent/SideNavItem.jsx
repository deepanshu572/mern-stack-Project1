import React from "react";

const SideNavItem = ({ text, icon, name, action }) => {
   
  return (
    <>
      <div
       key={text} 
       className={`side_nav_btn flex  ${name}`}
       onClick={action}
       >
        {icon}
        <p className=" text-[12.5px] sm:text-[13px] ">{text}</p>
      </div>
    </>
  );
};

export default SideNavItem;
