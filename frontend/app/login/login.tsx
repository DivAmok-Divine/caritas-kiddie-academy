"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { LoginCredentials, LoginResponse, AuthError } from "@/types/auth";
import CopyrightFooter from "@/components/CopyrightFooter";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon } from "@/components/ui/Icons";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginCredentials>({
    username_or_email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    try {
      const response = await fetch("http://localhost:1144/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse | AuthError = await response.json();

      if (!response.ok) {
        const errorData = data as AuthError;
        throw new Error(errorData.message || "Login failed");
      }

      const successData = data as LoginResponse;
      
      // Store token if provided
      if (successData.token) {
        localStorage.setItem("token", successData.token);
        localStorage.setItem("user", JSON.stringify(successData.user));
      }
      
      // Redirect based on user role
      const dashboardPath = `/dashboard/${successData.user.role}`;
      router.push(dashboardPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 px-3 sm:px-4 py-2 sm:py-2 md:py-3 lg:py-3 xl:py-5 2xl:py-8 overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
      {/* Centered Rounded Card */}
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl flex flex-col lg:flex-row gap-2 xl:gap-3 mb-1 sm:mb-2 lg:mb-2">
        {/* Left Section - Welcome/Blue Part (2/5 of card) - Hidden on mobile */}
        <div className="hidden lg:flex w-full lg:w-2/5 relative bg-blue-600 flex-col overflow-hidden rounded-lg md:rounded-xl xl:rounded-2xl shadow-2xl">
          {/* Header Image - Full width, extends to top */}
          <div className="relative w-full h-40 sm:h-44 md:h-48 lg:h-80 xl:h-96 2xl:h-[500px]">
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
            <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-1 lg:mb-3 xl:mb-3 2xl:mb-4 uppercase tracking-tight">WELCOME</h1>
            <h2 className="text-base sm:text-base md:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold mb-1 sm:mb-1 md:mb-1.5 lg:mb-3 xl:mb-4 2xl:mb-5 uppercase tracking-wide">Caritas Kiddie Academy</h2>
            <p className="text-[10px] sm:text-[10px] md:text-xs lg:text-base xl:text-base 2xl:text-lg text-blue-100 leading-relaxed max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md xl:max-w-md 2xl:max-w-lg mx-auto opacity-90 px-2 sm:px-0">
              Your comprehensive school management system designed to provide communication, and provide seamless access to academic information for 
              students, parents, teachers and administrators.
            </p>
          </div>
        </div>

        {/* Right Section - Sign In/White Part (3/5 of card) */}
        <div className="w-full lg:w-3/5 bg-white lg:bg-white pt-0 sm:pt-0 md:pt-5 lg:pt-6 xl:pt-12 2xl:pt-16 pb-4 sm:pb-4 md:pb-5 lg:pb-6 xl:pb-12 2xl:pb-16 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-12 2xl:px-16 flex flex-col justify-center relative rounded-xl md:rounded-xl xl:rounded-2xl shadow-2xl lg:shadow-2xl overflow-hidden">
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
              <p className="text-xs text-blue-100 opacity-90 text-center">School Management System</p>
            </div>
          </div>
          
          {/* Small blue quarter-circle in bottom-right corner - Hidden on mobile */}
          <div className="hidden sm:block absolute bottom-0 right-0 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 bg-blue-600 rounded-tl-full"></div>
          
          <div className="max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto w-full relative z-10 lg:pt-0 pt-36">
            {/* Header */}
            <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1 md:mb-1 lg:mb-1 xl:mb-3 2xl:mb-4">Sign in</h2>
            <p className="text-gray-600 mb-2 sm:mb-2 md:mb-3 lg:mb-3 xl:mb-7 2xl:mb-9 text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-base 2xl:text-lg">
              Enter your credentials to access your account
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-2 sm:px-3 md:px-3 lg:px-3 xl:px-5 2xl:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2 xl:py-3.5 2xl:py-4 rounded-md sm:rounded-lg mb-2 sm:mb-3 md:mb-4 lg:mb-4 xl:mb-6 text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-base 2xl:text-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-2.5 md:space-y-3 lg:space-y-3 xl:space-y-5 2xl:space-y-7">
              {/* Username or Email Input */}
              <Input
                id="username_or_email"
                name="username_or_email"
                type="text"
                label="Username or Email"
                leftIcon={<UserIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 xl:h-6 xl:w-6" />}
                autoComplete="username"
                required
                value={formData.username_or_email}
                onChange={handleChange}
                placeholder="Enter username or email"
              />

              {/* Password Input */}
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                leftIcon={<LockIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-6 xl:w-6" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-6 xl:w-6" /> : <EyeIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 lg:h-4 lg:w-4 xl:h-6 xl:w-6" />}
                  </button>
                }
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />

              {/* Options Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-0">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-3.5 lg:w-3.5 xl:h-5 xl:w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-1.5 sm:ml-2 md:ml-2 lg:ml-2 xl:ml-3 block text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-base 2xl:text-lg text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-base 2xl:text-lg">
                  <a
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Primary Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-2 sm:mt-2 md:mt-3 lg:mt-3 xl:mt-5 2xl:mt-7 text-center text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-lg text-gray-600">
              <p>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Footer */}
      <CopyrightFooter />
      </div>
    </div>
  );
}
