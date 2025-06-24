import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router";
import { useMeeting } from "../hooks/useMeeting";
import clsx from "clsx";
import { LuCalendarDays } from "react-icons/lu";
import { LuClock5 } from "react-icons/lu";
import { ConfirmationModal } from "./Modal/Modal";
import { useState } from "react";
import useDeleteMeeting from "../hooks/useDeleteMeeting";

export default function MeetingItem() {
  const { id } = useParams();
  const numericId = parseInt(id ?? "0"); // fallback to 0 if undef
  const { data: meeting } = useMeeting(numericId);
  const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);
  const deleteMeeting = useDeleteMeeting();
  const navigate = useNavigate();

  function handleDelete(meetingToDelete: string): void {
    deleteMeeting.mutate(meetingToDelete);
    setMeetingToDelete(null);
    navigate('/calendar/meetings')
  }

  if (!meeting) return <MeetingItemSkeleton />;
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {meeting.title}
          </h3>
          <div className="flex items-center mt-1 space-x-4">
            <span className="text-gray-600 flex items-center gap-1">
              <LuCalendarDays className="" />
              <p>{meeting.date}</p>
            </span>
            <span className="text-gray-600 flex items-center gap-1">
              <LuClock5 size={18} />
              <p>{meeting.time.substring(0, 5)}</p>
            </span>
          </div>
        </div>
        <span
          className={clsx(
            `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`,
            {
              "bg-amber-100 text-amber-800": meeting.meetingLevel === "Client",
              "bg-green-100 text-green-800 ":
                meeting.meetingLevel === "Division",
              "bg-purple-100 text-purple-800":
                meeting.meetingLevel === "Department",
              "bg-blue-100 text-blue-800": meeting.meetingLevel === "Team",
            }
          )}
        >
          {meeting.meetingLevel}
        </span>
      </div>

      <p className="text-gray-700  mb-4">{meeting.description}</p>

      {meeting.participants.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Participants
          </h4>
          <div className="flex flex-wrap gap-2">
            {meeting.participants.map((participant, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {participant}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 text-right">
        <button
          type="button"
          onClick={() => setMeetingToDelete(`${meeting.id}`)}
          className="cursor-pointer text-red-700 group hover:text-white border border-red-700 hover:bg-red-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
        >
          <span className="transition-transform duration-75 active:scale-75">
            Delete
          </span>
        </button>
      </div>

      {meetingToDelete &&
        <ConfirmationModal
          isOpen={!!meetingToDelete}
          onClose={() => setMeetingToDelete(null)}
          onConfirm={() => meetingToDelete && handleDelete(meetingToDelete)}
          title="Delete meeting?"
          description={`Are you sure you want to delete this meeting?`}
        />
      }
    </div>
  );
}

function MeetingItemSkeleton() {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="w-full">
          {/* Title Skeleton */}
          <Skeleton width="70%" height={24} className="mb-2" />

          {/* Date/Time Row Skeleton */}
          <div className="flex space-x-4">
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={20} />
          </div>
        </div>

        {/* Meeting Level Badge Skeleton */}
        <Skeleton width={80} height={24} />
      </div>

      {/* Description Skeleton */}
      <div className="mb-4">
        <Skeleton count={3} />
      </div>

      {/* Participants Section Skeleton */}
      <div className="mt-4">
        <Skeleton width={100} height={20} className="mb-2" />
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              width={Math.random() * 30 + 50}
              height={24}
              className="rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
