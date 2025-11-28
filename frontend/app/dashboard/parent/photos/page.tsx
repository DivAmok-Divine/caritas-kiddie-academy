"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function PhotosPage() {
  const router = useRouter();

  // Hardcoded photos
  const photos = [
    { id: "1", date: "2024-12-10", caption: "Playing with blocks", activity: "Free Play" },
    { id: "2", date: "2024-12-10", caption: "Story time", activity: "Story Time" },
    { id: "3", date: "2024-12-10", caption: "Outdoor play", activity: "Outdoor Activity" },
    { id: "4", date: "2024-12-09", caption: "Art and craft", activity: "Creative Activity" },
    { id: "5", date: "2024-12-09", caption: "Music session", activity: "Music & Movement" },
    { id: "6", date: "2024-12-09", caption: "Lunch time", activity: "Meal Time" },
    { id: "7", date: "2024-12-08", caption: "Sensory play", activity: "Sensory Activity" },
    { id: "8", date: "2024-12-08", caption: "Nap time", activity: "Rest Time" },
    { id: "9", date: "2024-12-08", caption: "Tummy time", activity: "Physical Development" },
  ];

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

        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#212529' }}>Daily Photos</h1>
          <p className="mt-1" style={{ color: '#212529' }}>View photos from your child's daily activities</p>
        </div>

        {/* Filter by Date */}
        <div className="mb-6 rounded-lg shadow-xl border p-4 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-10px] right-[-10px] w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-15px] left-[-15px] w-12 h-12 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10">
            <label className="block text-sm font-medium mb-2 pb-2 border-b" style={{ color: '#212529', borderColor: '#E0E0E0' }}>Filter by Date</label>
            <input
              type="date"
              className="px-3 py-2 border rounded-md"
              style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}
              defaultValue="2024-12-10"
            />
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-lg shadow-xl border overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer relative"
              style={{ backgroundColor: '#F8F9FA' }}
            >
              {/* Small decorative circle */}
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-60 z-10" style={{ backgroundColor: '#00A3A3' }}></div>
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#E0E0E0' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-3 border-t" style={{ borderColor: '#E0E0E0' }}>
                <p className="text-xs mb-1 pb-1 border-b" style={{ color: '#212529', borderColor: '#E0E0E0' }}>{new Date(photo.date).toLocaleDateString()}</p>
                <p className="text-sm font-medium" style={{ color: '#212529' }}>{photo.caption}</p>
                <p className="text-xs mt-1" style={{ color: '#212529' }}>{photo.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
