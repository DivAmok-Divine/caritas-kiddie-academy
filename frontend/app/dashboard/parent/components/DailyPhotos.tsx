"use client";

import Link from "next/link";

interface DailyPhotosProps {
  photos?: Array<{ id: string; url: string; caption?: string }>;
}

interface Photo {
  id: string;
  url: string;
  caption?: string;
}

export default function DailyPhotos({ photos }: DailyPhotosProps) {
  // Mock photos if none provided
  const displayPhotos = photos || [1, 2, 3].map((i) => ({ id: `mock-${i}`, url: "" }));

  return (
    <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Decorative bubbles */}
      <div className="absolute top-[-15px] right-[-15px] w-28 h-28 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute top-1/3 right-5 w-12 h-12 rounded-full opacity-25" style={{ backgroundColor: '#00A3A3' }}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4 pb-3 border-b-2" style={{ borderColor: '#00A3A3' }}>
          <h3 className="text-lg font-bold" style={{ color: '#212529' }}>Today's Photos</h3>
          <Link href="/dashboard/parent/photos" className="text-sm font-medium" style={{ color: '#00A3A3' }} onMouseEnter={(e) => e.currentTarget.style.color = '#008080'} onMouseLeave={(e) => e.currentTarget.style.color = '#00A3A3'}>
            View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayPhotos.map((photo: Photo) => (
          <div key={photo.id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            {photo.url ? (
              <img
                src={photo.url}
                alt={photo.caption || "Daily photo"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

