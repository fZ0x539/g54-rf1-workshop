import clsx from "clsx";
import type { FieldError } from "react-hook-form";

export function TextInput({
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

export function TextArea({ error, ...props }: { error?: FieldError }) {
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