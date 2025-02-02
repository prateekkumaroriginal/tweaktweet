import { advancedAskProps } from '@/lib/zod-props';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

interface InputProps {
  register: UseFormRegister<z.infer<typeof advancedAskProps>>;
  errors: FieldErrors;
  label: string;
  name: keyof z.infer<typeof advancedAskProps>;
  type: "number" | "text";
}

const Input = ({
  register,
  errors,
  label,
  name,
  type
}: InputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label
        htmlFor={name}
        className="text-sm pr-4 uppercase font-semibold text-slate-300/60"
      >
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        className="p-2 bg-slate-600 text-white outline-none focus:bg-slate-700 focus:ring-4 focus:ring-slate-300/70 focus:ring-slate-300 rounded-lg transition"
      />

      <div className="flex text-rose-500">
        <ErrorMessage
          errors={errors}
          name={name}
        />
      </div>
    </div>
  )
}

export default Input