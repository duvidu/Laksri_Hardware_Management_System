import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    BsCart3,
    BsGrid1X2Fill,
    BsFillArchiveFill,
    BsFillGrid3X2GapFill,
    BsPeopleFill,
    BsListCheck,
    BsMenuButtonWideFill,
    BsFillGearFill,
    BsFillCursorFill,
    BsFillXCircleFill,
} from "react-icons/bs";

function DashboardSidebar({ onClose }) {
    return (
        <aside id="sidebar">

            <div className="sidebar-title" >

                <div className="sidebar-brand" style={{ color: 'white', fontSize: '20px' }}>
                    <BsCart3 className="icon_header" style={{ color: 'white', fontSize: '34px', textDecoration: "none" }} /> Shop
                </div>

                <BsFillXCircleFill onClick={onClose} className="icon close-icon" style={{ color: 'red', fontSize: '40px' }} /> {/* Close icon */}

                {/* <span className="icon close-icon">x</span> */}
            </div>


            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <a href="">

                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="/Dashboard">
                        <BsGrid1X2Fill className="icon" /> Dashboard
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillArchiveFill className="icon" /> User Management
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="/MapView">
                        <BsFillCursorFill className="icon" /> Delivery Management
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="/inventory">
                        <BsFillGrid3X2GapFill className="icon" /> Inventory management
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="/supply-management">
                        <BsPeopleFill className="icon" /> Supply management
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="/rentalService">
                        <BsFillGrid3X2GapFill className="icon" /> Rental Services management
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="">
                        <BsMenuButtonWideFill className="icon" /> report management
                    </a>
                </li>

                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillGearFill className="icon" /> Setting
                    </a>
                </li>
            </ul>
        </aside>
    );
}
export default DashboardSidebar;
