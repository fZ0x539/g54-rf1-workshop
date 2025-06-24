import clsx from "clsx";
import { FaUserSecret } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SiGotomeeting } from "react-icons/si";
import { NavLink, useLocation } from "react-router";

const ListGroup = () => {
  const listItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <MdDashboard size={17} />,
      href: "/calendar",
    },
    {
      id: 2,
      name: "Meetings",
      icon: <SiGotomeeting size={17} />,
      href: "/calendar/meetings",
    },
    {
      id: 3,
      name: "Add Meeting",
      icon: <IoCalendarOutline size={17} />,
      href: "/calendar/meetings/add",
    },
    {
      id: 4,
      name: "Users",
      icon: <FaUserSecret size={17} />,
      href: "/calendar/users",
    },
  ];
  const location = useLocation();

  return (
    <div className={clsx("md:col-span-1", "col-span-4 w ")}>
      <div className=" flex md:flex-col flex-row border border-gray-200  shadow-md rounded-lg ">
        {listItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.id}
            type="button"
            className={clsx(
              "flex flex-1 items-center gap-x-2 py-3 px-4 ",
              "group md:border text-sm text-start font-semibold cursor-pointer border-gray-200  -mt-px",
              "md:first:rounded-t-lg md:first:rounded-bl-none md:first:mt-0 md:last:rounded-b-lg md:last:rounded-tr-none",
              "first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg",
              "hover:bg-zinc-800 hover:text-white duration-75",
              {
                " text-zinc-900": location.pathname === item.href,
                "text-gray-600": location.pathname !== item.href,
              }
            )}
          >
            <span className="inline">{item.icon}</span>
            <p className="inline-block transition-transform duration-75 active:scale-95 group-active:scale-95">
              {item.name}
            </p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ListGroup;
