"use client"

import { useState } from "react"
import { ChangePasswordData } from "@/types/user"
import { X, Shield } from "lucide-react"

interface PasswordChangeFormProps {
  onSubmit: (data: ChangePasswordData) => void
  onCancel: () => void
  isLoading: boolean
}

export default function PasswordChangeForm({ 
  onSubmit, 
  onCancel, 
  isLoading 
}: PasswordChangeFormProps) {
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    currentPassword: "",
    newPassword: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(passwordData)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({
              ...passwordData,
              currentPassword: e.target.value
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({
              ...passwordData,
              newPassword: e.target.value
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Shield className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Change Password"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}