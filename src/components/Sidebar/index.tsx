import React, { ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
interface Props {
  children?: ReactNode;
}

const Sidebar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/helloEthernaut",
      name: "Lvl1",
      icon: <img src="/svgexport-3.svg" alt="image" className="icon" />,
    },
    {
      path: "/fallback",
      name: "Lvl2",
      icon: <img src="/svgexport-4.svg" alt="image" className="icon" />,
    },
    {
      path: "/fallout",
      name: "Lvl3",
      icon: <img src="/svgexport-5.svg" alt="image" className="icon" />,
    },
    {
      path: "/coinflip",
      name: "Lvl4",
      icon: <img src="/svgexport-6.svg" alt="image" className="icon" />,
    },
    {
      path: "/telephone",
      name: "Lvl5",
      icon: <img src="/svgexport-7.svg" alt="image" className="icon" />,
    },
    {
      path: "/token",
      name: "Lvl6",
      icon: <img src="/svgexport-8.svg" alt="image" className="icon" />,
    },
    {
      path: "/delegation",
      name: "Lvl7",
      icon: <img src="/svgexport-9.svg" alt="image" className="icon" />,
    },
    {
      path: "/force",
      name: "Lvl8",
      icon: <img src="/svgexport-10.svg" alt="image" className="icon" />,
    },
    {
      path: "/vault",
      name: "Lvl9",
      icon: <img src="/svgexport-11.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-12.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-13.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-14.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-15.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-16.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-17.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-18.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-19.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-20.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-21.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-22.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-23.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-24.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-25.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-26.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-27.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-28.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-29.svg" alt="image" className="icon" />,
    },
    {
      path: "/",
      name: "dashbaord",
      icon: <img src="/svgexport-30.svg" alt="image" className="icon" />,
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Ethernaut
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
