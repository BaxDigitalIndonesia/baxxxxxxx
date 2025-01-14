"use client";
import React, { Suspense, useEffect, useState } from "react";
import HomeSection from "../organisms/HomeSection";
import { VISITOR } from "@/app/api/customer/route";
import { useSearchParams } from "next/navigation";
import LoadingAnimate from "../atoms/LoadingAnimate";

function HomePageTemplate() {
  const searchParams = useSearchParams();
  const referalParams = searchParams.get("referal-code") as string;
  // console.log(referalParams);

  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [visitor, setVisitor] = useState({
    sessionId: "",
    longitude: "",
    latitude: "",
  });
  // console.log(visitor);

  useEffect(() => {
    const sessionId = sessionStorage.getItem("sessionId");

    if (!sessionId) {
      const newSessionId =
        "session-" + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("sessionId", newSessionId);
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const sendDataToServer = async () => {
    if (isFirstVisit && referalParams) {
      try {
        const geolocation = await getGeolocation();
        const sessionId = sessionStorage.getItem("sessionId") || "";
        const longitude = geolocation.longitude.toString();
        const latitude = geolocation.latitude.toString();
        setVisitor({
          sessionId,
          latitude,
          longitude,
        });
        await VISITOR(latitude, longitude, referalParams);

        // const data = await response.json()
        //   console.log("Data berhasil disimpan:", geolocation,latitude,longitude,data);
      } catch (error) {
        console.error("Error mengirim data:", error);
      }
    }
  };

  // function geolocation (longitude dan latitude)
  const getGeolocation = async () => {
    return new Promise<{ longitude: number; latitude: number }>(
      (resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              });
            },
            (error) => reject(error)
          );
        } else {
          reject("Geolocation is not supported by this browser.");
        }
      }
    );
  };

  useEffect(() => {
    if (isFirstVisit) {
      sendDataToServer();
    }
  }, [isFirstVisit]);

  return <HomeSection />;
}

function HomeTemplate() {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <HomePageTemplate />
    </Suspense>
  );
}

export default HomeTemplate;
