import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { askProps, } from "@/lib/zod-props";
import { z } from "zod";
import axios from "axios";
import TextArea from "@/components/TextArea";
import { analyzeResult } from "@/lib/types";

interface BasicFormProps {
  onResult: (result: analyzeResult | undefined) => void;
}

const BasicForm: React.FC<BasicFormProps> = ({ onResult }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof askProps>>({
    resolver: zodResolver(askProps),
    mode: "all"
  });

  const { register, handleSubmit, formState, reset } = form;

  const onSubmit = async (values: z.infer<typeof askProps>) => {
    try {
      const response = await axios.get("/api/ask", { params: values });
      onResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClear = () => {
    reset();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    onResult(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-8 w-full"
    >
      <TextArea
        register={register}
        errors={formState.errors}
        refCallback={(ref) => {
          if (textareaRef) textareaRef.current = ref;
        }}
        name="text"
      />

      <div className="flex justify-end gap-x-2">
        <button
          type="button"
          className="py-2 px-6 rounded-3xl font-semibold text-xl bg-red-500 hover:bg-red-500/90 transition"
          onClick={onClear}
        >
          Clear
        </button>
        <button
          type="submit"
          className="py-2 px-6 rounded-3xl font-semibold text-xl bg-blue-600 hover:bg-blue-600/90 transition disabled:bg-blue-600/60 disabled:cursor-not-allowed"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
