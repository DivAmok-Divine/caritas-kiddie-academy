"use client";

import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  postedDate: string;
}

interface RecentAnnouncementsProps {
  announcements?: Announcement[];
  viewAllLink?: string;
}

export default function RecentAnnouncements({
  announcements,
  viewAllLink = "/dashboard/parent/announcements",
}: RecentAnnouncementsProps) {
  // Mock announcements if none provided
  const displayAnnouncements: Announcement[] = announcements || [
    {
      id: "1",
      title: "New Activity Schedule",
      postedDate: "Posted 2 days ago",
    },
    {
      id: "2",
      title: "Holiday Reminder",
      postedDate: "Posted 5 days ago",
    },
  ];

  return (
    <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Decorative bubbles */}
      <div className="absolute top-[-10px] right-[-10px] w-18 h-18 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute bottom-[-15px] left-[-15px] w-14 h-14 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Announcements</h3>
      <div className="space-y-3">
          {displayAnnouncements.map((announcement, index) => (
            <div key={announcement.id} className={`pb-3 ${index !== displayAnnouncements.length - 1 ? 'border-b' : ''}`} style={{ borderColor: index !== displayAnnouncements.length - 1 ? '#E0E0E0' : 'transparent' }}>
              <div className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#00A3A3' }}></span>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#212529' }}>{announcement.title}</p>
                  <p className="text-xs mt-1" style={{ color: '#212529' }}>{announcement.postedDate}</p>
                </div>
              </div>
          </div>
        ))}
      </div>
        <div className="mt-4 pt-3 border-t" style={{ borderColor: '#E0E0E0' }}>
          <Link href={viewAllLink} className="text-sm font-medium inline-flex items-center gap-1" style={{ color: '#00A3A3' }} onMouseEnter={(e) => e.currentTarget.style.color = '#008080'} onMouseLeave={(e) => e.currentTarget.style.color = '#00A3A3'}>
            View All <span>→</span>
      </Link>
        </div>
      </div>
    </div>
  );
}

