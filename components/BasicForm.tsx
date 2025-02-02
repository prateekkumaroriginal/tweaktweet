import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { askProps, formType, } from "@/lib/zod-props";
import { z } from "zod";
import axios from "axios";
import TextArea from "@/components/TextArea";
import { basicAnalysisResult } from "@/lib/types";

interface BasicFormProps {
  handleSetResult: (result: basicAnalysisResult | undefined) => void;
  setIsLoading: (loading: boolean) => void;
}

const BasicForm = ({
  handleSetResult,
  setIsLoading
}: BasicFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof askProps>>({
    resolver: zodResolver(askProps),
    mode: "all"
  });

  const { register, handleSubmit, formState, reset } = form;

  const onSubmit = async (values: z.infer<typeof askProps>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/ask", values, {
        params: {
          formType: formType.Values.BASIC
        }
      });
      handleSetResult(response.data);
    } catch (error) {
      console.error(error);
      handleSetResult(undefined);
    }
  };

  const onClear = () => {
    reset();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    handleSetResult(undefined);
    setIsLoading(false);
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
