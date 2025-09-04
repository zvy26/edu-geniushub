import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/lib/client"
import { toast } from "sonner"
import { AxiosError } from "axios"

interface SubmitQuizRequest {
    lessonId: string
    answers: number[]
}

interface QuizResult {
    score: number
    correctAnswers: number
    totalQuestions: number
    message: string
    results: Array<{
        questionId: string
        question: string
        options: string[]
        userAnswer: number
        correctAnswer: number
        isCorrect: boolean
    }>
}

// Quiz jo'natish uchun mutation
export const useSubmitQuizMutation = () => {
    return useMutation({
        mutationFn: async ({ lessonId, answers }: SubmitQuizRequest): Promise<QuizResult> => {
            const { data } = await axiosInstance.post(`/lessons/${lessonId}/quiz`, {
                answers
            })
            return data
        },
        onSuccess: (data) => {
            toast.success(data.message || "Quiz submitted successfully!")
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(error.response?.data?.message || "Failed to submit quiz")
        }
    })
}

// Lessonni complete qilish uchun mutation
export const useCompleteLessonMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (lessonId: string) => {
            const { data } = await axiosInstance.post(`/lessons/${lessonId}/complete`)
            return data
        },
        onSuccess: () => {
            toast.success("Lesson completed successfully!")
            // Lesson ma'lumotlarini yangilash
            queryClient.invalidateQueries({ queryKey: ["lesson"] })
            // Kurslar ro'yxatini yangilash
            queryClient.invalidateQueries({ queryKey: ["courses"] })
        },
        onError: (error: AxiosError<{ message?: string }>) => {
            toast.error(error.response?.data?.message || "Failed to complete lesson")
        }
    })
}