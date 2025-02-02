import { advancedAnalysisResult, basicAnalysisResult } from '@/lib/types'
import Title from './ui/Title'
import BubbleCard from './ui/BubbleCard'
import { Heart, MessageCircle, Share, Share2 } from 'lucide-react';

interface AnalysisResultsProps {
  result: basicAnalysisResult | advancedAnalysisResult;
}

const DISPLAY_FIELDS: Partial<Record<keyof basicAnalysisResult, string>> = {
  engagementPredicted: 'Predicted Engagement',
  sentiment: 'Sentiment',
  style: 'Style',
  tone: 'Tone',
  bestTime: 'Best Time to Post'
};

const ADVANCED_DISPLAY_FIELDS: Partial<Record<keyof advancedAnalysisResult, string>> = {
  likesPredicted: 'Predicted Likes',
  sharesPredicted: 'Predicted Shares',
  commentsPredicted: 'Predicted Comments'
};

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const isAdvanced = 'likesPredicted' in result;

  return (
    <div className="flex flex-col w-full gap-y-8">
      <div className="w-full">
        <BubbleCard>
          <Title title="Suggested" />
          <div className="mt-2 pl-4">
            <p className="text-3xl">
              {result.suggestedText}
            </p>
          </div>
        </BubbleCard>
      </div>

      {isAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BubbleCard>
            <div className="relative flex items-center">
              <div className="flex justify-center items-center w-fit ml-2 mr-6">
                <Heart className="size-12 text-rose-500" />
              </div>
              <div className="flex flex-col">
                <Title title="Predicted Likes" />
                <p className="flex items-center gap-x-2 text-3xl mt-2 capitalize">
                  {result.likesPredicted}
                </p>
              </div>
            </div>
          </BubbleCard>

          <BubbleCard>
            <div className="relative flex items-center">
              <div className="flex justify-center items-center w-fit ml-2 mr-6">
                <Share2 className="size-12 text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <Title title="Predicted Shares" />
                <p className="flex items-center gap-x-2 text-3xl mt-2 capitalize">
                  {result.sharesPredicted}
                </p>
              </div>
            </div>
          </BubbleCard>

          <BubbleCard>
            <div className="relative flex items-center">
              <div className="flex justify-center items-center w-fit ml-2 mr-6">
                <MessageCircle className="size-12 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <Title title="Predicted Comments" />
                <p className="flex items-center gap-x-2 text-3xl mt-2 capitalize">
                  {result.commentsPredicted}
                </p>
              </div>
            </div>
          </BubbleCard>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(DISPLAY_FIELDS).map(([key, label]) => (
          <BubbleCard key={key}>
            <Title title={label} />
            <p className="text-3xl mt-2 pl-4 capitalize">
              {result[key as keyof basicAnalysisResult]}
            </p>
          </BubbleCard>
        ))}
      </div>

      <div className="flex w-full">
        <BubbleCard>
          <Title title="Suggested Hashtags" />
          <div className="flex flex-wrap w-full gap-2 mt-2 pl-4">
            {result.suggestedHashtags.map(h => (
              <span
                key={h}
                className='px-4 py-2 border border-blue-800 bg-blue-900 font-semibold rounded-full'
              >
                {h}
              </span>
            ))}
          </div>
        </BubbleCard>
      </div>

      <div className="w-full">
        <BubbleCard>
          <Title title="Suggestions to Improve" />
          <div className="mt-2 pl-12">
            <ul className="text-3xl list-disc">
              {result.suggestions.map((suggestion, i) => (
                <li key={i}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </BubbleCard>
      </div>
    </div >
  )
}

AnalysisResults.Skeleton = () => {
  return (
    <div className="flex flex-col w-full gap-y-8">
      {/* Suggested Text Card */}
      <div className="w-full">
        <div className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
          <div className="h-4 w-32 bg-slate-700 rounded mb-4"></div>
          <div className="mt-2 pl-4">
            <div className="h-8 bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
            <div className="h-4 w-24 bg-slate-700 rounded mb-4"></div>
            <div className="h-8 w-32 bg-slate-700 rounded mt-2 ml-4"></div>
          </div>
        ))}
      </div>

      {/* Suggestions Card */}
      <div className="w-full">
        <div className="bg-slate-800/50 rounded-lg p-6 animate-pulse">
          <div className="h-4 w-40 bg-slate-700 rounded mb-4"></div>
          <div className="mt-2 pl-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-x-2">
                  <div className="h-2 w-2 bg-slate-700 rounded-full"></div>
                  <div className="h-8 bg-slate-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults