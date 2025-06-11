import { useRef, useState } from "react";

function DatePicker() {
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const dateInputRef = useRef<HTMLInputElement>(null);
  

  return (
    <div className="w-full">
      <label className="block font-medium text-zinc-700 mb-2 m-1">
        Meeting Date
      </label>
      <input
        onClick={() => dateInputRef.current?.showPicker()}
        ref={dateInputRef}
        type="date"
        min={today}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="w-full px-3 py-1 border border-gray-300 cursor-pointer focus:outline-none focus:border-gray-500 duration-75 invalid:text-gray-500  valid:text-gray-900 rounded-md "
      />
    </div>
  );
}

function TimePicker() {
  const [text, setText] = useState("");

  return (
    <>
      <div className="relative w-full cursor-pointer">
        <label className="block font-medium text-zinc-700 mb-2 m-1">
          Meeting Time
        </label>
        <input
          value={text}
          type="time"
          min="06:00"
          max="21:00"
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full px-3 py-1 border border-gray-300 invalid:text-gray-500 focus:outline-none focus:border-gray-500 duration-75  valid:text-gray-900 rounded-md  "
        />
      </div>
    </>
  );
}

export {DatePicker, TimePicker};