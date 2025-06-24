import { Outlet } from "react-router";
import ListGroup from "../components/ListGroup";


export default function CalendarPage() {
  return (
    <>
      <ListGroup />
        <div className={"md:col-span-3 col-span-4"}>
          <Outlet />
        </div>
    </>
  );
}
