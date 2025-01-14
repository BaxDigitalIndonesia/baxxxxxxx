"use client";

import LoadingAnimate from "@/components/atoms/LoadingAnimate";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("service");
  const serviceDescription = searchParams.get("description");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const handlePayment = () => {
    alert(
      `Pembayaran untuk ${serviceName} menggunakan ${paymentMethod} berhasil atas nama ${name}!`
    );
  };
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <div className="flex flex-col gap-5 min-w-[1050px] p-5 [background:radial-gradient(125%_75%_at_50%_10%,#000_40%,#1b4974_120%)]">
        <h1 className="text-2xl font-bold text-white">Pembayaran</h1>

        {/* Card Deskripsi Layanan */}
        <div className="bg-gray-800 text-white p-5 rounded shadow-md">
          <h2 className="text-xl font-semibold">Detail Layanan</h2>
          <p className="text-lg mt-2">
            <strong>Service:</strong> {serviceName}
          </p>
          <p className="text-sm mt-2">{serviceDescription}</p>
        </div>
        {/* Card Pengisian Data Diri */}
        <div className="bg-gray-800 text-white p-5 rounded shadow-md">
          <h2 className="text-xl font-semibold">Data Diri</h2>
          <div className="mt-3 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="p-2 bg-gray-700 text-white rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nomor Telepon"
              className="p-2 bg-gray-700 text-white rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 bg-gray-700 text-white rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Alamat"
              className="p-2 bg-gray-700 text-white rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Pilihan Metode Pembayaran */}
        <div className="bg-gray-800 text-white p-5 rounded shadow-md flex flex-col">
          <h2 className="text-xl font-semibold">Metode Pembayaran</h2>
          <select
            className="p-2 mt-2 bg-gray-700 text-white rounded cursor-pointer transition duration-300 ease-in-out"
            onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Pilih metode</option>
            <option value="ATM BCA">ATM BCA</option>
            <option value="ATM BRI">ATM BRI</option>
            <option value="ATM Mandiri">ATM Mandiri</option>
            <option value="Kartu Kredit">Kartu Kredit</option>
          </select>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5 transition duration-300 ease-in-out cursor-pointer"
            onClick={handlePayment}
            disabled={!paymentMethod || !name || !email}>
            Bayar Sekarang
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default function Payment() {
  return (
    <Suspense fallback={<LoadingAnimate />}>
      <PaymentPage />
    </Suspense>
  );
}
