"use client";
import { FORGOT_SEND } from "@/app/api/auth/route";
import { emailSchema } from "@/interface/joiValidate";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      const validation = emailSchema.validate(value);
      if (validation.error) {
        setEmailError(validation.error.message);
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await FORGOT_SEND(formData.email);

      if (!response) {
        setSubmitError(response.message);
      } else {
        setSubmitError("");
        //  router.push("/login");
      }
    } catch (error) {
      setSubmitError("An error occurred while updating the user.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background:
          "linear-gradient(to bottom, rgba(37, 99, 235, 0.8), rgba(255, 255, 255, 0.8))",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-10">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Reset Password
        </h1>
        <p className="text-center text-gray-500 mt-2">
          You can change or update your password here.
        </p>
        <form className="mt-6" onChange={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Your e-mail address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Reset my Password
          </button>
          {submitError && (
            <p className="text-red-500 text-xs mt-2 text-center">
              {submitError}
            </p>
          )}
        </form>
        <p className="text-xs text-center text-gray-400 mt-4">
          © 2025 Password Reset Form. Bax Digital Indonesia
        </p>
      </div>
    </div>
  );
}
