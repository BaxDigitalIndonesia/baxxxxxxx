"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { generateAuthUrl } from "@/lib/crypto";
import { motion } from "framer-motion";
import { CheckCircle, User, Users } from "lucide-react";
import Link from "next/link";

const encodeRole = (role: string): string => {
  return generateAuthUrl(role);
};

export function AuroraBackgroundDemo() {
  const mitraEncoded = encodeRole("MITRA");
  const affiliateEncoded = encodeRole("AFFILIATE");

  return (
    <div>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4">
          <div className="text-2xl md:text-7xl font-bold dark:text-white text-center text-chart-2">
            Yuk Gabung Bax Digital Affiliate Program
          </div>
          <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 text-chart-1">
            “Sebuah program yang dapat memberi kamu komisi tak terbatas”
          </div>
          <div className="flex flex-row gap-4">
            <Link href={`/register?role=${mitraEncoded}`}>
              <button className="flex flex-col md:flex-row bg-chart-2 dark:bg-white rounded-full w-fit text-sm md:text-base text-white dark:text-black px-4 py-2 hover:scale-105 transition items-center">
                Daftar Sebagai Mitra
                <User className="h-2 w-2 md:ml-2 mt-1 md:mt-0 md:h-5 md:w-5" />
              </button>
            </Link>
            <Link href={`/register?role=${affiliateEncoded}`}>
              <button className="flex flex-col md:flex-row bg-chart-2 dark:bg-white rounded-full w-fit text-sm md:text-base text-white dark:text-black px-4 py-2 hover:scale-105 transition items-center">
                Daftar Sebagai Affiliate
                <Users className="h-2 w-2 md:ml-2 mt-1 md:mt-0 md:h-5 md:w-5" />
              </button>
            </Link>
          </div>
          <Link href="/login">
            <button className="flex flex-col md:flex-row bg-chart-2 dark:bg-white rounded-full w-fit text-sm md:text-base text-white dark:text-black px-4 py-2 hover:scale-105 transition items-center">
              Sudah Menjadi Anggota
              <CheckCircle className="h-2 w-2 md:ml-2 mt-1 md:mt-0 md:h-5 md:w-5" />
            </button>
          </Link>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
