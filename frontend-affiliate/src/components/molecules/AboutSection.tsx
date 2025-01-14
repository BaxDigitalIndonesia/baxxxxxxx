import React from "react";
import CustomWrapper from "../atoms/CustomWrapper";
import CustomContainer from "../atoms/CustomContainer";
import { Button } from "../ui/button";
import Image from "next/image";

export default function AboutSection() {
  return (
    <CustomWrapper>
      <CustomContainer delay={0.4}>
        <div className="flex flex-col w-full items-center justify-center py-14 md:flex-row lg:flex-row">
          <div className="flex w-full flex-col items-start justify-center p-2 md:w-1/2">
            <h1 className="h1 pb-10 font-bold text-foreground">
              Bergabung dengan Universitas Kepanjen
            </h1>
            <p className="subtitle-1 py-4">
              Universitas Kepanjen adalah sebuah Perguruan Tinggi yang terletak
              di Kepanjen Malang Jawa Timur. Universitas Kepanjen merupakah Alih
              bentuk dari Stikes Kepanjen.
              <br />
              <br />
              Universitas Kepanjen memiliki akreditasi{" "}
              <span>
                <strong>&quot;SANGAT BAIK&quot;</strong>
              </span>{" "}
              untuk semua produi Fakultas Kesehatan dan{" "}
              <span>
                <strong>&quot;BAIK&quot;</strong>
              </span>{" "}
              untuk Fakultas Bisnis dan Pariwisata.
            </p>
            <Button>About Us</Button>
          </div>
          <div className="rounded-lg flex size-full flex-col items-center justify-center bg-[url('/assets/images/kongres-2.png')] bg-cover bg-center md:w-1/2">
            <Image
              src="/assets/images/kongres-2.png"
              alt="logo"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      </CustomContainer>
    </CustomWrapper>
  );
}
