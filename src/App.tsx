import clsx from "clsx";
import Footer from "./components/Footer";
import ListGroup from "./components/ListGroup";
import ScheduleMeetingForm from "./components/MeetingsForm";
import MeetingsList from "./components/MeetingsList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar />
        <div className="container mx-auto p-8 grid grid-cols-4 gap-8">
          <ListGroup />
          <div className={clsx("md:col-span-3", "col-span-4")}>
            <ScheduleMeetingForm />
            <MeetingsList />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
