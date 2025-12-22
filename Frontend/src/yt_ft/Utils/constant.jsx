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
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";



export const categories = [
    { name: "Home", icon: <IoHomeOutline  />, DataId : 10 },
        
    { name: "Entertainment", icon: <MdLocalFireDepartment />, DataId : 24, },
    { name: "Blogs", icon: <CgMusicNote />, DataId : 22 , title: true},
    { name: "Comedy", icon: <FiFilm />, DataId : 23 },
    { name: "Technology", icon: <MdLiveTv />, DataId : 28 },
    { name: "Gaming", icon: <IoGameControllerSharp />, DataId : 20 },
    { name: "News", icon: <ImNewspaper />, DataId : 25 },
    { name: "Sports", icon: <GiDiamondTrophy />, DataId : 17,divider: true, addData : true
    },
    { name: "Settings", icon: <FiSettings />, type: "menu" },
    { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
    { name: "Help", icon: <FiHelpCircle />, type: "menu" },
    { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];
