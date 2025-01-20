"use client";

import AnalysisResults from "@/components/AnalysisResults";
import { analyzeResult } from "@/lib/types";
import { askProps } from "@/lib/zod-props";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowLeftRight } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const [result, setResult] = useState<analyzeResult>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<z.infer<typeof askProps>>({
    resolver: zodResolver(askProps)
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = form;

  const onSubmit = async (values: z.infer<typeof askProps>) => {
    try {
      const response = await axios.get("/api/ask", {
        params: values
      });
      const data = response.data;
      console.log(data);

      setResult(data);

      const { bestTime,
        engagementPredicted,
        suggestedText,
        sentiment,
        suggestions } = data;

      console.log(bestTime,
        engagementPredicted,
        suggestedText,
        sentiment,
        suggestions,);

    } catch (error) {
      console.log(error);
    }
  }

  const onClear = () => {
    setResult(undefined);
    reset();
  }

  return (
    <div className="h-full flex flex-col items-center gap-y-8 pt-20 px-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-rose-500 text-7xl">TWEAKTWEET</h1>
        <p className="text-sky-300 text-lg">Tweak your post to maximize engagement! </p>
      </div>

      <div className="flex flex-col items-center w-[1000px] max-w-full gap-y-4 px-2 pb-20">
        <form
          id="main-form"
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-full bg-slate-600 rounded-lg p-4">
          <textarea
            {...register("text")}
            ref={(e) => {
              register("text").ref(e);
              textareaRef.current = e;
            }}
            className="w-full resize-none bg-transparent focus:outline-none"
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          ></textarea>
        </form>

        <div className="flex self-end gap-x-2 md:pr-1">
          <button
            className="py-2 px-6 rounded-3xl font-semibold text-xl bg-red-500 hover:bg-red-500/90 disabled:cursor-not-allowed disabled:bg-red-500/60 transition"
            onClick={onClear}
          >
            <span className="relative top-[1px] uppercase">
              Clear
            </span>
          </button>

          <button
            type="submit"
            form="main-form"
            className="py-2 px-6 rounded-3xl font-semibold text-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 disabled:cursor-not-allowed disabled:bg-[#4F46E5]/60 transition"
            disabled={!isValid || isSubmitting}
          >
            <span className="relative top-[1px] uppercase">
              Go
            </span>
          </button>
        </div>

        {result && (
          <AnalysisResults
            result={result}
          />
        )}
      </div>
    </div>
  );
}
