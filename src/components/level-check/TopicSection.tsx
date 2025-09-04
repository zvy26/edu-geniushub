import TimerDisplay from "./TimerDisplay";

interface TopicSectionProps {
  topicData: { topic: string } | null;
  isTopicLoading: boolean;
  isTopicError: boolean;
  timeSpent: number;
  onGetTopic: () => void;
}

export default function TopicSection({
  topicData,
  isTopicLoading,
  isTopicError,
  timeSpent,
  onGetTopic
}: TopicSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Writing Task 2 Topic</h2>
        <button
          onClick={onGetTopic}
          disabled={isTopicLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isTopicLoading ? "Loading..." : "Get New Topic"}
        </button>
      </div>

      {isTopicError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">Error getting topic. Please try again.</p>
        </div>
      )}

      {topicData?.topic && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Topic:</h3>
          <p className="text-gray-800 leading-relaxed">{topicData.topic}</p>
          <TimerDisplay timeSpent={timeSpent} />
        </div>
      )}
    </div>
  );
}