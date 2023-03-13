import React from 'react'
import { Link } from 'react-router-dom'
import { UilSetting } from "@iconscout/react-unicons";
import comment from "../../img/comment.png";
import notification from "../../img/noti.png";
import home from "../../img/home.png";

const NavIcons = () => {
    return (
        <div className="navIcons">
            <Link to='../home'>
                <img src={home} alt="" />
            </Link>
            <UilSetting />
            <img src={notification} alt="" />
            <Link to='../chat'>
                <img src={comment} alt="" />
            </Link>
        </div>
    )
}

export default NavIcons