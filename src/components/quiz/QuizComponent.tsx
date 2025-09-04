"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useSubmitQuizMutation, useCompleteLessonMutation } from "@/api/mutations/lessons"
import { toast } from "sonner"

interface Question {
  _id: string
  question: string
  options: string[]
  order: number
}

interface QuizResult {
  questionId: string
  question: string
  options: string[]
  userAnswer: number
  correctAnswer: number
  isCorrect: boolean
}

interface QuizResponse {
  score: number
  correctAnswers: number
  totalQuestions: number
  results: QuizResult[]
}

interface QuizComponentProps {
  questions: Question[]
  lessonId: string
  onQuizComplete?: () => void
}

export default function QuizComponent({ questions, lessonId, onQuizComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResponse | null>(null)
  
  const submitQuizMutation = useSubmitQuizMutation()
  const completeLessonMutation = useCompleteLessonMutation()

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = parseInt(value)
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.includes(-1)) {
      toast.error("Please answer all questions before submitting")
      return
    }

    try {
      const result = await submitQuizMutation.mutateAsync({
        lessonId,
        answers
      })
      
      setQuizResults(result)
      setIsSubmitted(true)
      
      // Quiz tugagandan so'ng lessonni complete qilish
      try {
        await completeLessonMutation.mutateAsync(lessonId)
        // 2 soniya kutib, keyin orqaga qaytish
        setTimeout(() => {
          if (onQuizComplete) {
            onQuizComplete()
          }
        }, 2000)
      } catch (error) {
        console.error("Failed to complete lesson:", error)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit quiz"
      toast.error(errorMessage)
    }
  }

  if (isSubmitted && quizResults) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">{quizResults.score}%</div>
          <p className="text-gray-600">{quizResults.correctAnswers} out of {quizResults.totalQuestions} correct</p>
          <p className="text-green-600 font-medium mt-4">Lesson completed successfully! Returning back...</p>
        </div>

        <div className="space-y-4">
          {quizResults.results.map((result, index) => (
            <Card key={result.questionId} className={result.isCorrect ? "border-green-200" : "border-red-200"}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Question {index + 1}: {result.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {result.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded ${
                        optionIndex === result.correctAnswer
                          ? "bg-green-100 text-green-800"
                          : optionIndex === result.userAnswer && !result.isCorrect
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100"
                      }`}
                    >
                      {option}
                      {optionIndex === result.correctAnswer && " ✓"}
                      {optionIndex === result.userAnswer && !result.isCorrect && " ✗"}
                    </div>
                  ))}
                </div>
                {!result.isCorrect && (
                  <p className="text-red-600 text-sm mt-2">
                    Your answer was incorrect
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Quiz</h2>
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestionIndex].toString()}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={answers[currentQuestionIndex] === -1 || submitQuizMutation.isPending}
            className="flex items-center justify-center gap-2"
          >
            {submitQuizMutation.isPending && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestionIndex] === -1}
          >
            Next
          </Button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {questions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-8 h-8 rounded-full text-sm ${
              index === currentQuestionIndex
                ? "bg-blue-600 text-white"
                : answers[index] !== -1
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}