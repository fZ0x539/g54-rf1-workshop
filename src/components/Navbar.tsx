import { FcCalendar } from "react-icons/fc";
import { FaUserTie } from "react-icons/fa";


const Navbar = () => {
  const pages = [
    { id: 1, title: "Home", href: "#" },
    { id: 2, title: "About", href: "#" },
    { id: 3, title: "Users", href: "#" },
    { id: 4, title: "Calendar", href: "#" },
  ];

  return (
    <nav className="bg-zinc-800 text-white">
      <div className="max-w-7xl mx-auto p-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
          <FcCalendar size={40}  className="ml-2 mr-4"/>
          <ul>
            {pages.map((page) => (
              <li className="inline mx-2 hover:text-zinc-200 duration-12" key={page.id}>
                <a className="" href={page.href}>
                  {page.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2">
            <FaUserTie className="inline" />
            Demo
        </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
