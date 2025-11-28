"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/useDashboard/DashboardHeader";

interface ThemeSettings {
  mode: "light" | "dark" | "auto";
  accentColor: string;
  fontSize: "small" | "medium" | "large";
  borderRadius: "none" | "small" | "medium" | "large";
  animations: boolean;
  highContrast: boolean;
}

const accentColorOptions = [
  { name: "Vibrant Teal", value: "#00A3A3", label: "Default" },
  { name: "Deep Blue", value: "#210a87", label: "Primary" },
  { name: "Ocean Blue", value: "#0066CC", label: "Ocean" },
  { name: "Emerald Green", value: "#10B981", label: "Emerald" },
  { name: "Purple", value: "#8B5CF6", label: "Purple" },
  { name: "Rose", value: "#F43F5E", label: "Rose" },
  { name: "Amber", value: "#F59E0B", label: "Amber" },
];

export default function ThemePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<ThemeSettings>({
    mode: "light",
    accentColor: "#00A3A3",
    fontSize: "medium",
    borderRadius: "medium",
    animations: true,
    highContrast: false,
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

    // Load saved theme from localStorage or API
    const savedTheme = localStorage.getItem("themeSettings");
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme));
      } catch (e) {
        console.error("Error loading theme settings:", e);
      }
    }
  }, []);

  const handleChange = (field: keyof ThemeSettings, value: any) => {
    setTheme((prev) => ({
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
      localStorage.setItem("themeSettings", JSON.stringify(theme));

      // Apply theme to document (for preview)
      document.documentElement.style.setProperty("--accent-color", theme.accentColor);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSuccess("Theme settings saved successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save theme settings");
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
        backgroundColor: enabled ? theme.accentColor : "#D1D5DB",
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

  const ColorOption = ({
    color,
    name,
    label,
    selected,
    onClick,
  }: {
    color: string;
    name: string;
    label: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-lg border-2 transition-all ${
        selected ? "ring-2 ring-offset-2" : ""
      }`}
      style={{
        backgroundColor: color,
        borderColor: selected ? color : "#E0E0E0",
        boxShadow: selected ? `0 0 0 2px ${color}20` : "none",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.transform = "scale(1.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "#E0E0E0";
          e.currentTarget.style.transform = "scale(1)";
        }
      }}
    >
      {selected && (
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      <div className="mt-2 text-center">
        <p className="text-xs font-medium text-white" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
          {name}
        </p>
        {label && (
          <p className="text-xs text-white/80 mt-1" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}>
            {label}
          </p>
        )}
      </div>
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
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: theme.accentColor }}></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ backgroundColor: '#210a87' }}></div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: "#212529" }}>
              Theme Settings
            </h1>
            <p className="text-gray-600">
              Customize the appearance of your dashboard
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
              style={{ backgroundColor: "#D4EDDA", borderColor: theme.accentColor }}
            >
              <p className="text-sm" style={{ color: theme.accentColor }}>
                {success}
              </p>
            </div>
          )}

          {/* Theme Mode Section */}
          <div
            className="mb-6 rounded-lg shadow-md p-6 relative overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-2xl" style={{ backgroundColor: theme.accentColor }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: theme.accentColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Theme Mode
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "light", label: "Light", icon: "☀️", desc: "Bright and clean" },
                  { value: "dark", label: "Dark", icon: "🌙", desc: "Easy on the eyes" },
                  { value: "auto", label: "Auto", icon: "🔄", desc: "Follow system" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange("mode", option.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      theme.mode === option.value
                        ? "ring-2 ring-offset-2"
                        : "hover:border-gray-300"
                    }`}
                    style={{
                      backgroundColor: theme.mode === option.value ? `${theme.accentColor}10` : "#FFFFFF",
                      borderColor: theme.mode === option.value ? theme.accentColor : "#E0E0E0",
                      boxShadow: theme.mode === option.value ? `0 0 0 2px ${theme.accentColor}20` : "none",
                    }}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium" style={{ color: "#212529" }}>
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Accent Color Section */}
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
                  style={{ color: theme.accentColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Accent Color
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accentColorOptions.map((option) => (
                  <ColorOption
                    key={option.value}
                    color={option.value}
                    name={option.name}
                    label={option.label}
                    selected={theme.accentColor === option.value}
                    onClick={() => handleChange("accentColor", option.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Typography & Spacing Section */}
          <div
            className="mb-6 rounded-lg shadow-md p-6 relative overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-2xl" style={{ backgroundColor: theme.accentColor }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: theme.accentColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Typography & Spacing
                </h2>
              </div>

              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Font Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "small", label: "Small", size: "text-sm" },
                      { value: "medium", label: "Medium", size: "text-base" },
                      { value: "large", label: "Large", size: "text-lg" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange("fontSize", option.value)}
                        className={`p-3 rounded-md border-2 transition-all ${
                          theme.fontSize === option.value ? "ring-2 ring-offset-1" : ""
                        }`}
                        style={{
                          backgroundColor: theme.fontSize === option.value ? `${theme.accentColor}10` : "#FFFFFF",
                          borderColor: theme.fontSize === option.value ? theme.accentColor : "#E0E0E0",
                          boxShadow: theme.fontSize === option.value ? `0 0 0 2px ${theme.accentColor}20` : "none",
                        }}
                      >
                        <div className={`${option.size} font-medium`} style={{ color: "#212529" }}>
                          {option.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#212529" }}>
                    Border Radius
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: "none", label: "None", radius: "rounded-none" },
                      { value: "small", label: "Small", radius: "rounded-sm" },
                      { value: "medium", label: "Medium", radius: "rounded-md" },
                      { value: "large", label: "Large", radius: "rounded-lg" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange("borderRadius", option.value)}
                        className={`p-3 border-2 transition-all ${
                          theme.borderRadius === option.value ? "ring-2 ring-offset-1" : ""
                        } ${option.radius}`}
                        style={{
                          backgroundColor: theme.borderRadius === option.value ? `${theme.accentColor}10` : "#FFFFFF",
                          borderColor: theme.borderRadius === option.value ? theme.accentColor : "#E0E0E0",
                          boxShadow: theme.borderRadius === option.value ? `0 0 0 2px ${theme.accentColor}20` : "none",
                        }}
                      >
                        <div className="text-sm font-medium" style={{ color: "#212529" }}>
                          {option.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
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
                  style={{ color: theme.accentColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Accessibility
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F0F0F0" }}>
                  <div>
                    <span className="text-sm font-medium" style={{ color: "#212529" }}>
                      Animations
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Enable smooth transitions and animations
                    </p>
                  </div>
                  <ToggleSwitch
                    enabled={theme.animations}
                    onChange={() => handleChange("animations", !theme.animations)}
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: "#F0F0F0" }}>
                  <div>
                    <span className="text-sm font-medium" style={{ color: "#212529" }}>
                      High Contrast
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <ToggleSwitch
                    enabled={theme.highContrast}
                    onChange={() => handleChange("highContrast", !theme.highContrast)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className="mb-6 rounded-lg shadow-md p-6 relative overflow-hidden"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 blur-2xl" style={{ backgroundColor: theme.accentColor }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: '#E0E0E0' }}>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: theme.accentColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <h2 className="text-xl font-bold" style={{ color: "#212529" }}>
                  Preview
                </h2>
              </div>

              <div className="p-4 rounded-lg border" style={{ backgroundColor: "#F8F9FA", borderColor: "#E0E0E0" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    CKA
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: "#212529" }}>
                      Sample Card
                    </div>
                    <div className="text-sm text-gray-500">
                      This is how your theme will look
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md font-medium transition-colors"
                  style={{
                    backgroundColor: theme.accentColor,
                    color: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  Sample Button
                </button>
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

