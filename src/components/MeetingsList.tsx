import { MdEditNote } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import type { MeetingFormValues } from "../zod/schema";

interface MeetingsListProps {
  meetings: MeetingFormValues[];
}

export default function Example({meetings}: MeetingsListProps) {
  // const meetings = [
  //   {
  //     id: 1,
  //     title: "Project Kickoff",
  //     date: "2024-05-15",
  //     time: "10:00 AM",
  //     level: "Team",
  //   },
  //   {
  //     id: 2,
  //     title: "Quarterly Review",
  //     date: "2024-06-01",
  //     time: "02:00 PM",
  //     level: "Department",
  //   },
  // ];

  return (
    <div className="my-5 bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold text-gray-900">Users</h2>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
              <table className=" min-w-full divide-y  divide-gray-300">
                <thead className="bg-gray-100  ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Meeting Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Level
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pr-4 pl-3 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {meetings.map((meeting, index) => (
                    <tr key={index}>
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                        {meeting.title}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                        {meeting.date}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                        {meeting.time}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                        {meeting.meetingLevel}
                      </td>
                      <td className="flex justify-center gap-1 py-5 sm:pr-6">
                        <a href="#edit" className="hover:opacity-80 duration-125 hover:text-orange-400 text-orange-600"><MdEditNote size={24} /></a>

                        <a href="#delete" className="hover:opacity-80 hover:text-red-400 duration-125 text-red-600"><TiDeleteOutline size={24} /></a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
