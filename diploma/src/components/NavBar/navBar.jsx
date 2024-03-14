import React from "react";
import { NavLink } from "react-router-dom";

import './dist/navBar.css'


export function NavBar(){
    return(
        <div className="nav_bar">
            <div className="logo"></div>
            <NavLink to='/' activeсlassname="active"  className="link_con">
                <div className="left_border"></div>
                <img className="def_img" src="./img/dash.svg" alt="" />
                <img className="act_img" src="./img/dash_active.svg" alt="" />
            </NavLink>
            <NavLink to='/trucks' activeсlassname="active" className="link_con">
                <div className="left_border"></div>
                <img className="def_img" src="./img/truck.svg" alt="" />
                <img className="act_img" src="./img/truck_active.svg" alt="" />
            </NavLink>
            <NavLink to = '/workers' activeсlassname="active" className="link_con">
                <div className="left_border"></div>
                <img className="def_img" src="./img/driver.svg" alt="" />
                <img className="act_img" src="./img/driver_active.svg" alt="" />
            </NavLink>
            <div className="link_con">
                <div className="left_border"></div>
                <img className="def_img contract" src="./img/contract.svg" alt="" />
                <img className="act_img contract_act" src="./img/contract_active.svg" alt="" />
            </div>
        </div>
    )
}