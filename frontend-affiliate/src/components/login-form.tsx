"use client";
import { cn, parseStringify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardTransparent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateAuthUrl } from "@/lib/crypto";
import { GET_OAUTH, POST_LOGIN } from "@/app/api/auth/route";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { emailSchema, passwordSchema } from "@/interface/joiValidate";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const [serverError, setServerError] = useState("");

  const [passwordError, setPasswordError] = useState("");

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
    if (name === "password") {
      const validation = passwordSchema.validate(value);
      if (validation.error) {
        setPasswordError(validation.error.message);
      } else {
        setPasswordError("");
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingLogin(true);
    setServerError("");
    try {
       const res = await POST_LOGIN(formData.email, formData.password);
      //const resJson = await res.json();
      // console.log("resJson :", resJson);
        console.log(res);
      if (!res) {
        setServerError("Email or Password incorrect");
      } else {
      console.log("crottttt sebelum");
        router.push("/dashboard/overview");
       console.log("crottttt sesudah");
      
        
      }

    } catch (err: any) {
      toast(`Something wrong error`, {
        style: {
          background: "#eb3480",
          color: "#fff",
        }
       
      });
      //setServerError("Something wrong error");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const roles = "mitra";
      const encodedRoles = generateAuthUrl(roles);
      const response = await GET_OAUTH(encodedRoles);
      router.push(response);
    } catch (error) {
      console.error("Error during Google login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardTransparent>
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-chart-2">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">
            Log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* {serverError != "" && (
            <div className="h4 text-red-500 font-bold">{serverError}</div>
          )} */}
          <form onSubmit={handleLoginSubmit}>
            <div className="grid gap-6 text-chart-2">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="grid gap-2 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="*******"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    {passwordError && (
                      <p className="mt-2 text-sm text-red-600">
                        {passwordError}
                      </p>
                    )}
                    <button
                      type="button"
                      className="w-5 h-5 absolute inset-y-0 mt-2 right-3 flex items-center text-slate-500"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </div>
                <div className="">
                  Forgot or Reset your password?{" "}
                  <a href="./forgot" className="underline underline-offset-4">
                    Reset
                  </a>
                </div>
                <Button
                  type="submit"
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${
                    loadingLogin
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  disabled={loadingLogin}
                >
                  {loadingLogin ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                      Sign In ...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                {submitError && (
                  <p className="mt-2 text-sm text-red-600">{submitError}</p>
                )}
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center">
                <span className="relative z-10 bg-transparent px-2 text-slate-800">
                  Or continue with
                </span>
              </div>
              <CardDescription className="text-center text-slate-800 hover:text-chart-2">
                Login with your Google account
              </CardDescription>
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-chart-2 border border-chart-2 text-white"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  {loading ? "Logging in..." : "Login with Google"}
                </Button>
              </div>

              <div className="text-center text-sm text-slate-800">
                Don&apos;t have an account?{" "}
                <a href="./register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </CardTransparent>
      <div className="text-balance text-center text-xs text-slate-800 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  );
}
