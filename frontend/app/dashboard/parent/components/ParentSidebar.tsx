"use client";

import ChildProfileCard from "./ChildProfileCard";
import QuickActions from "./QuickActions";
import UpcomingEvents from "./UpcomingEvents";
import RecentAnnouncements from "./RecentAnnouncements";

interface Child {
  child_id: string;
  first_name: string;
  last_name: string;
  photo_url?: string;
  current_room?: string;
  enrollment_code: string;
}

interface ParentSidebarProps {
  child: Child | null;
  onViewProfile?: () => void;
  onMessageCaregiver?: () => void;
  onViewProgressReports?: () => void;
  onPaymentHistory?: () => void;
  events?: Array<{
    id: string;
    title: string;
    date: string;
    time?: string;
    type?: string;
  }>;
  announcements?: Array<{
    id: string;
    title: string;
    postedDate: string;
  }>;
}

export default function ParentSidebar({
  child,
  onViewProfile,
  onMessageCaregiver,
  onViewProgressReports,
  onPaymentHistory,
  events,
  announcements,
}: ParentSidebarProps) {
  return (
    <div className="space-y-6 w-full">
      <ChildProfileCard child={child} />
      <QuickActions
        onViewProfile={onViewProfile}
        onMessageCaregiver={onMessageCaregiver}
        onViewProgressReports={onViewProgressReports}
        onPaymentHistory={onPaymentHistory}
      />
      <UpcomingEvents events={events} />
      <RecentAnnouncements announcements={announcements} />
    </div>
  );
}

