import React from "react";

const SideNavItem = ({ text, icon, name, action , MobileMenu }) => {
   
  return (
    <>
      <div
       key={text} 
       className={`side_nav_btn cursor-pointer transition-all duration-300 ease-in-out flex ${MobileMenu ? "justify-center" : ""}   ${name}`}
       onClick={action}
       >
        {icon}
        <p className={`text-[12.5px] sm:text-[13px] ${MobileMenu ? "hidden" : "block"}`}>{text}</p>
      </div>
    </>
  );
};

export default SideNavItem;
