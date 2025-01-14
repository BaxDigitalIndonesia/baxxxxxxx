"use client";

import { useRouter, useSearchParams } from "next/navigation";
import api from "../../api/axiosInstance";
import Cookies from "js-cookie";
import { Suspense, useEffect } from "react";
import { parseStringify } from "@/lib/utils";
import { LoadingOverlay } from "@/components/atoms/LoadingOverlay";
import LoadingAnimate from "@/components/atoms/LoadingAnimate";

// const api = process.env.NEXT_PUBLIC_API_BE
const CallbackContent = () => {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const fetchToken = async () => {
      const token = params.get("token");
      if (!token) return;

      try {
        if (token) {
          localStorage.setItem("accessToken", token);
          sessionStorage.setItem("accessToken", token);

          Cookies.set("accessToken", token, {
            path: "/",
            sameSite: "strict",
            secure: true,
            domain: window.location.hostname,
            expires: 7,
          });

          const cookieSet = Cookies.get("accessToken");
          if (cookieSet) {
            router.push("/dashboard/overview");
          } else {
            console.error("Cookie gagal di-set");
          }
        }
      } catch (error) {
        console.error("Error saat setting token:", error);
      }
    };

    fetchToken();
  }, [params, router]);

  return <LoadingAnimate />;
};

const Callback = () => {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <CallbackContent />
    </Suspense>
  );
};

export default Callback;
// function AuthCallback()
// {
//   return <LoadingAnimate />;
// }

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { Suspense } from "react";
// import LoadingAnimate from "@/components/atoms/LoadingAnimate";

// export default function AuthCallback({ searchParams }: { searchParams: { token: string } }) {
//   const token = searchParams.token;

//   if (!token) {
//     return <p>Token not found in URL</p>;
//   }

//   cookies().set({
//     name: "accessToken",
//     value: token,
//     path: "/",
//     httpOnly: false,
//     sameSite: "strict",
//     secure: true,
//   });

//   redirect("/dashboard/overview");

//   return (
//     <Suspense fallback={<LoadingAnimate />}>
//       <p>Setting up...</p>
//     </Suspense>
//   );
// }
