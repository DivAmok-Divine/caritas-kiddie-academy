"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function ProgressReportsPage() {
  const router = useRouter();

  // Hardcoded progress reports
  const reports = [
    {
      id: "1",
      period: "November 2024",
      status: "Published",
      publishedDate: "2024-12-01",
      summary: "Emma has shown excellent progress in all areas of development this month.",
    },
    {
      id: "2",
      period: "October 2024",
      status: "Published",
      publishedDate: "2024-11-01",
      summary: "Great improvement in social interactions and motor skills.",
    },
    {
      id: "3",
      period: "September 2024",
      status: "Published",
      publishedDate: "2024-10-01",
      summary: "Steady progress in cognitive and language development.",
    },
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
          <h1 className="text-3xl font-bold" style={{ color: '#212529' }}>Progress Reports</h1>
          <p className="mt-1" style={{ color: '#212529' }}>View your child's developmental progress</p>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="rounded-lg shadow-xl border p-6 cursor-pointer hover:shadow-2xl transition-shadow relative overflow-hidden"
              style={{ backgroundColor: '#F8F9FA' }}
            >
              {/* Decorative bubbles */}
              <div className="absolute top-[-12px] right-[-12px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
              <div className="absolute bottom-[-18px] left-[-18px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3 pb-3 border-b-2" style={{ borderColor: '#00A3A3' }}>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#212529' }}>{report.period}</h3>
                  <p className="text-sm mt-1" style={{ color: '#212529' }}>
                    Published: {new Date(report.publishedDate).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm font-medium rounded" style={{ backgroundColor: '#00A3A3', color: '#FFFFFF' }}>
                  {report.status}
                </span>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: '#212529' }}>{report.summary}</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t-2" style={{ borderColor: '#00A3A3' }}>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-xs mb-1" style={{ color: '#212529' }}>Physical Development</p>
                  <p className="text-sm font-medium" style={{ color: '#212529' }}>Excellent</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-xs mb-1" style={{ color: '#212529' }}>Cognitive Development</p>
                  <p className="text-sm font-medium" style={{ color: '#212529' }}>Good</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-xs mb-1" style={{ color: '#212529' }}>Language Development</p>
                  <p className="text-sm font-medium" style={{ color: '#212529' }}>Good</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-xs mb-1" style={{ color: '#212529' }}>Social Development</p>
                  <p className="text-sm font-medium" style={{ color: '#212529' }}>Excellent</p>
                </div>
                <div className="pb-2 border-b" style={{ borderColor: '#E0E0E0' }}>
                  <p className="text-xs mb-1" style={{ color: '#212529' }}>Emotional Development</p>
                  <p className="text-sm font-medium" style={{ color: '#212529' }}>Excellent</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t" style={{ borderColor: '#E0E0E0' }}>
                <button className="text-sm font-medium inline-flex items-center gap-1" style={{ color: '#00A3A3' }} onMouseEnter={(e) => e.currentTarget.style.color = '#008080'} onMouseLeave={(e) => e.currentTarget.style.color = '#00A3A3'}>
                  View Full Report <span>→</span>
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
