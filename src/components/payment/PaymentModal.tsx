// components/payment/PaymentModal.tsx
"use client"

import { useState } from "react"
import { X, CreditCard, Calendar, Lock } from "lucide-react"
import { toast } from "sonner"
import { useProcessPaymentMutation } from "@/api/mutations/payment"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  courseTitle: string
  amount: number
  onPaymentSuccess: () => void
}

export default function PaymentModal({
  isOpen,
  onClose,
  courseTitle,
  amount,
  onPaymentSuccess
}: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardHolderName, setCardHolderName] = useState("")

  const processPaymentMutation = useProcessPaymentMutation()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      toast.error("Please fill all card details")
      return
    }

    try {
      await processPaymentMutation.mutateAsync({
        cardNumber,
        expiryDate,
        cvv,
        cardHolderName,
        amount
      })

      toast.success("Payment processed successfully!")
      onPaymentSuccess()
      onClose()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Payment error:", error.message)
      }
      toast.error("Payment failed. Please try again.")
    }

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Payment</h2>
          <p className="text-gray-600">Enroll in: {courseTitle}</p>
          <div className="text-3xl font-bold text-blue-600 mt-2">${amount}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={16}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={5}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={3}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={processPaymentMutation.isPending}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processPaymentMutation.isPending ? "Processing..." : `Pay $${amount}`}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>This is a mock payment. No real transaction will occur.</p>
        </div>
      </div>
    </div>
  )
}