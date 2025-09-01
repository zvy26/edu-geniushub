"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { UserProfileUpdateData, ChangePasswordData } from "@/types/user"
import ProfileDisplay from "@/components/profile/ProfileDisplay"
import ProfileEditForm from "@/components/profile/ProfileEditForm"
import PasswordChangeForm from "@/components/profile/PasswordChangeForm"
import { LogOut, User, Settings, Shield, Edit3 } from "lucide-react"
import { useProfileQuery } from "@/api/queries/profile"
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/api/mutations/profile"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const { data: profile, isLoading, error, refetch } = useProfileQuery()
  const updateProfileMutation = useUpdateProfileMutation()
  const changePasswordMutation = useChangePasswordMutation()

  const [editMode, setEditMode] = useState(false)
  const [changePasswordMode, setChangePasswordMode] = useState(false)
  const [formData, setFormData] = useState<UserProfileUpdateData>({
    name: "",
    email: "",
    phone: ""
  })

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || ""
      })
    }
  }, [profile])

  const handleLogout = () => {
    Cookies.remove("token")
    router.push("/login")
  }

  // Enable edit mode
  const handleEditClick = () => {
    setEditMode(true)
    setChangePasswordMode(false)
  }

  // Update profile
  const handleProfileUpdate = async (data: UserProfileUpdateData) => {
    try {
      await updateProfileMutation.mutateAsync(data)
      setEditMode(false)
      await refetch()
    } catch (error) {
      console.error("Profile update error:", error)
    }
  }

  // Change password
  const handlePasswordChange = async (data: ChangePasswordData) => {
    try {
      await changePasswordMutation.mutateAsync(data)
      setChangePasswordMode(false)
    } catch (error) {
      console.error("Password change error:", error)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-white rounded-lg w-1/4"></div>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Profile Not Available
            </h2>
            <p className="text-gray-600 mb-6">
              You are not logged in yet. To view the profile page, please 
              <span className="font-medium"> login </span> first.
            </p>
            <div className="flex gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <button
                onClick={() => refetch()}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-700">Profile information not found</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">{profile.name}</h2>
                  <p className="text-sm text-gray-500">{profile.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleEditClick}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    editMode && !changePasswordMode
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Edit3 className="h-5 w-5 mr-3" />
                  Edit Profile
                </button>

                <button
                  onClick={() => { setChangePasswordMode(true); setEditMode(false); }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    changePasswordMode
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {!editMode && !changePasswordMode ? (
              <ProfileDisplay profile={profile} />
            ) : changePasswordMode ? (
              <PasswordChangeForm
                onSubmit={handlePasswordChange}
                onCancel={() => setChangePasswordMode(false)}
                isLoading={changePasswordMutation.isPending}
              />
            ) : (
              <ProfileEditForm
                initialData={formData}
                onSubmit={handleProfileUpdate}
                onCancel={() => setEditMode(false)}
                isLoading={updateProfileMutation.isPending}
              />
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        {!editMode && !changePasswordMode && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="text-lg font-semibold text-gray-800 capitalize">{profile.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Settings className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(profile.createdAt).toLocaleDateString('en-US')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-gray-800">Active</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}