import { advancedAskProps } from '@/lib/zod-props';
import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect, useRef, useState } from 'react'
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { z } from 'zod';

interface OptionProps {
  value: string;
  label: string;
}

interface DropdownProps {
  control: Control<z.infer<typeof advancedAskProps>>;
  errors: FieldErrors<z.infer<typeof advancedAskProps>>;
  label: string;
  name: keyof z.infer<typeof advancedAskProps>;
  options: OptionProps[];
}

const Dropdown = ({
  control,
  errors,
  label,
  name,
  options
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current && !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col w-full gap-y-2">
          <label
            htmlFor={name}
            className="text-sm pr-4 uppercase font-semibold text-slate-300/60"
          >
            {label}
          </label>

          <div className='w-full'>
            <button
              ref={buttonRef}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className={`w-full bg-slate-${isOpen ? "700" : "600"} hover:bg-slate-700 outline-none font-medium ${isOpen ? "rounded-t-lg" : "rounded-lg"} text-sm px-5 py-2.5 text-center inline-flex items-center transition`}
              onClick={toggleDropdown}
            >
              {field.value ? options.find(o => o.value === field.value)?.label : "Select"}
              <svg className="w-2.5 h-2.5 ml-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {isOpen && (
              <div
                ref={dropdownRef}
                className="w-full border-t border-slate-100/20 rounded-b-lg shadow bg-slate-700"
              >
                <ul
                  className="text-sm"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {options.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        setIsOpen(false);
                      }}
                      className="block px-5 py-2 hover:bg-slate-600 cursor-pointer last-of-type:rounded-b-lg transition"
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex text-rose-500">
            <ErrorMessage
              errors={errors}
              name={name}
            />
          </div>
        </div>
      )}
    />
  )
}

export default Dropdown