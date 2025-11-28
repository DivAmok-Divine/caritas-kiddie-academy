"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function AnnouncementsPage() {
  const router = useRouter();

  // Hardcoded announcements
  const announcements = [
    {
      id: "1",
      title: "New Activity Schedule",
      content: "We're excited to announce our new weekly activity schedule starting next week. The schedule includes enhanced music sessions, outdoor play activities, and new sensory exploration activities.",
      priority: "normal",
      publishDate: "2024-12-08",
      targetAudience: "All Parents",
    },
    {
      id: "2",
      title: "Holiday Break Reminder",
      content: "Just a friendly reminder that the daycare will be closed from December 20th to January 5th for the holiday break. We look forward to welcoming all children back on January 6th.",
      priority: "high",
      publishDate: "2024-12-05",
      targetAudience: "All Parents",
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      content: "We're scheduling parent-teacher meetings for December 15th. Please sign up for a time slot that works for you. This is a great opportunity to discuss your child's progress.",
      priority: "high",
      publishDate: "2024-12-03",
      targetAudience: "All Parents",
    },
    {
      id: "4",
      title: "New Safety Protocols",
      content: "We've updated our safety protocols to ensure the best care for all children. Please review the updated handbook available in the parent portal.",
      priority: "normal",
      publishDate: "2024-12-01",
      targetAudience: "All Parents",
    },
    {
      id: "5",
      title: "Photo Day Coming Up",
      content: "Professional photo day is scheduled for December 18th. All children will have their photos taken. More details to follow.",
      priority: "normal",
      publishDate: "2024-11-28",
      targetAudience: "All Parents",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return { borderColor: '#FF0000', backgroundColor: '#FFE5E5' };
      case "high":
        return { borderColor: '#FFA500', backgroundColor: '#FFF5E5' };
      case "normal":
        return { borderColor: '#00A3A3', backgroundColor: '#E5F5F5' };
      default:
        return { borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' };
    }
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

        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#212529' }}>Announcements</h1>
          <p className="mt-1" style={{ color: '#212529' }}>Stay updated with the latest news and updates</p>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => {
            const priorityStyle = getPriorityColor(announcement.priority);
            return (
            <div
              key={announcement.id}
              className="rounded-lg shadow-xl border-l-4 border p-6 relative overflow-hidden"
              style={{ 
                backgroundColor: priorityStyle.backgroundColor,
                borderLeftColor: priorityStyle.borderColor
              }}
            >
              {/* Decorative bubbles */}
              <div className="absolute top-[-12px] right-[-12px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
              <div className="absolute bottom-[-18px] left-[-18px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3 pb-3 border-b-2" style={{ borderColor: '#00A3A3' }}>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#212529' }}>{announcement.title}</h3>
                    <p className="text-sm mb-1" style={{ color: '#212529' }}>
                      Published: {new Date(announcement.publishDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm" style={{ color: '#212529' }}>For: {announcement.targetAudience}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded capitalize" style={{ backgroundColor: '#E0E0E0', color: '#212529' }}>
                    {announcement.priority}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed" style={{ color: '#212529' }}>{announcement.content}</p>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
