import { advancedAskProps, formType } from "@/lib/zod-props";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Input from "./ui/Input";
import Dropdown from "./ui/Dropdown";
import TextArea from "./ui/TextArea";
import { useRef, useState } from "react";
import { advancedAnalysisResult } from "@/lib/types";
import UploadDropzone from "./ui/UploadDropzone";

export const platformOptions = [
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "X", value: "X" },
  { label: "Facebook", value: "FACEBOOK" },
  { label: "Reddit", value: "REDDIT" },
  { label: "Threads", value: "THREADS" },
];

interface AdvancedFormProps {
  handleSetResult: (result: advancedAnalysisResult | undefined) => void;
  setIsLoading: (loading: boolean) => void;
  resultRef: React.RefObject<HTMLDivElement | null>;
}

const AdvancedForm = ({
  handleSetResult,
  setIsLoading,
  resultRef
}: AdvancedFormProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof advancedAskProps>>({
    resolver: zodResolver(advancedAskProps),
    mode: "all",
  });

  const { register, control, handleSubmit, formState, reset, setValue } = form;

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    if (file){
      setValue('image', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (values: z.infer<typeof advancedAskProps>) => {
    try {
      setIsLoading(true);
      if (resultRef.current) {
        window.scrollTo({ top: resultRef.current.offsetTop - 50, behavior: "smooth" });
      }

      const formData = new FormData();
      formData.append("text", values.text);
      formData.append("followers", values.followers.toString());
      formData.append("platform", values.platform);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await axios.post("/api/ask", formData, {
        params: {
          formType: formType.Values.ADVANCED
        },
        headers: {
          'Content-Type': 'multipart/form-data',
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

      <div className="flex gap-x-4">
        <Input
          register={register}
          errors={formState.errors}
          label="Followers"
          name="followers"
          type="number"
        />

        <Dropdown
          control={control}
          errors={formState.errors}
          label="Platform"
          name="platform"
          options={platformOptions}
        />
      </div>

      <UploadDropzone
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
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
          disabled={!formState.isValid || formState.isSubmitting}
        >
          Go
        </button>
      </div>
    </form>
  );
};

export default AdvancedForm;
