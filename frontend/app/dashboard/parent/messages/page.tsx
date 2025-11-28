"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

export default function MessagesPage() {
  const router = useRouter();

  // Hardcoded messages
  const messages = [
    {
      id: "1",
      from: "Ms. Sarah (Lead Caregiver)",
      subject: "Emma's Great Day Today!",
      message: "Emma had a wonderful day today! She participated in all activities and was very happy. She especially enjoyed the music and movement session.",
      date: "2024-12-10",
      time: "3:45 PM",
      isRead: false,
    },
    {
      id: "2",
      from: "Ms. Sarah (Lead Caregiver)",
      subject: "Weekly Update",
      message: "This week Emma has been making great progress with her motor skills. She's been trying to crawl more and showing interest in toys.",
      date: "2024-12-08",
      time: "2:30 PM",
      isRead: true,
    },
    {
      id: "3",
      from: "Nurse Johnson",
      subject: "Health Check Reminder",
      message: "Just a reminder that Emma's next health check is scheduled for next week. Please let us know if you have any concerns.",
      date: "2024-12-05",
      time: "10:15 AM",
      isRead: true,
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
          <h1 className="text-3xl font-bold" style={{ color: '#212529' }}>Messages</h1>
          <p className="mt-1" style={{ color: '#212529' }}>Communicate with your child's caregivers</p>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-lg shadow-xl border p-6 cursor-pointer hover:shadow-2xl transition-shadow relative overflow-hidden ${
                !msg.isRead ? "border-l-4" : ""
              }`}
              style={{ 
                backgroundColor: '#F8F9FA',
                borderLeftColor: !msg.isRead ? '#00A3A3' : undefined
              }}
            >
              {/* Decorative bubbles */}
              <div className="absolute top-[-10px] right-[-10px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
              <div className="absolute bottom-[-15px] left-[-15px] w-12 h-12 rounded-full opacity-10" style={{ backgroundColor: '#00A3A3' }}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-200">
                <div>
                  <h3 className="font-bold text-gray-900">{msg.from}</h3>
                  <p className="text-lg font-semibold text-gray-800 mt-1">{msg.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{msg.date}</p>
                  <p className="text-sm text-gray-500">{msg.time}</p>
                  {!msg.isRead && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 mt-3 leading-relaxed">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-15px] right-[-15px] w-28 h-28 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Send a Message</h2>
            <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>To</label>
              <select className="w-full px-3 py-2 border rounded-md" style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}>
                <option>Ms. Sarah (Lead Caregiver)</option>
                <option>Nurse Johnson</option>
                <option>All Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>Subject</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#212529' }}>Message</label>
              <textarea
                rows={5}
                className="w-full px-3 py-2 border rounded-md"
                style={{ borderColor: '#E0E0E0', backgroundColor: '#FFFFFF' }}
                placeholder="Type your message here..."
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md shadow-lg font-medium"
              style={{ backgroundColor: '#210a87' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a0870'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#210a87'}
            >
              Send Message
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
