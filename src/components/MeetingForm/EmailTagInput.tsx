import { useRef, useState } from "react";
import { Controller } from "react-hook-form";

interface EmailTagInputProps {
  participants: string[];
  setParticipants: (participants: string[]) => void;
}

const EmailTagInput = ({
  participants,
  setParticipants,
}: EmailTagInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const inputRef = useRef(null);

  const isValidEmail = (email: string) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleKeyDown = (e: any) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      addEmail();
    }

    // Backspace removes last tag when input is empty
    if (e.key === "Backspace" && !inputValue && participants.length > 0) {
      e.preventDefault();
      setParticipants(participants.slice(0, -1));
    }
  };

  const addEmail = () => {
    const email = inputValue.trim();

    if (!email) {
      setError("");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (participants.includes(email)) {
      setError("This email is already added");
      return;
    }

    setParticipants([...participants, email]);
    setInputValue("");
    setError("");
  };

  const removeEmail = (emailToRemove: string) => {
    setParticipants(participants.filter((email) => email !== emailToRemove));
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addEmail();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 items-center py-1  rounded-lg  min-h-12">
        {participants.map((email) => (
          <div
            key={email}
            className="flex items-center gap-1 bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm"
          >
            <p>{email}</p>
            <button
              type="button"
              onClick={() => removeEmail(email)}
              className="text-blue-600 hover:text-red-700  group-hover:scale-150 duration-125  focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}

        <input
          ref={inputRef}
          type="email"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          // onPaste={handlePaste}
          onBlur={handleBlur}
          placeholder={
            participants.length === 0 ? "Add participants by email" : ""
          }
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 duration-75"
        />
      </div>

      <div className="px-1">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-gray-500 text-sm">
          Press Enter, Tab or comma to add emails
        </p>
      </div>
    </div>
  );
};

interface EmailTagInputRHFProps {
  name: string;
  control: any; // or use proper type from RHF
}

export const EmailTagInputRHF = ({ name, control }: EmailTagInputRHFProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <EmailTagInput
            participants={value || []}
            setParticipants={onChange}
          />
          {error?.message && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default EmailTagInputRHF;

// const handlePaste = (e: any) => {
//   e.preventDefault();
//   const pasteData = e.clipboardData.getData('text');
//   const emails = pasteData.split(/[\s,;]+/).filter((email: string) => email.trim() !== '');

//   const validEmails = emails.filter((email: string) => isValidEmail(email));
//   const newEmails = validEmails.filter((email: string) => !participants.includes(email));

//   if (newEmails.length > 0) {
//     setParticipants([...participants, ...newEmails]);
//   }

//   if (emails.length !== validEmails.length) {
//     setError('Some pasted emails were invalid');
//     setTimeout(() => setError(''), 2000);
//   }
// };
