import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiSolidCat } from "react-icons/bi";
import useAddMeeting from "../hooks/useAddMeeting";
import { useMeeting } from "../hooks/useMeeting";
import useUpdateMeeting from "../hooks/useUpdateMeeting";
import { meetingSchema, type Meeting } from "../zod/schema";
import { EmailTagInputRHF } from "./MeetingForm/EmailTagInput";
import SelectMeetingLevel from "./MeetingForm/SelectMeetingLevel";
import { DatePicker, TimePicker } from "./MeetingForm/TimeDatePicker";
import { TextArea, TextInput } from "./MeetingForm/TextInputArea";
import { useNavigate, useParams } from "react-router";

const MeetingsFormAddEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const meetingId = params.meetingId;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Meeting>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      date: "",
      time: "",
      meetingLevel: "Client",
      participants: [],
      description: "",
    },
  });

  const [rqError, setRqError] = useState("");
  const addMeeting = useAddMeeting();
  const updateMeeting = useUpdateMeeting();


  const { data: existingMeeting } = meetingId 
    ? useMeeting(parseInt(meetingId))
    : { data: undefined };

  useEffect(() => {
    if (existingMeeting) {
      reset({
        title: existingMeeting.title,
        date: existingMeeting.date,
        time: existingMeeting.time,
        meetingLevel: existingMeeting.meetingLevel,
        participants: [...existingMeeting.participants],
        description: existingMeeting.description,
      });
    }
  }, [existingMeeting, reset]);

  const onSubmit = (data: Meeting) => {
    if (meetingId) {
      updateMeeting.mutate(
        { id: parseInt(meetingId), ...data },
        {
          onSuccess: () => {
            setRqError("");
            navigate('/calendar/meetings')
          },
          onError: (error: Error) => {
            setRqError(error.message)
          },
        }
      );
    } else {
      addMeeting.mutate(
        {
          title: data.title,
          date: data.date,
          time: data.time,
          meetingLevel: data.meetingLevel,
          participants: [...data.participants],
          description: data.description,
        },
        {
          onSuccess: () => {
            reset();
            setRqError("");
            navigate('/calendar/meetings')
          },
          onError: (error) => setRqError(error.message),
        }
      );
    }
  };

  const onError = (errors: any) => {
    console.error("Form errors:", errors);
  };

  return (
    <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">
        {meetingId ? "Edit Meeting" : "Schedule Meeting"}
      </h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TextInput
          {...register("title")}
          error={errors.title}
          label="Meeting Title"
          placeholder="Enter meeting title"
        />
        <div className="flex space-between gap-4 w-full">
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                error={error}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TimePicker
                error={error}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <SelectMeetingLevel control={control} name="meetingLevel" />
        <EmailTagInputRHF name="participants" control={control} />
        <TextArea error={errors.description} {...register("description")} />

        <button
          className="mt-4 flex items-center gap-3 cursor-pointer bg-zinc-500 text-white px-4 py-2 rounded-md duration-75 hover:bg-zinc-600"
          type="submit"
        >
          <BiSolidCat />
          {meetingId ? "Update Meeting" : "Create Meeting"}
        </button>
      </form>
      {rqError && (
        <p className="p-1 select-none font-xs text-red-600">{rqError}</p>
      )}
    </div>
  );
};


export default MeetingsFormAddEdit;
