"use client"

import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import TopicSection from "@/components/level-check/TopicSection"
import EssayForm from "@/components/level-check/EssayForm"
import EvaluationResults from "@/components/level-check/EvaluationResults"
import Instructions from "@/components/level-check/Instructions"
import { useWritingTopicQuery } from "@/api/queries/level-check"
import { useEvaluateEssayMutation } from "@/api/mutations/level-check"
import { EssayEvaluation } from "@/types/level-check"

export default function LevelCheckPage() {
  const [essay, setEssay] = useState("")
  const [showEvaluation, setShowEvaluation] = useState(false)
  const [evaluation, setEvaluation] = useState<EssayEvaluation | null>(null)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isWritingStarted, setIsWritingStarted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const { data: topicData, refetch: getTopic, isLoading: isTopicLoading, isError: isTopicError } = useWritingTopicQuery()
  const { mutate: evaluateEssay, isPending: isEvaluationPending } = useEvaluateEssayMutation()

  // Timer effect
  useEffect(() => {
    if (isWritingStarted && !showEvaluation) {
      timerRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isWritingStarted, showEvaluation])

  const handleGetTopic = async () => {
    try {
      await getTopic()
      setShowEvaluation(false)
      setEvaluation(null)
      setEssay("")
      setTimeSpent(0)
      setIsWritingStarted(false)
      setIsSubmitted(false)
    } catch (error) {
      console.error("Error getting topic:", error)
    }
  }

  const handleEssayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isSubmitted) {
      setEssay(e.target.value)

      if (e.target.value.length > 0 && !isWritingStarted) {
        setIsWritingStarted(true)
      }
    }
  }

  const handleSubmitEssay = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitted) {
      toast.error("Essay already submitted. Please get a new topic to try again.")
      return
    }

    if (!topicData?.topic || !essay.trim()) {
      toast.error("Please write your essay first")
      return
    }

    if (essay.split(/\s+/).filter(word => word.length > 0).length < 50) {
      toast.error("Essay should be at least 50 words")
      return
    }

    setIsSubmitted(true)
    setIsWritingStarted(false)

    evaluateEssay(
      {
        topic: topicData.topic,
        essay,
        timeSpent
      },
      {
        onSuccess: (response) => {
          setEvaluation(response.data as EssayEvaluation)
          setShowEvaluation(true)
        },
        onError: () => {
          setIsSubmitted(false)
          setIsWritingStarted(true)
        }
      }
    )
  }

  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">IELTS Writing Level Check</h1>
          <p className="text-gray-600">Test your writing skills and get professional evaluation</p>
        </div>

        <TopicSection
          topicData={topicData ?? null}
          isTopicLoading={isTopicLoading}
          isTopicError={isTopicError}
          timeSpent={timeSpent}
          onGetTopic={handleGetTopic}
        />


        {topicData?.topic && !showEvaluation && (
          <EssayForm
            essay={essay}
            timeSpent={timeSpent}
            isSubmitted={isSubmitted}
            isEvaluationPending={isEvaluationPending}
            onEssayChange={handleEssayChange}
            onSubmit={handleSubmitEssay}
          />
        )}

        {showEvaluation && evaluation && (
          <EvaluationResults
            evaluation={evaluation}
            timeSpent={timeSpent}
            onTryAgain={handleGetTopic}
          />
        )}

        {!topicData?.topic && !showEvaluation && (
          <Instructions />
        )}
      </div>
    </main>
  )
}