"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";
import Input from "@/components/ui/Input";

interface Preferences {
  language: string;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
  currency: string;
  dashboardLayout: string;
  itemsPerPage: number;
  autoRefresh: boolean;
  showTooltips: boolean;
  compactMode: boolean;
}

export default function PreferencesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [preferences, setPreferences] = useState<Preferences>({
    language: "en",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    timezone: "Africa/Accra",
    currency: "GHS",
    dashboardLayout: "default",
    itemsPerPage: 10,
    autoRefresh: true,
    showTooltips: true,
    compactMode: false,
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

    // Load saved preferences from localStorage or API
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        console.error("Error loading preferences:", e);
      }
    }
  }, []);

  const handleChange = (field: keyof Preferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Save to localStorage (in production, save to API)
      localStorage.setItem("userPreferences", JSON.stringify(preferences));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess("Preferences saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save preferences");
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
              Preferences
            </h1>
            <p className="text-gray-600">
              Customize your application experience
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

          {/* Language & Region Section */}
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
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Language & Region
                </h2>
              </div>

              <div className="space-y-4">
                {/* Language */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Language
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) => handleChange("language", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Timezone
                  </label>
                  <select
                    value={preferences.timezone}
                    onChange={(e) => handleChange("timezone", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="Africa/Accra">Africa/Accra (GMT+0)</option>
                    <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                    <option value="Africa/Johannesburg">Africa/Johannesburg (GMT+2)</option>
                    <option value="UTC">UTC (GMT+0)</option>
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Currency
                  </label>
                  <select
                    value={preferences.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="GHS">Ghana Cedi (₵)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Format Section */}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Date & Time Format
                </h2>
              </div>

              <div className="space-y-4">
                {/* Date Format */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Date Format
                  </label>
                  <select
                    value={preferences.dateFormat}
                    onChange={(e) => handleChange("dateFormat", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY (e.g., 25/12/2024)</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY (e.g., 12/25/2024)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (e.g., 2024-12-25)</option>
                    <option value="DD MMM YYYY">DD MMM YYYY (e.g., 25 Dec 2024)</option>
                  </select>
                </div>

                {/* Time Format */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Time Format
                  </label>
                  <select
                    value={preferences.timeFormat}
                    onChange={(e) => handleChange("timeFormat", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="24h">24-hour (e.g., 14:30)</option>
                    <option value="12h">12-hour (e.g., 2:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Display & Layout Section */}
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
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Display & Layout
                </h2>
              </div>

              <div className="space-y-4">
                {/* Dashboard Layout */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Dashboard Layout
                  </label>
                  <select
                    value={preferences.dashboardLayout}
                    onChange={(e) => handleChange("dashboardLayout", e.target.value)}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="default">Default</option>
                    <option value="compact">Compact</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>

                {/* Items Per Page */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Items Per Page
                  </label>
                  <select
                    value={preferences.itemsPerPage}
                    onChange={(e) => handleChange("itemsPerPage", parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E0E0E0",
                      color: "#212529",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00A3A3";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 163, 163, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E0E0E0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                {/* Toggle Options */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F0F0F0" }}>
                    <div>
                      <span className="text-sm font-medium" style={{ color: "#212529" }}>
                        Auto Refresh
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Automatically refresh dashboard data
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={preferences.autoRefresh}
                      onChange={() => handleChange("autoRefresh", !preferences.autoRefresh)}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F0F0F0" }}>
                    <div>
                      <span className="text-sm font-medium" style={{ color: "#212529" }}>
                        Show Tooltips
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Display helpful tooltips on hover
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={preferences.showTooltips}
                      onChange={() => handleChange("showTooltips", !preferences.showTooltips)}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F0F0F0" }}>
                    <div>
                      <span className="text-sm font-medium" style={{ color: "#212529" }}>
                        Compact Mode
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Reduce spacing for more content
                      </p>
                    </div>
                    <ToggleSwitch
                      enabled={preferences.compactMode}
                      onChange={() => handleChange("compactMode", !preferences.compactMode)}
                    />
                  </div>
                </div>
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

