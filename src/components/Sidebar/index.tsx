import React, { ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
interface Props {
  children?: ReactNode;
}

const GatekeeperOne = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/helloEthernaut",
      name: "Lvl0",
      icon: <img src="/svgexport-3.svg" alt="image" className="icon" />,
    },
    {
      path: "/fallback",
      name: "Lvl1",
      icon: <img src="/svgexport-4.svg" alt="image" className="icon" />,
    },
    {
      path: "/fallout",
      name: "Lvl2",
      icon: <img src="/svgexport-5.svg" alt="image" className="icon" />,
    },
    {
      path: "/coinflip",
      name: "Lvl3",
      icon: <img src="/svgexport-6.svg" alt="image" className="icon" />,
    },
    {
      path: "/telephone",
      name: "Lvl4",
      icon: <img src="/svgexport-7.svg" alt="image" className="icon" />,
    },
    {
      path: "/token",
      name: "Lvl5",
      icon: <img src="/svgexport-8.svg" alt="image" className="icon" />,
    },
    {
      path: "/delegation",
      name: "Lvl6",
      icon: <img src="/svgexport-9.svg" alt="image" className="icon" />,
    },
    {
      path: "/force",
      name: "Lvl7",
      icon: <img src="/svgexport-10.svg" alt="image" className="icon" />,
    },
    {
      path: "/vault",
      name: "Lvl8",
      icon: <img src="/svgexport-11.svg" alt="image" className="icon" />,
    },
    {
      path: "/king",
      name: "Lvl9",
      icon: <img src="/svgexport-12.svg" alt="image" className="icon" />,
    },
    {
      path: "/reEntrancy",
      name: "Lvl10",
      icon: <img src="/svgexport-13.svg" alt="image" className="icon" />,
    },
    {
      path: "/elevator",
      name: "Lvl11",
      icon: <img src="/svgexport-14.svg" alt="image" className="icon" />,
    },
    {
      path: "/privacy",
      name: "Lvl12",
      icon: <img src="/svgexport-15.svg" alt="image" className="icon" />,
    },
    {
      path: "/gatekeeperOne",
      name: "Lvl13",
      icon: <img src="/svgexport-16.svg" alt="image" className="icon" />,
    },
    {
      path: "/gatekeeperTwo",
      name: "Lvl14",
      icon: <img src="/svgexport-17.svg" alt="image" className="icon" />,
    },
    {
      path: "/naughtCoin",
      name: "Lvl15",
      icon: <img src="/svgexport-18.svg" alt="image" className="icon" />,
    },
    {
      path: "/preservation",
      name: "Lvl16",
      icon: <img src="/svgexport-19.svg" alt="image" className="icon" />,
    },
    {
      path: "/recovery",
      name: "Lvl17",
      icon: <img src="/svgexport-20.svg" alt="image" className="icon" />,
    },
    {
      path: "/magicNumber",
      name: "Lvl18",
      icon: <img src="/svgexport-21.svg" alt="image" className="icon" />,
    },
    {
      path: "/alienCodex",
      name: "Lvl19",
      icon: <img src="/svgexport-22.svg" alt="image" className="icon" />,
    },
    {
      path: "/denial",
      name: "Lvl20",
      icon: <img src="/svgexport-23.svg" alt="image" className="icon" />,
    },
    {
      path: "/shop",
      name: "Lvl21",
      icon: <img src="/svgexport-24.svg" alt="image" className="icon" />,
    },
    {
      path: "/dex",
      name: "Lvl22",
      icon: <img src="/svgexport-25.svg" alt="image" className="icon" />,
    },
    {
      path: "/dex2",
      name: "Lvl23",
      icon: <img src="/svgexport-26.svg" alt="image" className="icon" />,
    },
    {
      path: "/puzzleWallet",
      name: "Lvl24",
      icon: <img src="/svgexport-27.svg" alt="image" className="icon" />,
    },
    {
      path: "/motorbike",
      name: "Lvl25",
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

export default GatekeeperOne;
