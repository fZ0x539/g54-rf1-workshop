import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { SiGotomeeting } from "react-icons/si";
import { FaUserSecret } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import clsx from "clsx";

const ListGroup = () => {
  const listItems = [
    { id: 1, name: "Dashboard", icon: <MdDashboard size={17} /> },
    { id: 2, name: "Meetings", icon: <SiGotomeeting size={17} /> },
    { id: 3, name: "Users", icon: <FaUserSecret size={17} /> },
    { id: 4, name: "Calendar", icon: <IoCalendarOutline size={17} /> },
  ];

  const [isActive, setIsActive] = useState(1);

  return (
    <div className={clsx("md:col-span-1", "col-span-4 w ")}>
      <div className=" flex md:flex-col flex-row border border-gray-200  shadow-md rounded-lg ">
        {listItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={clsx(
              'flex flex-1 items-center gap-x-2 py-3 px-4 ',
              'group md:border text-sm text-start font-semibold cursor-pointer border-gray-200  -mt-px',
              'md:first:rounded-t-lg md:first:rounded-bl-none md:first:mt-0 md:last:rounded-b-lg md:last:rounded-tr-none',
              'first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg',
              '',
              '',
              'hover:bg-zinc-800 hover:text-white duration-75',
              {' text-zinc-900': isActive===item.id,
               'text-gray-600': isActive !== item.id},
            )}
            onClick={() => setIsActive(item.id)}
          >
            <span className="inline group-hover:animate-spin">{item.icon}</span>
            <p className="inline-block transition-transform duration-75 active:scale-95 group-active:scale-95">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListGroup;
