import { MdEditNote } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import useMeeting from "../hooks/useMeeting";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MeetingsList() {
  const { data: meetings, isLoading, error } = useMeeting();

  return (
    <div className=" bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold text-gray-900">Meetings</h2>
          <p className="mt-2 text-sm text-gray-700">
            A brief overview of all meetings.
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
                  {isLoading
                    ? // Show skeleton rows while loading
                      Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <tr key={`skeleton-${index}`}>
                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap sm:pl-6">
                              <Skeleton width={150} />
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap">
                              <Skeleton width={100} />
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap">
                              <Skeleton width={80} />
                            </td>
                            <td className="px-3 py-4 text-sm whitespace-nowrap">
                              <Skeleton width={120} />
                            </td>
                            <td className="flex justify-center gap-1 py-5 sm:pr-6">
                              <Skeleton width={24} height={24} circle />
                              <Skeleton width={24} height={24} circle />
                            </td>
                          </tr>
                        ))
                    : meetings?.map((meeting, index) => (
                        <tr key={index}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                            {meeting.title}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                            {meeting.date}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                            {meeting.time.substring(0,5)}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-600">
                            {meeting.meetingLevel}
                          </td>
                          <td className="flex justify-center gap-1 py-5 sm:pr-6">
                            <a
                              href="#edit"
                              className="hover:opacity-80 duration-125 hover:text-orange-400 "
                            >
                              <MdEditNote size={24} />
                            </a>

                            <a
                              href="#delete"
                              className="hover:opacity-80 hover:text-red-400 duration-125"
                            >
                              <TiDeleteOutline size={24} />
                            </a>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="p-1 mt-2 select-none font-xs text-red-600">{error.message}</p>}
    </div>
  );
}
