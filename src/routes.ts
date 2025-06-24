import { createBrowserRouter } from "react-router";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import MeetingsList from "./components/MeetingsList";
import MeetingsForm from "./components/MeetingsForm";
import UsersPage from "./pages/UsersPage";
import MeetingItem from "./components/MeetingItem";
import MeetingsLayout from "./pages/MeetingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "about", Component: AboutPage },
      {
        path: "calendar",
        Component: CalendarPage,
        children: [
          { index: true, Component: DashboardPage },
          {
            path: "meetings",
            Component: MeetingsLayout,  // This needs an Outlet
            children: [
              { index: true, Component: MeetingsList },
              { path: "add", Component: MeetingsForm },
              { path: ":id", Component: MeetingItem },
            ],
          },
          // { path: "meetings/add", Component: MeetingsForm },
          { path: "users", Component: UsersPage },
        ],
      },
    ],
  },
]);

export default router;
