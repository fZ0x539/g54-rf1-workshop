import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Controller, useForm, type FieldError } from "react-hook-form";
import { BiSolidCat } from "react-icons/bi";
import useAddMeeting from "../hooks/useAddMeeting";
import { meetingSchema, type Meeting } from "../zod/schema";
import { EmailTagInputRHF } from "./MeetingForm/EmailTagInput";
import SelectMeetingLevel from "./MeetingForm/SelectMeetingLevel";
import { DatePicker, TimePicker } from "./MeetingForm/TimeDatePicker";

const ScheduleMeetingForm = () => {
  const addMeeting = useAddMeeting();

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
  const onSubmit = (data: Meeting) => {
    console.log("Form data:", data);
    addMeeting.mutate({
      title: data.title,
      date: data.date,
      time: data.time,
      meetingLevel: data.meetingLevel,
      participants: [...data.participants],
      description: data.description,
    });
    reset();
  };

  const onError = (errors: any) => {
    console.error("Form errors:", errors);
  };

  return (
    <div className="bg-gray-50 p-6 border border-gray-200  rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">Schedule Meeting</h2>
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TextInput
          {...register("title")}
          error={errors.title}
          label="Meeting Time"
          placeholder="Enter meeting title"
        />
        <div className="flex  space-between gap-4 w-full">
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
          Create Meeting
        </button>
      </form>
    </div>
  );
};

function TextInput({
  label,
  placeholder,
  error,
  ...props
}: {
  label: string;
  placeholder: string;
  error?: FieldError;
}) {
  return (
    <>
      <div className="">
        <label className="block font-medium text-zinc-700 mb-2 m-1">
          {label}
        </label>
        <input
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 duration-75"
          type="text"
          autoComplete="on"
          placeholder={placeholder}
          {...props}
        />
        {error && (
          <p className="p-1 select-none font-xs text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
}

function TextArea({ error, ...props }: { error?: FieldError }) {
  return (
    <>
      <div className="w-full ">
        <label className="block font-medium text-zinc-700 mb-1 mx-1">
          Description
        </label>
        <p className="font-light text-sm text-zinc-700 mx-1">
          This will be shown under the product title.
        </p>
        <textarea
          {...props}
          className={clsx(
            "mt-3 block w-full resize-none rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none bg-grey-500 px-3 py-1.5  text-black"
          )}
          rows={3}
        />
        {error && (
          <p className="p-1 select-none font-xs text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
}

export default ScheduleMeetingForm;
