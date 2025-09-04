import { Clock } from "lucide-react";

interface TimerDisplayProps {
  timeSpent: number;
}

export default function TimerDisplay({ timeSpent }: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center bg-blue-100 rounded-lg px-3 py-2 w-fit">
      <Clock className="h-4 w-4 text-blue-600 mr-2" />
      <span className="font-mono text-blue-800">{formatTime(timeSpent)}</span>
      <span className="text-sm text-blue-600 ml-2">Time spent</span>
    </div>
  );
}