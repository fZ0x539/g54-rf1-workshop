import { Outlet } from "react-router";
import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div className="container mx-auto p-8 grid grid-cols-4 gap-6">
        <Outlet />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Footer />
    </div>
  );
};

export default Layout;
