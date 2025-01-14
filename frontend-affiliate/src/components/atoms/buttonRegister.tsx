import React, { useState } from "react";

const RegisterButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOptionClick = (role:string) => {
    window.location.href = `/auth/register?q=${role}`;
  };

  return (
    <div>
      <button
        className="px-6 py-3 text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full hover:from-violet-600 hover:to-fuchsia-600"
        onClick={() => setShowModal(true)}
      >
        Daftar Sekarang
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            <h3 className="text-lg font-semibold mb-4">Pilih Jenis Pendaftaran</h3>
            <button
              className="w-full px-4 py-2 mb-3 text-white bg-violet-500 rounded hover:bg-violet-600"
              onClick={() => handleOptionClick("mitra")}
            >
              Daftar Sebagai Mitra
            </button>
            <button
              className="w-full px-4 py-2 text-white bg-fuchsia-500 rounded hover:bg-fuchsia-600"
              onClick={() => handleOptionClick("affiliate")}
            >
              Daftar Sebagai Affiliate
            </button>
            <button
              className="w-full mt-4 text-sm text-gray-600 underline hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterButton;
