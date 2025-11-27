"use client";

import Link from "next/link";

export default function NotFound() {
  // Available routes in the application
  const availableRoutes = [
    { path: "/", label: "Home", description: "Redirects to login" },
    { path: "/login", label: "Login", description: "Sign in to your account" },
    { path: "/signup", label: "Sign Up", description: "Create a new account" },
    { path: "/forgot-password", label: "Forgot Password", description: "Reset your password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-blue-400/15 rounded-full blur-3xl"></div>

      <div className="text-center relative z-10 max-w-4xl mx-auto">
        {/* 404 Number - Large and Bold */}
        <div className="mb-6">
          <h1 className="text-9xl sm:text-[12rem] font-bold text-white drop-shadow-2xl leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 max-w-md mx-auto leading-relaxed mb-6">
            Oops! The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Available Routes */}
        <div className="mb-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Available Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {availableRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="block p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 text-left"
              >
                <div className="font-bold text-white text-lg mb-1">
                  {route.label}
                </div>
                <div className="text-blue-100 text-sm mb-2">
                  {route.path}
                </div>
                <div className="text-blue-200 text-xs">
                  {route.description}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-all hover:scale-105 active:scale-95"
          >
            Go to Login
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 border-2 border-white"
          >
            Sign Up
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-transparent text-white font-bold rounded-lg shadow-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95 border-2 border-white"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
