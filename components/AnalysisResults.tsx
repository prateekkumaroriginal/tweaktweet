import { basicAnalysisResult } from '@/lib/types'

interface AnalysisResultsProps {
  result: basicAnalysisResult
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  return (
    <div className="flex flex-col w-full gap-y-8">
      <div className="w-full">
        <div className="w-fit">
          <h3 className="text-xs pr-4 uppercase font-semibold text-sky-300/60">
            Suggested
          </h3>
          <div className="bg-sky-300/60 w-full h-0.5 mt-0.5" />
        </div>
        <div className="mt-2 pl-4">
          <p className="text-3xl">
            {result.suggestedText}
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="w-fit">
          <h3 className="text-xs pr-4 uppercase font-semibold text-sky-300/60">
            Best time to post
          </h3>
          <div className="bg-sky-300/60 w-full h-0.5 mt-0.5" />
        </div>
        <div className="mt-2 pl-4">
          <p className="text-3xl capitalize">
            {result.bestTime}
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="w-fit">
          <h3 className="text-xs pr-4 uppercase font-semibold text-sky-300/60">
            Engagement
          </h3>
          <div className="bg-sky-300/60 w-full h-0.5 mt-0.5" />
        </div>
        <div className="mt-2 pl-4">
          <p className="text-3xl capitalize">
            {result.engagementPredicted}
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="w-fit">
          <h3 className="text-xs pr-4 uppercase font-semibold text-sky-300/60">
            Sentiment
          </h3>
          <div className="bg-sky-300/60 w-full h-0.5 mt-0.5" />
        </div>
        <div className="mt-2 pl-4">
          <p className="text-3xl capitalize">
            {result.sentiment}
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="w-fit">
          <h3 className="text-xs pr-4 uppercase font-semibold text-sky-300/60">
            Suggestions to Improve
          </h3>
          <div className="bg-sky-300/60 w-full h-0.5 mt-0.5" />
        </div>
        <div className="mt-2 pl-12">
          <ul className="text-3xl list-disc">
            {result.suggestions.map((suggestion, i) => (
              <li key={i}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AnalysisResults