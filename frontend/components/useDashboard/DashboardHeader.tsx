"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  user?: {
    email?: string;
    role?: string;
  };
  onLogout?: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const router = useRouter();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(user || null);

  useEffect(() => {
    // Get user from localStorage if not provided
    if (!currentUser) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        setCurrentUser({ email: "parent@example.com", role: "parent" });
      }
    }
  }, [currentUser]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 shadow-lg border-b w-full z-50" style={{ backgroundColor: '#210a87' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Side - Logo/Title */}
          <button
            onClick={() => router.push("/dashboard/parent")}
            className="flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <span className="text-xl font-bold text-white">CKA</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">Caritas Kiddie Academy</h1>
          </button>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 pl-10 pr-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#FFFFFF', width: '250px' }}
              />
              <svg className="absolute left-3 h-4 w-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotificationsDropdown(!showNotificationsDropdown);
                  setShowProfileDropdown(false);
                  setShowSettingsDropdown(false);
                }}
                className="relative p-2 text-white/90 hover:text-white rounded-lg transition-colors"
                style={{ backgroundColor: showNotificationsDropdown ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown Menu */}
              {showNotificationsDropdown && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-2xl border overflow-hidden z-50" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
                  <div className="p-4 border-b" style={{ borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' }}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold" style={{ color: '#212529' }}>Notifications</h3>
                      <button className="text-sm" style={{ color: '#00A3A3' }}>Mark all as read</button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { id: 1, title: "New message from caregiver", time: "2 min ago", unread: true },
                      { id: 2, title: "Payment reminder", time: "1 hour ago", unread: true },
                      { id: 3, title: "New photo uploaded", time: "3 hours ago", unread: false },
                      { id: 4, title: "Progress report available", time: "1 day ago", unread: false },
                    ].map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b cursor-pointer hover:bg-opacity-50 transition-colors"
                        style={{ 
                          borderColor: '#E0E0E0',
                          backgroundColor: notif.unread ? '#F8F9FA' : '#FFFFFF'
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: notif.unread ? '#00A3A3' : 'transparent' }}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium" style={{ color: '#212529' }}>{notif.title}</p>
                            <p className="text-xs mt-1" style={{ color: '#212529' }}>{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t text-center" style={{ borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' }}>
                    <button className="text-sm font-medium" style={{ color: '#00A3A3' }}>View All Notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettingsDropdown(!showSettingsDropdown);
                  setShowProfileDropdown(false);
                  setShowNotificationsDropdown(false);
                }}
                className="p-2 text-white/90 hover:text-white rounded-lg transition-colors"
                style={{ backgroundColor: showSettingsDropdown ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Settings Dropdown Menu */}
              {showSettingsDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-2xl border overflow-hidden z-50" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0' }}>
                  <div className="p-4 border-b" style={{ borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' }}>
                    <h3 className="font-bold" style={{ color: '#212529' }}>Settings</h3>
                  </div>
                  <div className="py-2">
                    {[
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        ), 
                        label: "Notifications", 
                        action: () => {
                          setShowSettingsDropdown(false);
                          router.push("/dashboard/parent/settings/notifications");
                        }
                      },
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                        ), 
                        label: "Preferences", 
                        action: () => {
                          setShowSettingsDropdown(false);
                          router.push("/dashboard/parent/settings/preferences");
                        }
                      },
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                        ), 
                        label: "Theme", 
                        action: () => {
                          setShowSettingsDropdown(false);
                          router.push("/dashboard/parent/settings/theme");
                        }
                      },
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ), 
                        label: "Privacy & Security", 
                        action: () => console.log("Privacy") 
                      },
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        ), 
                        label: "App Settings", 
                        action: () => console.log("App Settings") 
                      },
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ), 
                        label: "Help & Support", 
                        action: () => console.log("Help") 
                      },
                      { 
                        icon: (
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ), 
                        label: "About", 
                        action: () => console.log("About") 
                      },
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {item.icon}
                        <span className="text-sm" style={{ color: '#212529' }}>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowSettingsDropdown(false);
                  setShowNotificationsDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: showProfileDropdown ? 'rgba(255, 255, 255, 0.2)' : 'transparent' }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                  {currentUser?.email?.charAt(0).toUpperCase() || "P"}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">{currentUser?.email?.split("@")[0] || "Parent"}</p>
                  <p className="text-xs text-white/80">Parent</p>
                </div>
                <svg className="h-4 w-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg shadow-2xl border overflow-hidden z-50" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0E0E0', zIndex: 50 }}>
                  <div className="p-4 border-b" style={{ borderColor: '#E0E0E0', backgroundColor: '#F8F9FA' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold" style={{ backgroundColor: '#00A3A3', color: '#FFFFFF' }}>
                        {currentUser?.email?.charAt(0).toUpperCase() || "P"}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold" style={{ color: '#212529' }}>{currentUser?.email?.split("@")[0] || "Parent"}</p>
                        <p className="text-sm" style={{ color: '#212529' }}>{currentUser?.email || "parent@example.com"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowProfileDropdown(false);
                        router.push("/dashboard/parent/profile");
                      }}
                      className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors cursor-pointer"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00A3A3' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm" style={{ color: '#212529' }}>View Profile</span>
                    </button>
                    <div className="border-t my-1" style={{ borderColor: '#E0E0E0' }}></div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="w-full px-4 py-3 text-left flex items-center gap-3 transition-colors cursor-pointer"
                      style={{ backgroundColor: 'transparent' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8F9FA'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FF0000' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-sm font-medium" style={{ color: '#FF0000' }}>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showProfileDropdown || showSettingsDropdown || showNotificationsDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileDropdown(false);
            setShowSettingsDropdown(false);
            setShowNotificationsDropdown(false);
          }}
        ></div>
      )}
    </header>
  );
}

