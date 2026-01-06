import React from "react";

const SideNavItem = ({ somename , text, icon, name, action , MobileMenu }) => {
    console.log(somename)
  return (
    <>
      <div
       key={text} 
       className={` ${somename} side_nav_btn cursor-pointer transition-all duration-300 ease-in-out flex ${MobileMenu ? "justify-center" : ""}   ${name}`}
       onClick={action}
       >
        {icon}
        <p className={`text-[12.5px] sm:text-[13px] ${MobileMenu ? "hidden" : "block"}`}>{text}</p>
      </div>
    </>
  );
};

export default SideNavItem;
