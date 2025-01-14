"use client";

import { useState, useEffect, Suspense } from "react";
import { RESEND_OTP, VERIFY_OTP } from "@/app/api/auth/route";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoadingAnimate from "@/components/atoms/LoadingAnimate";

const VerifyAuthOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false); // Hidden by default
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const id = searchParams.get("user") as string;

  useEffect(() => {
    if (resendTimer > 0 && isResendVisible) {
      const countdown = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown); // Clean up timer
    }
  }, [resendTimer, isResendVisible]);

  const handleChange = (value: string, index: number) => {
    if (/\d/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResend = async () => {
    if (resendTimer === 0) {
      try {
        setOtp(Array(6).fill(""));
        setResendTimer(60);
        setIsResendVisible(false); // Disable resend button during countdown
        const response = await RESEND_OTP(id);
        if (!response.ok) {
          setSubmitError(`${response.message}`);
        }
      } catch (err) {
        setSubmitError("An error occurred while resending the OTP.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const enteredOtp = otp.join("");
      const response = await VERIFY_OTP(enteredOtp, id);
      if (!response.ok) {
        setIsResendVisible(true);
        setSubmitError(`${response.message}`);
      }
      if (response.status === "EXPIRED") {
        setIsResendVisible(true); // Enable the resend button
        setSubmitError("OTP code has expired. Please resend the OTP code.");
      }
      if (response.status === "VERIFIED") {
        router.push("/dashboard/overview");
      }
    } catch (err: any) {
      // console.log(err);
      //setIsResendVisible(true);
      setSubmitError("An error occurred while submitting the OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);

      // Focus the last input box
      const lastInput = document.getElementById(`otp-input-5`);
      lastInput?.focus();
    }
    event.preventDefault();
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <Suspense fallback={<LoadingAnimate />}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-cyan-950">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-4">
            Verifikasi dengan Email
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Silakan masukkan 6 digit kode yang baru saja dikirim ke email Anda.
          </p>

          <div className="flex justify-center gap-2 mb-4">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center border rounded focus:outline-none focus:ring focus:ring-blue-300 text-lg"
              />
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="m-3">
              {!isResendVisible ? (
                <>
                  <Button
                    onClick={handleResend}
                    disabled={!isResendVisible || resendTimer > 0}
                    className={`text-sm bg-transparent ${
                      !isResendVisible || resendTimer > 0
                        ? "text-gray-900 cursor-not-allowed"
                        : "text-blue-500"
                    }`}>
                    Kirim Ulang Kode
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleResend}
                    disabled={resendTimer > 0}
                    className={`text-sm bg-transparent text-blue-900 ${
                      resendTimer > 0
                        ? "text-gray-900"
                        : "text-blue-500 hover:bg-transparent"
                    }`}>
                    Kirim Ulang Kode {resendTimer > 0 && `(${resendTimer})`}
                  </Button>
                </>
              )}
            </div>

            <Button
              type="submit"
              className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              onClick={handleSubmit}
              disabled={!isOtpComplete}>
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Verify...
                </>
              ) : (
                "Verifikasi"
              )}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            {submitError && (
              <p className="mt-2 text-sm text-red-600">{submitError}</p>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

const VerifyOtp = () => {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <VerifyAuthOtp />
    </Suspense>
  );
};

export default VerifyOtp;
