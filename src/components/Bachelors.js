import React, { useState, useEffect, useContext } from "react";
import {MdFamilyRestroom} from  "react-icons/md"
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";

import { HouseContext } from "./HouseContext";
const Bachelors = () => {
  const { residence, setResidence, residencies } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn  w-full text-left"
      >
        <MdFamilyRestroom className="dropdown-icon-primary" />
        <div>
          <div
            className="text-[15px] font-medium
        leading-tight "
          >
            {residence}
          </div>

          <div className="text-[13px]">Select your type</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>

      <Menu.Items className="dropdown-menu ">
        {residencies.map((residence, index) => {
          return (
            <Menu.Item
              onClick={() => setResidence(residence)}
              className="cursor-pointer hover:text-violet-700 transition"
              as="li"
              key={index}
            >
              {" "}
              {residence}{" "}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default Bachelors;
