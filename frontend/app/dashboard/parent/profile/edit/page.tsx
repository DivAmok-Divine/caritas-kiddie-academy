"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

function EditProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section") || "profile";

  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    occupation: "",
    address: "",
    relationship_to_child: "mother",
    relationship_other: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      setUser({ email: "parent@example.com", role: "parent" });
    }

    // Mock parent data - in production, fetch from API
    setFormData({
      first_name: "Sarah",
      last_name: "Johnson",
      email: "parent@example.com",
      phone_number: "+233 24 123 4567",
      occupation: "Software Engineer",
      address: "123 Main Street, Accra, Ghana",
      relationship_to_child: "mother",
      relationship_other: "",
    });
    
    // Mock profile image - in production, fetch from API
    setProfileImage(null);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
      setError("");
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Replace with actual API call
      // const response = await fetch("http://localhost:1144/api/parent/profile", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify(formData),
      // });

      // TODO: Upload profile image if changed
      // if (profileImagePreview) {
      //   const formDataToSend = new FormData();
      //   formDataToSend.append('image', profileImage);
      //   await fetch("http://localhost:1144/api/parent/profile/image", {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //     body: formDataToSend,
      //   });
      // }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        router.push("/dashboard/parent/profile");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (passwordData.new_password !== passwordData.confirm_password) {
      setError("New passwords do not match");
      setIsLoading(false);
      return;
    }

    if (passwordData.new_password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await fetch("http://localhost:1144/api/parent/change-password", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify(passwordData),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Password changed successfully!");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#F8F9FA' }}>
      <DashboardHeader user={user} />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pt-24">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 px-4 py-2 rounded-md transition-colors shadow-md"
          style={{ color: '#FFFFFF', backgroundColor: '#210a87' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a0870'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#210a87'}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: '#212529' }}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#210a87' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </h1>
          <p className="mt-1" style={{ color: '#212529' }}>Update your account information</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b" style={{ borderColor: '#E0E0E0' }}>
          <button
            onClick={() => router.push('/dashboard/parent/profile/edit')}
            className="px-6 py-3 font-medium transition-colors relative flex items-center gap-2"
            style={{
              color: section === "profile" ? '#210a87' : '#212529',
              borderBottom: section === "profile" ? '2px solid #210a87' : 'none',
            }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: section === "profile" ? '#210a87' : '#212529' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile Information
          </button>
          <button
            onClick={() => router.push('/dashboard/parent/profile/edit?section=password')}
            className="px-6 py-3 font-medium transition-colors relative flex items-center gap-2"
            style={{
              color: section === "password" ? '#210a87' : '#212529',
              borderBottom: section === "password" ? '2px solid #210a87' : 'none',
            }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: section === "password" ? '#210a87' : '#212529' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Change Password
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: '#FFE5E5', borderColor: '#FF0000' }}>
            <p className="text-sm" style={{ color: '#FF0000' }}>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: '#E5F5F5', borderColor: '#00A3A3' }}>
            <p className="text-sm" style={{ color: '#00A3A3' }}>{success}</p>
          </div>
        )}

        {/* Profile Information Form */}
        {section === "profile" && (
          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h3>
              
              {/* Profile Image Upload Section */}
              <div className="mb-6 pb-6 border-b" style={{ borderColor: '#E0E0E0' }}>
                <label className="block text-sm font-medium mb-3" style={{ color: '#212529' }}>Profile Picture</label>
                <div className="flex items-center gap-6">
                  {/* Current/Preview Image */}
                  <div className="w-24 h-24 rounded-lg flex items-center justify-center shadow-lg border-2 relative overflow-hidden" style={{ backgroundColor: '#E0E0E0', borderColor: '#00A3A3' }}>
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-3xl font-bold" style={{ color: '#210a87' }}>
                        {formData.first_name?.[0] || "P"}{formData.last_name?.[0] || ""}
                      </span>
                    )}
                  </div>
                  
                  {/* Upload Controls */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label
                        htmlFor="profile-image-input"
                        className="px-4 py-2 rounded-md font-medium shadow-md transition-colors cursor-pointer text-center"
                        style={{ 
                          backgroundColor: '#FFFFFF', 
                          color: '#210a87', 
                          border: '2px solid #210a87'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#210a87';
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.color = '#210a87';
                        }}
                      >
                        <input
                          id="profile-image-input"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          {profileImagePreview ? 'Change Photo' : 'Upload Photo'}
                        </span>
                      </label>
                      
                      {profileImagePreview && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="px-4 py-2 rounded-md font-medium shadow-md transition-colors"
                          style={{ 
                            backgroundColor: '#FFFFFF', 
                            color: '#FF0000', 
                            border: '2px solid #FF0000'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF0000';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.color = '#FF0000';
                          }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Remove
                          </span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs mt-2" style={{ color: '#212529' }}>JPG, PNG or GIF. Max size 5MB</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    label="First Name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    leftIcon={
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                  />
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    label="Last Name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    leftIcon={
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    leftIcon={
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    label="Phone Number"
                    required
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    leftIcon={
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                </div>

                <Input
                  id="occupation"
                  name="occupation"
                  type="text"
                  label="Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                  leftIcon={
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#212529' }}>Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-start pt-3 pointer-events-none">
                      <svg className="h-5 w-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9CA3AF' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
                      style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00A3A3';
                        const icon = e.currentTarget.previousElementSibling?.querySelector('svg') as SVGElement;
                        if (icon) icon.style.color = '#00A3A3';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E0E0E0';
                        const icon = e.currentTarget.previousElementSibling?.querySelector('svg') as SVGElement;
                        if (icon) icon.style.color = '#9CA3AF';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#212529' }}>Relationship to Child</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9CA3AF' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <select
                      id="relationship_to_child"
                      name="relationship_to_child"
                      value={formData.relationship_to_child}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all appearance-none"
                      style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00A3A3';
                        const icon = e.currentTarget.previousElementSibling?.querySelector('svg') as SVGElement;
                        if (icon) icon.style.color = '#00A3A3';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E0E0E0';
                        const icon = e.currentTarget.previousElementSibling?.querySelector('svg') as SVGElement;
                        if (icon) icon.style.color = '#9CA3AF';
                      }}
                    >
                      <option value="mother">Mother</option>
                      <option value="father">Father</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9CA3AF' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {formData.relationship_to_child === "other" && (
                  <Input
                    id="relationship_other"
                    name="relationship_other"
                    type="text"
                    label="Specify Relationship"
                    required
                    value={formData.relationship_other}
                    onChange={handleChange}
                    placeholder="Enter relationship"
                    leftIcon={
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    className="px-8"
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/parent/profile")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Form */}
        {section === "password" && (
          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 pb-3 border-b-2 flex items-center gap-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-2xl">
                <Input
                  id="current_password"
                  name="current_password"
                  type="password"
                  label="Current Password"
                  required
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  leftIcon={
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />

                <Input
                  id="new_password"
                  name="new_password"
                  type="password"
                  label="New Password"
                  required
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  helperText="Password must be at least 8 characters long"
                  leftIcon={
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  }
                />

                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  label="Confirm New Password"
                  required
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  leftIcon={
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    className="px-8"
                  >
                    Change Password
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/dashboard/parent/profile")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#210a87' }}></div>
          <p style={{ color: '#212529' }}>Loading...</p>
        </div>
      </div>
    }>
      <EditProfileContent />
    </Suspense>
  );
}

