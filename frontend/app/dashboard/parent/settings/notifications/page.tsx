"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

interface NotificationSettings {
  email: {
    careLogUpdates: boolean;
    paymentReminders: boolean;
    announcements: boolean;
    events: boolean;
    progressReports: boolean;
    messages: boolean;
  };
  push: {
    careLogUpdates: boolean;
    paymentReminders: boolean;
    announcements: boolean;
    events: boolean;
    progressReports: boolean;
    messages: boolean;
  };
  sms: {
    paymentReminders: boolean;
    urgentAnnouncements: boolean;
  };
}

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      careLogUpdates: true,
      paymentReminders: true,
      announcements: true,
      events: true,
      progressReports: true,
      messages: true,
    },
    push: {
      careLogUpdates: true,
      paymentReminders: true,
      announcements: true,
      events: true,
      progressReports: false,
      messages: true,
    },
    sms: {
      paymentReminders: true,
      urgentAnnouncements: true,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      setUser({ email: "parent@example.com", role: "parent" });
    }

    // Load saved settings from localStorage or API
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Error loading notification settings:", e);
      }
    }
  }, []);

  const handleToggle = (
    category: keyof NotificationSettings,
    setting: string
  ) => {
    setSettings((prev) => {
      const categorySettings = prev[category];
      if (categorySettings && setting in categorySettings) {
        return {
          ...prev,
          [category]: {
            ...categorySettings,
            [setting]: !categorySettings[setting as keyof typeof categorySettings],
          },
        };
      }
      return prev;
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Save to localStorage (in production, save to API)
      localStorage.setItem("notificationSettings", JSON.stringify(settings));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess("Notification settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save notification settings");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: () => void;
  }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        enabled ? "bg-[#00A3A3]" : "bg-gray-300"
      }`}
      style={{
        backgroundColor: enabled ? "#00A3A3" : "#D1D5DB",
      }}
      onMouseEnter={(e) => {
        if (!enabled) {
          e.currentTarget.style.backgroundColor = "#9CA3AF";
        }
      }}
      onMouseLeave={(e) => {
        if (!enabled) {
          e.currentTarget.style.backgroundColor = "#D1D5DB";
        }
      }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F8F9FA" }}>
      <DashboardHeader user={user} />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pt-24">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 px-4 py-2 rounded-md transition-colors shadow-md"
          style={{ color: "#FFFFFF", backgroundColor: "#210a87" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a0870")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#210a87")}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: '#210a87' }}></div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#212529" }}>
              Notification Settings
            </h1>
            <p className="text-gray-600">
              Manage how and when you receive notifications
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div
              className="mb-6 p-4 rounded-lg border"
              style={{ backgroundColor: "#FFE5E5", borderColor: "#FF0000" }}
            >
              <p className="text-sm" style={{ color: "#FF0000" }}>
                {error}
              </p>
            </div>
          )}

          {success && (
            <div
              className="mb-6 p-4 rounded-lg border"
              style={{ backgroundColor: "#D4EDDA", borderColor: "#00A3A3" }}
            >
              <p className="text-sm" style={{ color: "#00A3A3" }}>
                {success}
              </p>
            </div>
          )}

          {/* Email Notifications Section */}
          <div
            className="mb-6 rounded-lg shadow-md p-6 relative overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-2xl" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#00A3A3" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Email Notifications
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: "careLogUpdates", label: "Daily Care Log Updates" },
                  { key: "paymentReminders", label: "Payment Reminders" },
                  { key: "announcements", label: "Announcements" },
                  { key: "events", label: "Upcoming Events" },
                  { key: "progressReports", label: "Progress Reports" },
                  { key: "messages", label: "Messages from Teachers" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: "#F0F0F0" }}
                  >
                    <span className="text-sm" style={{ color: "#212529" }}>
                      {item.label}
                    </span>
                    <ToggleSwitch
                      enabled={settings.email[item.key as keyof typeof settings.email]}
                      onChange={() => handleToggle("email", item.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Push Notifications Section */}
          <div
            className="mb-6 rounded-lg shadow-md p-6 relative overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-2xl" style={{ backgroundColor: '#210a87' }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#00A3A3" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Push Notifications
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: "careLogUpdates", label: "Daily Care Log Updates" },
                  { key: "paymentReminders", label: "Payment Reminders" },
                  { key: "announcements", label: "Announcements" },
                  { key: "events", label: "Upcoming Events" },
                  { key: "progressReports", label: "Progress Reports" },
                  { key: "messages", label: "Messages from Teachers" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: "#F0F0F0" }}
                  >
                    <span className="text-sm" style={{ color: "#212529" }}>
                      {item.label}
                    </span>
                    <ToggleSwitch
                      enabled={settings.push[item.key as keyof typeof settings.push]}
                      onChange={() => handleToggle("push", item.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SMS Notifications Section */}
          <div
            className="mb-6 rounded-lg shadow-md p-6 relative overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-2xl" style={{ backgroundColor: '#00A3A3' }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#00A3A3" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  SMS Notifications
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { key: "paymentReminders", label: "Payment Reminders" },
                  { key: "urgentAnnouncements", label: "Urgent Announcements" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: "#F0F0F0" }}
                  >
                    <span className="text-sm" style={{ color: "#212529" }}>
                      {item.label}
                    </span>
                    <ToggleSwitch
                      enabled={settings.sms[item.key as keyof typeof settings.sms]}
                      onChange={() => handleToggle("sms", item.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 rounded-md font-medium shadow-md transition-colors"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#212529",
                border: "2px solid #E0E0E0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F8F9FA";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FFFFFF";
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="px-6 py-3 rounded-md font-medium shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isLoading ? "#9CA3AF" : "#210a87",
                color: "#FFFFFF",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#1a0870";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = "#210a87";
                }
              }}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

