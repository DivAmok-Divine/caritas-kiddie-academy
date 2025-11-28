"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";
import QuickStatsCards from "@/components/useDashboard/QuickStatsCards";
import TodayCareLog from "./components/TodayCareLog";
import DailyPhotos from "./components/DailyPhotos";
import ParentSidebar from "./components/ParentSidebar";

interface Child {
  child_id: string;
  first_name: string;
  last_name: string;
  photo_url?: string;
  current_room?: string;
  enrollment_code: string;
}

interface CareLog {
  date: string;
  feeding_times: Array<{ time: string; type: string; amount: string }>;
  diaper_changes: Array<{ time: string; type: string }>;
  nap_times: Array<{ start: string; end: string; duration: number }>;
  activities: Array<{ name: string; duration: number }>;
  mood: string;
  notes?: string;
}

export default function ParentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [todayCareLog, setTodayCareLog] = useState<CareLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TEMPORARILY DISABLED: Login check for development/testing
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Redirect if not parent
      // if (userData.role !== "parent") {
      //   router.push(`/dashboard/${userData.role}`);
      //   return;
      // }
    } else {
      // router.push("/login");
      // return;
      // Mock user for development
      setUser({ email: "parent@example.com", role: "parent" });
    }

    // Fetch children data
    fetchChildren();
  }, [router]);

  const fetchChildren = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`http://localhost:1144/api/parent/children`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });
      // const data = await response.json();
      // setChildren(data.children);
      // if (data.children.length > 0) {
      //   setSelectedChild(data.children[0]);
      //   fetchTodayCareLog(data.children[0].child_id);
      // }

      // Mock data for now
      const mockChildren: Child[] = [
        {
          child_id: "1",
          first_name: "Emma",
          last_name: "Johnson",
          enrollment_code: "CK001A",
          current_room: "Infant Room A",
        },
      ];
      setChildren(mockChildren);
      setSelectedChild(mockChildren[0]);
      
      // Mock care log
      setTodayCareLog({
        date: new Date().toISOString().split("T")[0],
        feeding_times: [
          { time: "08:00", type: "Bottle", amount: "4 oz" },
          { time: "12:00", type: "Bottle", amount: "5 oz" },
        ],
        diaper_changes: [
          { time: "09:30", type: "Wet" },
          { time: "11:00", type: "Dirty" },
          { time: "14:00", type: "Wet" },
        ],
        nap_times: [
          { start: "10:00", end: "11:30", duration: 90 },
          { start: "13:00", end: "14:30", duration: 90 },
        ],
        activities: [
          { name: "Tummy Time", duration: 15 },
          { name: "Sensory Play", duration: 20 },
          { name: "Story Time", duration: 10 },
        ],
        mood: "happy",
        notes: "Emma had a great day! Very active and playful.",
      });
    } catch (error) {
      console.error("Error fetching children:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodayCareLog = async (childId: string) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`http://localhost:1144/api/parent/care-logs/${childId}/today`, {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // });
      // const data = await response.json();
      // setTodayCareLog(data.care_log);
    } catch (error) {
      console.error("Error fetching care log:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <DashboardHeader user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6 pt-24">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#212529' }}>
            Welcome back{selectedChild ? `, ${selectedChild.first_name}'s Parent` : ""}!
          </h2>
          <p className="mt-1" style={{ color: '#212529' }}>Here's what's happening today</p>
        </div>

        {/* Quick Stats Cards */}
        <QuickStatsCards
          stats={[
            {
              label: "Child Status",
              value: selectedChild ? "Checked In" : "N/A",
              subtitle: selectedChild?.current_room || "No room assigned",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              iconBgColor: "bg-green-100",
              iconColor: "text-green-600",
            },
            {
              label: "This Month",
              value: "95%",
              subtitle: "19/20 days present",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
              iconBgColor: "bg-blue-100",
              iconColor: "text-blue-600",
            },
            {
              label: "Notifications",
              value: "3",
              subtitle: "Unread messages",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
              iconBgColor: "bg-yellow-100",
              iconColor: "text-yellow-600",
            },
            {
              label: "Fee Status",
              value: "Paid",
              subtitle: "Next due: Dec 1",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              iconBgColor: "bg-green-100",
              iconColor: "text-green-600",
              valueColor: "text-green-600",
            },
          ]}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Care Log */}
          <div className="lg:col-span-2 space-y-6">
            <TodayCareLog careLog={todayCareLog} />
            <DailyPhotos />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <ParentSidebar
            child={selectedChild}
            onViewProfile={() => router.push(`/dashboard/parent/child/${selectedChild?.child_id}`)}
            onMessageCaregiver={() => router.push("/dashboard/parent/messages")}
            onViewProgressReports={() => router.push("/dashboard/parent/progress-reports")}
            onPaymentHistory={() => router.push("/dashboard/parent/payments")}
            events={[
              {
                id: "1",
                title: "Parent-Teacher Meeting",
                date: "Dec 15, 2024",
                time: "2:00 PM",
                type: "meeting",
              },
              {
                id: "2",
                title: "Holiday Break",
                date: "Dec 20 - Jan 5",
                type: "holiday",
              },
            ]}
            announcements={[
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
            ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

