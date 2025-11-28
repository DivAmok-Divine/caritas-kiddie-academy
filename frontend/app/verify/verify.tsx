"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CopyrightFooter from "@/components/CopyrightFooter";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { DocumentIcon, CheckCircleIcon } from "@/components/ui/Icons";

interface VerificationFormData {
  child_enrollment_code: string;
  verification_code: string;
}

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<VerificationFormData>({
    child_enrollment_code: "",
    verification_code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signupData, setSignupData] = useState<any>(null);

  useEffect(() => {
    // Get signup data from sessionStorage
    const storedSignupData = sessionStorage.getItem("signupData");
    if (storedSignupData) {
      setSignupData(JSON.parse(storedSignupData));
    }
    // Allow viewing the page even without signup data (for testing/preview)
  }, [router]);

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

    if (!signupData) {
      setError("Signup data not found. Please start over.");
      setIsLoading(false);
      return;
    }

    try {
      // First, verify the codes
      const verifyResponse = await fetch("http://localhost:1144/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupData.email,
          child_enrollment_code: formData.child_enrollment_code,
          verification_code: formData.verification_code,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.message || "Verification failed");
      }

      // If verification successful, create the account
      const signupResponse = await fetch("http://localhost:1144/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...signupData,
          child_enrollment_code: formData.child_enrollment_code,
          verification_code: formData.verification_code,
        }),
      });

      const signupResult = await signupResponse.json();

      if (!signupResponse.ok) {
        throw new Error(signupResult.message || "Account creation failed");
      }

      // Clear signup data from sessionStorage
      sessionStorage.removeItem("signupData");

      // Redirect to login on success
      router.push("/login?signup=success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Allow viewing the page even without signup data

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
              <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-8xl xl:text-5xl 2xl:text-6xl font-bold mb-0.5 sm:mb-1 md:mb-1 lg:mb-5 xl:mb-3 2xl:mb-4 uppercase tracking-tight">VERIFY</h1>
              <h2 className="text-base sm:text-base md:text-lg lg:text-5xl xl:text-2xl 2xl:text-3xl font-bold mb-1 sm:mb-1 md:mb-1.5 lg:mb-5 xl:mb-4 2xl:mb-5 uppercase tracking-wide">Your Account</h2>
              <p className="text-[10px] sm:text-[10px] md:text-xs lg:text-2xl xl:text-base 2xl:text-lg text-blue-100 leading-relaxed max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-xl xl:max-w-md 2xl:max-w-lg mx-auto opacity-90 px-2 sm:px-0">
                Please verify your child's enrollment code and email verification code to complete your account registration.
              </p>
            </div>
          </div>

          {/* Right Section - Verification Form/White Part (3/5 of card) */}
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
                <p className="text-xs text-blue-100 opacity-90 text-center">Verify Account</p>
              </div>
            </div>
            
            {/* Small blue quarter-circle in bottom-right corner - Hidden on mobile */}
            <div className="hidden sm:block absolute bottom-0 right-0 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 bg-blue-600 rounded-tl-full"></div>
            
            <div className="max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto w-full relative z-10 lg:pt-0 pt-36 lg:py-2">
              {/* Header */}
              <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-0.5 sm:mb-1 md:mb-1 lg:mb-0.5 xl:mb-3 2xl:mb-4">Verify Your Account</h2>
              <p className="text-gray-600 mb-2 sm:mb-2 md:mb-3 lg:mb-2 xl:mb-7 2xl:mb-9 text-[10px] sm:text-[10px] md:text-xs lg:text-xs xl:text-base 2xl:text-lg">
                Enter your child enrollment code and email verification code
              </p>

              {!signupData && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-2 sm:px-3 md:px-3 lg:px-2 xl:px-5 2xl:px-6 py-1.5 sm:py-2 md:py-2 lg:py-1.5 xl:py-3.5 2xl:py-4 rounded-md sm:rounded-lg mb-2 sm:mb-3 md:mb-4 lg:mb-2 xl:mb-6 text-[10px] sm:text-xs md:text-xs lg:text-[10px] xl:text-base 2xl:text-lg">
                  <p className="font-semibold mb-1">No signup data found</p>
                  <p>This page is for verifying your account. Please complete the signup process first.</p>
                  <Link
                    href="/signup"
                    className="underline mt-2 inline-block"
                  >
                    Go to Sign Up →
                  </Link>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-2 sm:px-3 md:px-3 lg:px-2 xl:px-5 2xl:px-6 py-1.5 sm:py-2 md:py-2 lg:py-1.5 xl:py-3.5 2xl:py-4 rounded-md sm:rounded-lg mb-2 sm:mb-3 md:mb-4 lg:mb-2 xl:mb-6 text-[10px] sm:text-xs md:text-xs lg:text-[10px] xl:text-base 2xl:text-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-2 xl:space-y-4 2xl:space-y-5">
                {/* Child Enrollment Code Input */}
                <Input
                      id="child_enrollment_code"
                      name="child_enrollment_code"
                      type="text"
                  label="Child Enrollment Code"
                  leftIcon={<DocumentIcon />}
                      required
                      value={formData.child_enrollment_code}
                      onChange={handleChange}
                      placeholder="CK001A"
                      maxLength={10}
                  className="uppercase"
                    />

                {/* Verification Code Input */}
                <Input
                      id="verification_code"
                      name="verification_code"
                      type="text"
                  label="Email Verification Code"
                  leftIcon={<CheckCircleIcon />}
                      required
                      value={formData.verification_code}
                      onChange={handleChange}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                  helperText={
                    signupData?.email 
                      ? `Check your email (${signupData.email}) for the verification code`
                      : "Check your email for the verification code"
                  }
                    />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  isLoading={isLoading}
                  disabled={!signupData}
                  className="mt-2 sm:mt-2 md:mt-2 lg:mt-2 xl:mt-3"
                >
                  {isLoading ? "Verifying..." : "Verify & Create Account"}
                </Button>

                {/* Back to Signup Link */}
                <div className="text-center pt-1 sm:pt-1 md:pt-1.5 lg:pt-1.5 xl:pt-2">
                  <Link
                    href="/signup"
                    className="text-[10px] sm:text-xs md:text-xs lg:text-[10px] xl:text-base 2xl:text-lg font-medium text-blue-600 hover:text-blue-700"
                  >
                    ← Back to Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto mt-2 sm:mt-3 lg:mt-2 xl:mt-4 2xl:mt-6">
        <CopyrightFooter />
      </div>
    </div>
  );
}

