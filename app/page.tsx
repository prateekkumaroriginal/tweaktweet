"use client"

import { useRef, useState } from "react";
import AdvancedForm from "@/components/AdvancedForm";
import BasicForm from "@/components/BasicForm";
import AnalysisResults from "@/components/AnalysisResults";
import { ArrowLeftRight } from "lucide-react";
import { advancedAnalysisResult, basicAnalysisResult } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<advancedAnalysisResult | basicAnalysisResult>();
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSetResult = (data: advancedAnalysisResult | basicAnalysisResult | undefined) => {
    setIsLoading(false);
    setResult(data);
  };

  const changeMode = () => {
    setResult(undefined);
    setIsAdvanced((prev) => !prev);
  }

  return (
    <div className="h-full flex flex-col items-center gap-y-8 pt-20 px-8">
      <div className="flex flex-col items-center mb-8">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-rose-500 text-2xl md:text-5xl lg:text-7xl">
          TWEAKTWEET
        </h1>
        <p className="text-sky-300 text-sm md:text-lg">Tweak your post to maximize engagement!</p>
      </div>

      <button
        onClick={changeMode}
        className={`flex justify-center items-center gap-x-2 py-2 px-4 rounded ${isAdvanced ? "bg-violet-600 hover:bg-violet-600/90" : "bg-blue-600 hover:bg-blue-600/90"} text-white font-mono font-semibold transition-all`}
      >
        <span>{isAdvanced ? "Advanced" : "Basic"}</span>
        <ArrowLeftRight className="size-4" />
      </button>

      <div className="flex flex-col items-center w-[1000px] max-w-full gap-y-8 px-2 pb-20">
        {isAdvanced ? (
          <AdvancedForm
            setIsLoading={setIsLoading}
            handleSetResult={handleSetResult}
            resultRef={resultRef}
          />
        ) : (
          <BasicForm
            setIsLoading={setIsLoading}
            handleSetResult={handleSetResult}
            resultRef={resultRef}
          />
        )}

        <div
          ref={resultRef}
          className="w-full mt-8"
        >
          {isLoading ? (
            <AnalysisResults.Skeleton />
          ) : (
            result && <AnalysisResults result={result} />
          )}
        </div>
      </div>
    </div>
  );
}
