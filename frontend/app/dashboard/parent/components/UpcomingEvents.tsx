"use client";

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  type?: string;
}

interface UpcomingEventsProps {
  events?: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Mock events if none provided
  const displayEvents: Event[] = events || [
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
  ];

  const getBorderColor = (type?: string) => {
    switch (type) {
      case "meeting":
        return "#210a87";
      case "holiday":
        return "#00A3A3";
      case "event":
        return "#00A3A3";
      default:
        return "#E0E0E0";
    }
  };

  return (
    <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Decorative bubbles */}
      <div className="absolute top-[-12px] right-[-12px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute bottom-[-18px] left-[-18px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold mb-4 pb-3 border-b-2" style={{ color: '#212529', borderColor: '#00A3A3' }}>Upcoming Events</h3>
      <div className="space-y-3">
          {displayEvents.map((event, index) => (
            <div key={event.id} className={`border-l-4 pl-3 py-2 ${index !== displayEvents.length - 1 ? 'border-b' : ''}`} style={{ borderLeftColor: getBorderColor(event.type), borderBottomColor: index !== displayEvents.length - 1 ? '#E0E0E0' : 'transparent' }}>
              <p className="text-sm font-medium" style={{ color: '#212529' }}>{event.title}</p>
              <p className="text-xs mt-1" style={{ color: '#212529' }}>
              {event.date} {event.time && `at ${event.time}`}
            </p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

