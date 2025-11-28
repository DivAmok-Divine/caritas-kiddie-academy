"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function ChildProfilePage() {
  const router = useRouter();
  const params = useParams();

  // Hardcoded child data
  const child = {
    child_id: params.id || "1",
    first_name: "Emma",
    last_name: "Johnson",
    enrollment_code: "CK001A",
    date_of_birth: "2023-06-15",
    age_in_months: 18,
    gender: "female",
    current_room: "Infant Room A",
    address: "123 Main Street, City, State 12345",
    allergies: "None",
    medical_conditions: "None",
    medications: "None",
    special_care_instructions: "Loves music and story time",
    emergency_contact_name: "John Johnson",
    emergency_contact_phone: "+1 (555) 123-4567",
    enrollment_date: "2024-01-15",
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#F8F9FA' }}>
      <DashboardHeader />
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

        <div className="rounded-lg shadow-xl border p-6 mb-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-lg mx-auto md:mx-0 flex items-center justify-center shadow-lg" style={{ backgroundColor: '#E0E0E0' }}>
                <span className="text-4xl font-bold" style={{ color: '#210a87' }}>
                  {child.first_name[0]}{child.last_name[0]}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#212529' }}>
                {child.first_name} {child.last_name}
              </h1>
              <p className="mb-4" style={{ color: '#212529' }}>Enrollment Code: {child.enrollment_code}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: '#E0E0E0' }}>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm" style={{ color: '#212529' }}>Date of Birth</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{new Date(child.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm" style={{ color: '#212529' }}>Age</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.age_in_months} months</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm" style={{ color: '#212529' }}>Gender</p>
                  <p className="font-medium capitalize" style={{ color: '#212529' }}>{child.gender}</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm" style={{ color: '#212529' }}>Current Room</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.current_room}</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Contact Information</h2>
              <div className="space-y-3">
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Address</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.address}</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Emergency Contact</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.emergency_contact_name}</p>
                  <p style={{ color: '#212529' }}>{child.emergency_contact_phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Health Information</h2>
              <div className="space-y-3">
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Allergies</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.allergies}</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Medical Conditions</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.medical_conditions}</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Medications</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.medications}</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Special Care Instructions</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.special_care_instructions}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
            {/* Decorative bubbles */}
            <div className="absolute top-[-15px] right-[-15px] w-24 h-24 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-18 h-18 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Enrollment Information</h2>
              <div className="space-y-3">
                <div className="pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Enrollment Date</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{new Date(child.enrollment_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: '#212529' }}>Enrollment Code</p>
                  <p className="font-medium" style={{ color: '#212529' }}>{child.enrollment_code}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
