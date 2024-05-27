import React, { useState } from 'react';
import "./Sidebar.css"
import {
    FaHome,
    FaBars,
    FaUserAlt,
    FaCommentAlt,
}from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi";
import { BiSolidCategory } from "react-icons/bi";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaHome size={20}/>
        },
        {
            path:"/Aboutpg",
            name:"About",
            icon:<FaUserAlt size={20}/>
        },
        {
            path:"/ContactUs",
            name:"Contact",
            icon:<FaCommentAlt size={20}/>
        },
        {
            path:"/Product",
            name:"Browse all Products",
            icon:<GiBookshelf size={20}/>
        },
        {
            path:"/BookListByAuthor",
            name:"Search by author",
            icon:<MdPersonSearch size={20}/>
        },
        {
            path:"/Catrelg",
            name:"Search by category",
            icon:<BiSolidCategory size={20}/>
        }
    ]
    return (
        <div className="container1">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;