import { BiSolidCat } from "react-icons/bi";
import SelectMeetingLevel from "./MeetingForm/SelectMeetingLevel";
import { DatePicker, TimePicker } from "./MeetingForm/TimeDatePicker";
import { Description, Field, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";

const ScheduleMeetingForm = () => {
  return (
    <div className="bg-gray-50 p-6 border border-gray-200  rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">Schedule Meeting</h2>
      <form className="flex flex-col gap-3">
        <TextInput label="Meeting Time" placeholder="Enter meeting title" />
        <div className="flex  items-center space-between gap-4 w-full">
          <DatePicker />
          <TimePicker />
        </div>
        <SelectMeetingLevel />
        <TextInput
          label="Participants"
          placeholder="Enter participants email"
        />
        <TextArea />

        <button className="mt-4 flex items-center gap-3 cursor-pointer bg-zinc-500 text-white px-4 py-2 rounded-md duration-75 hover:bg-zinc-600">
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
}: {
  label: string;
  placeholder: string;
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
        />
      </div>
    </>
  );
}

function TextArea() {
  return (
    <>
      <div className="w-full ">
        <Field>
          <Label className="block font-medium text-zinc-700 mb-1 mx-1">
            Description
          </Label>
          <Description className="font-light text-sm text-zinc-700 mx-1">
            This will be shown under the product title.
          </Description>
          <Textarea
            className={clsx(
              "mt-3 block w-full resize-none rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none bg-grey-500 px-3 py-1.5  text-black"
            )}
            rows={3}
          />
        </Field>
      </div>
    </>
  );
}

export default ScheduleMeetingForm;
