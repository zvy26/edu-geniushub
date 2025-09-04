interface EssayFormProps {
  essay: string;
  timeSpent: number;
  isSubmitted: boolean;
  isEvaluationPending: boolean;
  onEssayChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EssayForm({
  essay,
  timeSpent,
  isSubmitted,
  isEvaluationPending,
  onEssayChange,
  onSubmit
}: EssayFormProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wordCount = essay.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Write Your Essay</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Write your essay (minimum 250 words recommended)
          </label>
          <textarea
            value={essay}
            onChange={onEssayChange}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Start writing your essay here..."
            required
            disabled={isSubmitted}
            style={{ 
              cursor: isSubmitted ? 'not-allowed' : 'text',
              backgroundColor: isSubmitted ? '#f9fafb' : 'white'
            }}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-500">Word count: {wordCount}</p>
            <p className="text-sm text-gray-500">Time: {formatTime(timeSpent)}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isEvaluationPending || !essay.trim() || isSubmitted}
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {isEvaluationPending ? "Evaluating..." : isSubmitted ? "Submitted" : "Submit Essay"}
        </button>

        {isSubmitted && !isEvaluationPending && (
          <p className="text-sm text-blue-600">
            Essay submitted. Waiting for evaluation results...
          </p>
        )}
      </form>
    </div>
  );
}