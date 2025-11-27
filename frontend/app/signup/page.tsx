"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CopyrightFooter from "@/components/CopyrightFooter";

interface SignupFormData {
  full_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    full_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:1144/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Redirect to login on success
      router.push("/login?signup=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 px-3 sm:px-4 py-2 sm:py-2 md:py-3 lg:py-2 xl:py-5 2xl:py-8">
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen py-4">
      {/* Centered Rounded Card */}
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl flex flex-col lg:flex-row gap-2 xl:gap-3 mb-1 sm:mb-2 lg:mb-2">
        {/* Left Section - Welcome/Blue Part (2/5 of card) - Hidden on mobile */}
        <div className="hidden lg:flex w-full lg:w-2/5 relative bg-blue-600 flex-col overflow-hidden rounded-lg md:rounded-xl xl:rounded-2xl shadow-2xl">
          {/* Header Image - Full width, extends to top */}
          <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-96 xl:h-[450px] 2xl:h-[550px]">
            <Image
              src="/images/headerkids.jpg"
              alt="Caritas Kiddie Academy"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* 3D Sphere 1 - Large, partially obscures right edge of text */}
          <div 
            className="hidden md:block absolute top-1/4 right-[-80px] w-80 h-80 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.8) 40%, rgba(29, 78, 216, 0.7) 70%, rgba(30, 64, 175, 0.6) 100%)',
              boxShadow: 'inset -20px -20px 40px rgba(0, 0, 0, 0.3), 20px 20px 40px rgba(0, 0, 0, 0.2)',
            }}
          ></div>
          
          {/* 3D Sphere 2 - Bottom-left, overlapping boundary */}
          <div 
            className="hidden md:block absolute bottom-[-60px] left-[-40px] w-72 h-72 rounded-full"
            style={{
              background: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.85) 0%, rgba(37, 99, 235, 0.75) 40%, rgba(29, 78, 216, 0.65) 70%, rgba(30, 64, 175, 0.55) 100%)',
              boxShadow: 'inset -15px -15px 35px rgba(0, 0, 0, 0.3), 15px 15px 35px rgba(0, 0, 0, 0.2)',
            }}
          ></div>
          
          {/* 3D Sphere 3 - Bottom-left, overlapping boundary */}
          <div 
            className="hidden md:block absolute bottom-[-40px] left-20 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.7) 40%, rgba(29, 78, 216, 0.6) 70%, rgba(30, 64, 175, 0.5) 100%)',
              boxShadow: 'inset -12px -12px 30px rgba(0, 0, 0, 0.3), 12px 12px 30px rgba(0, 0, 0, 0.2)',
            }}
          ></div>
          
          {/* Content - Pushed Down */}
          <div className="relative z-10 text-white text-center px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-2 sm:pb-3 md:pb-4 lg:pb-8 xl:pb-10 2xl:pb-16 pt-2 sm:pt-2 md:pt-2 lg:pt-4">
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-8xl xl:text-5xl 2xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-1 lg:mb-5 xl:mb-3 2xl:mb-4 uppercase tracking-tight">JOIN US</h1>
            <h2 className="text-base sm:text-base md:text-lg lg:text-5xl xl:text-2xl 2xl:text-3xl font-bold mb-1 sm:mb-1 md:mb-1.5 lg:mb-5 xl:mb-4 2xl:mb-5 uppercase tracking-wide">Caritas Kiddie Academy</h2>
            <p className="text-[10px] sm:text-[10px] md:text-xs lg:text-2xl xl:text-base 2xl:text-lg text-blue-100 leading-relaxed max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-xl xl:max-w-md 2xl:max-w-lg mx-auto opacity-90 px-2 sm:px-0">
              Create your account to access our comprehensive school management system and stay connected with students, parents, teachers and administrators.
            </p>
          </div>
        </div>

        {/* Right Section - Sign Up Form/White Part (3/5 of card) */}
        <div className="w-full lg:w-3/5 bg-white lg:bg-white pt-0 sm:pt-0 md:pt-5 lg:pt-4 xl:pt-12 2xl:pt-16 pb-4 sm:pb-4 md:pb-5 lg:pb-4 xl:pb-12 2xl:pb-16 px-4 sm:px-4 md:px-5 lg:px-5 xl:px-12 2xl:px-16 flex flex-col lg:justify-start xl:justify-center relative rounded-xl md:rounded-xl xl:rounded-2xl shadow-2xl lg:shadow-2xl">
          {/* Mobile Header - Only visible on mobile - Extended to top and full width */}
          <div className="lg:hidden absolute top-0 left-0 right-0 w-full h-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/headerkids.jpg"
                alt="Caritas Kiddie Academy"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/80 to-blue-800/80"></div>
            
            {/* Decorative circles for mobile */}
            <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-blue-500 rounded-full opacity-30 z-10"></div>
            <div className="absolute bottom-[-15px] left-[-15px] w-20 h-20 bg-blue-400 rounded-full opacity-25 z-10"></div>
            
            {/* School branding */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-xl font-bold mb-1 uppercase tracking-tight">Caritas Kiddie Academy</h1>
              <p className="text-xs text-blue-100 opacity-90 text-center">Create Account</p>
            </div>
          </div>
          
          {/* Small blue quarter-circle in bottom-right corner - Hidden on mobile */}
          <div className="hidden sm:block absolute bottom-0 right-0 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 bg-blue-600 rounded-tl-full"></div>
          
          <div className="max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto w-full relative z-10 lg:pt-0 pt-36 lg:py-2">
            {/* Header */}
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1 md:mb-1 lg:mb-0.5 xl:mb-3 2xl:mb-4">Sign up</h2>
            <p className="text-gray-600 mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-7 2xl:mb-9 text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-base 2xl:text-lg">
              Create your account to get started
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-2 sm:px-3 md:px-3 lg:px-2 xl:px-5 2xl:px-6 py-1.5 sm:py-2 md:py-2 lg:py-1.5 xl:py-3.5 2xl:py-4 rounded-md sm:rounded-lg mb-2 sm:mb-3 md:mb-4 lg:mb-2 xl:mb-6 text-[10px] sm:text-xs md:text-xs lg:text-[10px] xl:text-base 2xl:text-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-2 xl:space-y-4 2xl:space-y-5">
              {/* Full Name Input */}
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-lg font-medium text-gray-700 mb-1 sm:mb-1.5 lg:mb-1 xl:mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 lg:pl-2.5 xl:pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="block w-full pl-7 sm:pl-8 md:pl-9 lg:pl-8 xl:pl-12 2xl:pl-14 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3 2xl:py-4 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-lg font-medium text-gray-700 mb-1 sm:mb-1.5 lg:mb-1 xl:mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 lg:pl-2.5 xl:pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-7 sm:pl-8 md:pl-9 lg:pl-8 xl:pl-12 2xl:pl-14 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3 2xl:py-4 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-base 2xl:text-lg font-medium text-gray-700 mb-1 sm:mb-1.5 lg:mb-1 xl:mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 lg:pl-2.5 xl:pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-7 sm:pl-8 md:pl-9 lg:pl-8 xl:pl-12 2xl:pl-14 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3 2xl:py-4 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Username"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-base 2xl:text-lg font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-1 lg:mb-1 xl:mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 md:pl-3 lg:pl-2.5 xl:pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-7 sm:pl-8 md:pl-9 lg:pl-8 xl:pl-12 2xl:pl-14 pr-10 sm:pr-12 md:pr-14 lg:pr-12 xl:pr-20 2xl:pr-24 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3 2xl:py-4 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-base 2xl:text-lg font-medium text-gray-700 mb-0.5 sm:mb-1 md:mb-1 lg:mb-1 xl:mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-2.5 md:pl-3 lg:pl-2.5 xl:pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirm_password}
                    onChange={handleChange}
                    className="block w-full pl-7 sm:pl-8 md:pl-9 lg:pl-8 xl:pl-12 2xl:pl-14 pr-10 sm:pr-12 md:pr-14 lg:pr-12 xl:pr-20 2xl:pr-24 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3 2xl:py-4 text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg border border-gray-300 rounded-md bg-gray-200 focus:outline-none focus:border-blue-500"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 md:pr-3 lg:pr-2.5 xl:pr-4 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                    )}
                  </button>
                </div>
              </div>

              {/* Primary Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 sm:py-2 md:py-2.5 lg:py-2 xl:py-4 2xl:py-5 px-3 sm:px-3 md:px-4 lg:px-3 xl:px-6 2xl:px-8 border border-blue-600 rounded-md shadow-sm text-[11px] sm:text-xs md:text-xs lg:text-[11px] xl:text-base 2xl:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-3"
              >
                {isLoading ? "Creating Account..." : "Sign up"}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-sm">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center pt-1 sm:pt-1 md:pt-1.5 lg:pt-1.5 xl:pt-2">
                <p className="text-[10px] sm:text-xs md:text-xs lg:text-[10px] xl:text-base 2xl:text-lg text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto mt-2 sm:mt-3 lg:mt-2 xl:mt-4 2xl:mt-6">
        <CopyrightFooter />
      </div>
      </div>
    </div>
  );
}

