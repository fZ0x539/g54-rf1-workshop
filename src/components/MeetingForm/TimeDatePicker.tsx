import { useRef } from "react";
import type { FieldError } from "react-hook-form";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: FieldError
}

function DatePicker({ value, onChange, error }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full">
      <label className="block font-medium text-zinc-700 mb-2 m-1">
        Meeting Date
      </label>
      <input
        ref={ref}
        onClick={() => ref.current?.showPicker()}
        type="date"
        min={today}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1 border border-gray-300 cursor-pointer focus:outline-none focus:border-gray-500 duration-75 invalid:text-gray-500  valid:text-gray-900 rounded-md "
      />
      {error && <p className="p-1 select-none font-xs text-red-600 ">{error.message}</p>}
    </div>
  );
}

function TimePicker({value, onChange, error}: Props) {

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="relative w-full cursor-pointer">
        <label className="block font-medium text-zinc-700 mb-2 m-1">
          Meeting Time
        </label>
        <input
          ref={ref}
          onClick={() => ref.current?.showPicker()}
          value={value}
          type="time"
          min="06:00"
          max="21:00"
          onChange={(e) => onChange(e.target.value)}
          className="w-full select-none cursor-pointer  px-3 py-1 border border-gray-300 invalid:text-gray-500 focus:outline-none focus:border-gray-500 duration-75  valid:text-gray-900 rounded-md  "
        />
        {error && <p className="p-1 select-none font-xs text-red-600 ">{error.message}</p>}
      </div>
    </>
  );
}

export { DatePicker, TimePicker };
