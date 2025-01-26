import React, { useRef } from 'react';
import { UseFormRegister, FieldErrors, Path, FieldName } from 'react-hook-form';
import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { z, ZodTypeAny } from 'zod';

interface TextAreaProps<T extends ZodTypeAny> {
  register: UseFormRegister<z.infer<T>>;
  errors: FieldErrors<z.infer<T>>;
  refCallback: (ref: HTMLTextAreaElement | null) => void;
  name: Path<z.infer<T>> & FieldName<FieldValuesFromFieldErrors<FieldErrors<z.infer<T>>>>;
}

const TextArea = <T extends ZodTypeAny>({
  register,
  errors,
  refCallback,
  name
}: TextAreaProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-y-2">
      <label 
      htmlFor={name}
        className="text-sm pr-4 uppercase font-semibold text-slate-300/60"
      >
        Post/Text
      </label>

      <textarea
        id={name}
        {...register(name)}
        ref={(e) => {
          register(name).ref(e);
          textareaRef.current = e;
          if (refCallback) refCallback(e);
        }}
        className="w-full rounded-lg p-4 bg-slate-600 focus:bg-slate-700 resize-none focus:outline-none focus:ring-4 focus:ring-slate-300/70 transition"
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
          name={name}
        />
      </div>
    </div>
  );
}

export default TextArea;