import { EssayEvaluation } from "@/types/level-check";

interface EvaluationResultsProps {
  evaluation: EssayEvaluation;
  timeSpent: number;
  onTryAgain: () => void;
}

export default function EvaluationResults({
  evaluation,
  timeSpent,
  onTryAgain
}: EvaluationResultsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Evaluation Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">Overall Band Score</h3>
          <div className="text-4xl font-bold text-center">{evaluation.overallBand}</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Task Achievement:</span>
            <span className="font-semibold">{evaluation.taskAchievement}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Coherence & Cohesion:</span>
            <span className="font-semibold">{evaluation.coherenceCohesion}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Lexical Resource:</span>
            <span className="font-semibold">{evaluation.lexicalResource}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Grammatical Range:</span>
            <span className="font-semibold">{evaluation.grammaticalRange}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Word Count:</span>
            <span className="font-semibold">{evaluation.wordCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Time Spent:</span>
            <span className="font-semibold">{formatTime(timeSpent)}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Feedback</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{evaluation.feedback}</p>
        </div>
      </div>

      {evaluation.suggestions && evaluation.suggestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Suggestions for Improvement</h3>
          <ul className="space-y-2">
            {evaluation.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start bg-yellow-50 p-3 rounded-lg">
                <span className="text-yellow-600 mr-2">•</span>
                <span className="text-gray-800">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={onTryAgain}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again with New Topic
        </button>
      </div>
    </div>
  );
}