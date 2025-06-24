import clsx from "clsx";
import { NavLink, useLocation } from "react-router";
import { HiOutlineCalendarDays } from "react-icons/hi2";


export default function Navbar() {
  const pages = [
    { id: 1, title: "Home", href: "" },
    { id: 2, title: "About", href: "about" },
    { id: 3, title: "Calendar", href: "calendar" },
  ];

  const location = useLocation();
  const firstPathSegment = location.pathname.split('/')[1];

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex shrink-0 items-center">
              {/* <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=zinc&shade=600"
                className="h-8 w-auto"
              /> */}
              <NavLink to="">
                <HiOutlineCalendarDays className="h-8 w-auto text-zinc-700" />
              </NavLink>
            </div>
            <div className=" ml-6 flex space-x-8">         
              {pages.map((page, index) => (
                <NavLink
                  key={index}
                  className={clsx(
                    "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500",
                    { "border-zinc-500": page.href === firstPathSegment },
                    { "hover:border-gray-300 hover:text-gray-700": page.href !== firstPathSegment }
                  )}
                  to={page.href}
                >
                  {page.title}
                </NavLink>
              ))}
            </div>
          </div>
          </div>
       </div>
    </nav>
  );
}
