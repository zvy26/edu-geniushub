// api/mutations/payment.ts
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "@/lib/client"
import { toast } from "sonner"
import { AxiosError } from "axios"

interface PaymentData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
  amount: number
}

export const useProcessPaymentMutation = () => {
  return useMutation({
    mutationFn: (paymentData: PaymentData) =>
      axiosInstance.post("/payments/process", paymentData),
    onSuccess: (response) => {
      toast.success(response.data.message || "Payment processed successfully")
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Payment failed")
    }
  })
}