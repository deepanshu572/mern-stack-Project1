import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { LuListVideo } from "react-icons/lu";
import { BiLike } from "react-icons/bi";
import { PiVideo } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { HiUserCircle } from "react-icons/hi2";

export const categories = [
  { name: "Home", icon: <IoHomeOutline />, class: "mob" },
  { name: "Shorts", icon: <SiYoutubeshorts />, class: "mob" },
  { name: "Create", icon: <FaPlus />,  class: "web somecss " },
  { name: "Subscription", icon: <MdOutlineSubscriptions />,  class: "mob big_svg" },
  { name: "Profile", icon: <HiUserCircle />,  class: "web big_svg" },
  { name: "Playlist", icon: <LuListVideo />, title: true },
  { name: "Saved video", icon: <PiVideo /> },
  { name: "Liked videos", icon: <BiLike />, divider: true, addData: true },
  // { name: "Settings", icon: <FiSettings />, type: "menu" },
  // { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
  // { name: "Help", icon: <FiHelpCircle />, type: "menu" },
  // { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];
