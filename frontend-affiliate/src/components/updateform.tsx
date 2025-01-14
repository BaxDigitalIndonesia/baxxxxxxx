"use client";

import { cn } from "@/lib/utils";
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
import { Suspense, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { PATCH_USER, POST_LOGIN } from "@/app/api/auth/route";
import { passwordSchema, phoneSchema } from "@/interface/joiValidate";
import { toast } from "sonner";
import LoadingAnimate from "./atoms/LoadingAnimate";

function UpdateFormPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: "",
  });

  const searchParams = useSearchParams();
  const emailparams = searchParams.get("email") || "";
  const roleparams = searchParams.get("state") || "";
  const decodeState = Buffer.from(roleparams, "base64").toString("utf-8");
  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: emailparams, role: decodeState }));
  }, [searchParams]);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "confirmPassword") {
      setError(formData.password !== value);
    }
    if (name === "password") {
      const validation = passwordSchema.validate(value);
      if (validation.error) {
        setPasswordError(validation.error.message);
      } else {
        setPasswordError("");
      }
    }

    if (name === "phone") {
      const validation = phoneSchema.validate(value);
      if (validation.error) {
        setPhoneError(validation.error.message);
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(true);
      return;
    } else {
      setError(false);
      const validation = passwordSchema.validate(formData.password);
      if (validation.error) {
        setPasswordError(validation.error.message);
        return;
      } else {
        setPasswordError("");
      }
      try {
        const response = await PATCH_USER(formData);

        if (!response) {
          toast(`Failed to updated`, {
            style: {
              background: "#03fc45",
              color: "#fff",
            },
          });
          // setSubmitError("Failed to update user.");
        } else {
          // If update is successful, call login API
          // const loginResponse = await POST_LOGIN(
          //   formData.email,
          //   formData.password
          // );

          // if (!loginResponse) {
          //   setSubmitError("Login failed.");
          // }
          // setSubmitError("");
          // If login is successful, redirect to overview page
          router.push("/dashboard/overview");
        }
      } catch (error) {
        setSubmitError("An error occurred while updating the user.");
      }
    }
  };

  return (
    <>
      <div
        className={cn("flex flex-col gap-6", className)}
        {...props}>
        <CardTransparent>
          <CardHeader className="text-center mb-5">
            <CardTitle className="text-xl text-chart-2">
              Please Update Your Account
            </CardTitle>
            <CardDescription>Update your account details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 text-chart-2">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phone">Change Phone Number</Label>
                    <a className="ml-auto text-sm underline-offset-4 hover:underline">
                      (using +62)
                    </a>
                  </div>
                  <Input
                    id="phone"
                    type="phone"
                    name="phone"
                    placeholder="+62 *******"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {phoneError && (
                    <p className="mt-2 text-sm text-red-600">{phoneError}</p>
                  )}
                </div>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Change Password</Label>
                      <a className="ml-auto text-sm underline-offset-4 hover:underline"></a>
                    </div>
                    <div className="grid gap-2 relative">
                      <Input
                        id="password"
                        name="password"
                        type="password"
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
                      {/* <button
                      type="button"
                      className="w-5 h-5 absolute inset-y-0 mt-2 right-3 flex items-center text-slate-500"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                      </button> */}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                      <a className="ml-auto text-xs underline-offset-4 hover:underline">
                        Rewrite yor password!
                      </a>
                    </div>
                    <div className="grid gap-2 relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="*******"
                        required
                      />
                      {error && (
                        <p className="mt-2 text-sm text-red-600">
                          Passwords do not match.
                        </p>
                      )}
                      <button
                        type="button"
                        className="w-5 h-5 absolute inset-y-0 mt-2 right-3 flex items-center text-slate-500"
                        onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-chart-2 hover:bg-background hover:text-chart-2">
                    Submit
                  </Button>
                  {/* {submitError && (
                  <p className="mt-4 text-sm text-red-600">{submitError}</p>
                )} */}
                </div>
              </div>
            </form>
          </CardContent>
        </CardTransparent>
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
}

export function UpdateForm() {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <UpdateFormPage />
    </Suspense>
  );
}
