"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function ViewProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [parentData, setParentData] = useState<any>(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      // Mock user for development
      setUser({ email: "parent@example.com", role: "parent" });
    }

    // Mock parent data - in production, fetch from API
    setParentData({
      first_name: "Sarah",
      last_name: "Johnson",
      email: "parent@example.com",
      phone_number: "+233 24 123 4567",
      occupation: "Software Engineer",
      address: "123 Main Street, Accra, Ghana",
      relationship_to_child: "mother",
      is_primary_contact: true,
      account_created: "2024-01-15",
    });
  }, []);

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
          <h1 className="text-3xl font-bold" style={{ color: '#212529' }}>My Profile</h1>
          <p className="mt-1" style={{ color: '#212529' }}>View and manage your account information</p>
        </div>

        {/* Profile Header Card */}
        <div className="rounded-lg shadow-xl border p-6 mb-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-lg flex items-center justify-center shadow-lg border-2 relative" style={{ backgroundColor: '#E0E0E0', borderColor: '#00A3A3' }}>
              {parentData?.photo_url ? (
                <img
                  src={parentData.photo_url}
                  alt={`${parentData.first_name} ${parentData.last_name}`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`text-5xl font-bold ${parentData?.photo_url ? 'hidden' : ''}`} style={{ color: '#210a87' }}>
                {parentData?.first_name?.[0] || "P"}{parentData?.last_name?.[0] || ""}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/dashboard/parent/profile/edit');
                }}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-md cursor-pointer z-20"
                style={{ 
                  backgroundColor: '#00A3A3', 
                  color: '#FFFFFF',
                  zIndex: 20
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#008080';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#00A3A3';
                }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#212529' }}>
                {parentData?.first_name || "Parent"} {parentData?.last_name || ""}
              </h2>
              <p className="mb-1" style={{ color: '#212529' }}>{parentData?.email || user?.email || "parent@example.com"}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                {parentData?.is_primary_contact && (
                  <span className="px-3 py-1 text-xs font-medium rounded" style={{ backgroundColor: '#00A3A3', color: '#FFFFFF' }}>
                    Primary Contact
                  </span>
                )}
                <span className="px-3 py-1 text-xs font-medium rounded capitalize" style={{ backgroundColor: '#E0E0E0', color: '#212529' }}>
                  {parentData?.relationship_to_child || "Parent"}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                router.push('/dashboard/parent/profile/edit');
              }}
              className="px-6 py-3 text-white rounded-md font-medium shadow-lg transition-colors cursor-pointer"
              style={{ 
                backgroundColor: '#210a87',
                zIndex: 20,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a0870';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#210a87';
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Personal Information</h3>
              <div className="space-y-4">
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>First Name</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{parentData?.first_name || "N/A"}</p>
                </div>
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Last Name</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{parentData?.last_name || "N/A"}</p>
                </div>
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Email Address</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{parentData?.email || user?.email || "N/A"}</p>
                </div>
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Phone Number</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{parentData?.phone_number || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Occupation</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{parentData?.occupation || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Account Information */}
          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Contact & Account</h3>
              <div className="space-y-4">
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Address</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{parentData?.address || "N/A"}</p>
                </div>
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Relationship to Child</p>
                  <p className="font-medium capitalize" style={{ color: '#212529' }}>{parentData?.relationship_to_child || "N/A"}</p>
                </div>
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Account Status</p>
                  <p className="font-medium" style={{ color: '#00A3A3' }}>Active</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Member Since</p>
                  <p className="font-medium" style={{ color: '#212529' }}>
                    {parentData?.account_created ? new Date(parentData.account_created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mt-6 rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Security</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/dashboard/parent/profile/edit?section=password');
                }}
                className="px-6 py-3 rounded-md font-medium shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#210a87', 
                  border: '2px solid #210a87',
                  position: 'relative',
                  zIndex: 20
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
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/dashboard/parent/profile/edit');
                }}
                className="px-6 py-3 rounded-md font-medium shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#00A3A3', 
                  border: '2px solid #00A3A3',
                  position: 'relative',
                  zIndex: 20
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#00A3A3';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#00A3A3';
                }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

