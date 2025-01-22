import { ErrorMessage } from '@hookform/error-message';
import React, { useRef } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface TextAreaProps {
  register: UseFormRegister<{
    text: string
  }>;
  errors: FieldErrors;
  refCallback: (ref: HTMLTextAreaElement | null) => void;
}

const TextArea = ({
  register,
  errors,
  refCallback
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="postText"
        className="text-sm pr-4 uppercase font-semibold text-slate-300/60"
      >
        Post/Text
      </label>

      <textarea
        id="postText"
        {...register("text")}
        ref={(e) => {
          register("text").ref(e);
          textareaRef.current = e;
          if (refCallback) refCallback(e);
        }}
        className="w-full rounded-lg p-4 bg-slate-600 resize-none focus:outline-none"
        rows={1}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
      ></textarea>

      <div className="flex text-rose-500">
        <ErrorMessage
          errors={errors}
          name="text"
        />
      </div>
    </div>
  )
}

export default TextArea