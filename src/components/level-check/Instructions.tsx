const steps = [
  'Click "Get New Topic" button',
  "Write an essay on the given topic (minimum 250 words recommended)",
  "The timer will automatically start when you begin typing",
  "Submit your essay for AI evaluation",
  "Receive detailed feedback and band score",
];

export default function Instructions() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-blue-800 mb-4">How It Works</h2>
      <ol className="space-y-3 list-decimal list-inside">
        {steps.map((step, index) => (
          <li key={index} className="text-blue-700">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
