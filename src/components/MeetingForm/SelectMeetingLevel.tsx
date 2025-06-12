import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

const levels = [
  { id: 1, name: "Team" },
  { id: 2, name: "Department" },
  { id: 3, name: "Division" },
  { id: 4, name: "Client" },
];

export default function SelectMeetingLevel() {
  const [selected, setSelected] = useState(levels[3]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div>
        <Label className="block font-medium text-zinc-700 mb-2 m-1">
          Meeting Level
        </Label>
        <div className="relative mt-2">
          <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-md px-3 py-1 text-left border data-open:border-gray-500 border-gray-300 text-gray-900  sm:text-sm/6">
            <span className="col-start-1 row-start-1 truncate pr-6">
              {selected.name}
            </span>
            <FaChevronDown
              aria-hidden="true"
              className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
          >
            {levels.map((level) => (
              <ListboxOption
                key={level.id}
                value={level}
                className="group relative cursor-pointer py-2 pr-4 pl-8 text-gray-900 select-none data-focus:bg-zinc-800 data-focus:text-white data-focus:outline-hidden"
              >
                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {level.name}
                </span>

                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-zinc-600 group-not-data-selected:hidden group-data-focus:text-white">
                  <FaCheck aria-hidden="true" className="size-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </div>
    </Listbox>
  );
}
