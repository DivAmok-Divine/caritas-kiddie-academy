"use client";

interface CareLog {
  date: string;
  feeding_times: Array<{ time: string; type: string; amount: string }>;
  diaper_changes: Array<{ time: string; type: string }>;
  nap_times: Array<{ start: string; end: string; duration: number }>;
  activities: Array<{ name: string; duration: number }>;
  mood: string;
  notes?: string;
}

interface TodayCareLogProps {
  careLog: CareLog | null;
}

export default function TodayCareLog({ careLog }: TodayCareLogProps) {
  // Hardcoded fallback data if careLog is null
  const displayCareLog = careLog || {
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
    notes: "Child had a great day! Very active and playful.",
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "😊";
      case "content":
        return "🙂";
      case "fussy":
        return "😟";
      case "crying":
        return "😢";
      case "sleepy":
        return "😴";
      case "playful":
        return "😄";
      default:
        return "🙂";
    }
  };

  return (
    <div className="rounded-lg shadow-xl border p-6 relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Decorative bubbles */}
      <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: '#00A3A3' }}></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4 pb-4 border-b-2" style={{ borderColor: '#00A3A3' }}>
          <h3 className="text-lg font-bold" style={{ color: '#212529' }}>Today's Care Log</h3>
          <span className="text-sm px-3 py-1 rounded-full" style={{ color: '#212529', backgroundColor: '#E0E0E0' }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </span>
      </div>

        <div className="space-y-4">
          {/* Feeding Times */}
        <div className="pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#212529' }}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Feeding Times
            </h4>
          <div className="rounded-lg p-3 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
              {displayCareLog.feeding_times.length > 0 ? (
                <div className="space-y-2">
                  {displayCareLog.feeding_times.map((feeding, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b last:border-b-0" style={{ borderColor: '#E0E0E0' }}>
                      <span className="flex items-center gap-2" style={{ color: '#212529' }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00A3A3' }}></span>
                        {feeding.time}
                      </span>
                      <span className="font-medium" style={{ color: '#212529' }}>{feeding.type} - {feeding.amount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#212529' }}>No feeding records yet</p>
              )}
            </div>
          </div>

          {/* Diaper Changes */}
          <div className="pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#212529' }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Diaper Changes
            </h4>
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
              {displayCareLog.diaper_changes.length > 0 ? (
                <div className="space-y-2">
                  {displayCareLog.diaper_changes.map((diaper, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b last:border-b-0" style={{ borderColor: '#E0E0E0' }}>
                      <span className="flex items-center gap-2" style={{ color: '#212529' }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00A3A3' }}></span>
                        {diaper.time}
                      </span>
                      <span className="font-medium" style={{ color: '#212529' }}>{diaper.type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#212529' }}>No diaper change records yet</p>
              )}
            </div>
          </div>

          {/* Nap Times */}
          <div className="pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#212529' }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Nap Times
            </h4>
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
              {displayCareLog.nap_times.length > 0 ? (
                <div className="space-y-2">
                  {displayCareLog.nap_times.map((nap, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b last:border-b-0" style={{ borderColor: '#E0E0E0' }}>
                      <span className="flex items-center gap-2" style={{ color: '#212529' }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00A3A3' }}></span>
                        {nap.start} - {nap.end}
                      </span>
                      <span className="font-medium" style={{ color: '#212529' }}>{nap.duration} minutes</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#212529' }}>No nap records yet</p>
              )}
            </div>
          </div>

          {/* Activities */}
          <div className="pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#212529' }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Activities
            </h4>
            <div className="rounded-lg p-3 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
              {displayCareLog.activities.length > 0 ? (
                <div className="space-y-2">
                  {displayCareLog.activities.map((activity, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm py-1 border-b last:border-b-0" style={{ borderColor: '#E0E0E0' }}>
                      <span className="flex items-center gap-2" style={{ color: '#212529' }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00A3A3' }}></span>
                        {activity.name}
                      </span>
                      <span className="font-medium" style={{ color: '#212529' }}>{activity.duration} min</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm" style={{ color: '#212529' }}>No activities recorded yet</p>
              )}
            </div>
          </div>

          {/* Mood & Notes */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#212529' }}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mood & Notes
            </h4>
            <div className="rounded-lg p-4 border relative overflow-hidden" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
              {/* Small decorative circles */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: '#00A3A3' }}>
                  <span className="text-sm font-medium capitalize" style={{ color: '#212529' }}>{displayCareLog.mood}</span>
                  <span className="text-2xl">{getMoodEmoji(displayCareLog.mood)}</span>
                </div>
                {displayCareLog.notes && (
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: '#212529' }}>{displayCareLog.notes}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}

