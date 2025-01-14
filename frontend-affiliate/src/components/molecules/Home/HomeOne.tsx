import CustomContainer from "@/components/atoms/CustomContainer";
import { useRouter } from "next/navigation";

export default function HomeOne() {
  const router = useRouter();
  return (
    <CustomContainer delay={0.4}>
      <div className="flex flex-col items-center justify-center w-full mb-6">
        <div className="flex flex-col items-start justify-center w-11/12 mb-12">
          <h1 className="font-heading text-foreground text-left py-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight w-full bg-gradient-to-r from-blue-900 to-blue-900 bg-clip-text">
            Coding Bootcamp Bayar Setelah Selesai Belajar​​
          </h1>
          <p className="mb-12 text-lg md:text-xl text-gray-600 tracking-normal font-medium max-w-3xl">
            "Raih karir dan keahlian digital dengan peluang kerja tanpa batas
            dengan Belajar di Bootcamp{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text inline italic font-bold">
              Full Stack Development & Digital Marketing
            </span>
            bisa bayar setelah lulus hingga dapat kerja."
          </p>
          <div className="flex items-start space-x-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <button
                className="group px-8 py-4 text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  alert("Fitur Belum Tersedia");
                }}
              >
                <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
                  Daftar Sekarang
                </span>
              </button>

              <button className="group px-8 py-4 text-blue-900 bg-white border-2 border-blue-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
                  Konsultasi Gratis
                </span>
              </button>
            </div>
          </div>
        </div>

        <CustomContainer delay={0.6}>
          <div className="flex flex-col items-center justify-center w-11/12 my-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="pb-1 font-heading text-foreground text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text">
                Mengapa Memilih BAX DIGITAL?
              </h1>

              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-700 to-blue-900 rounded-full"></div>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed tracking-normal  text-justify">
                Bootcamp BAX DIGITAL menawarkan kurikulum terkini, pembelajaran
                berbasis proyek, mentor berpengalaman, dan sertifikasi
                kompetensi. Peserta mendapatkan dukungan karier seperti
                bimbingan CV, simulasi wawancara, dan akses ke jaringan
                profesional serta peluang kerja eksklusif. Dengan jadwal
                fleksibel, fokus pada employability, dan reputasi terpercaya,
                BAX DIGITAL adalah pilihan tepat untuk memulai karier di
                Fullstack Development dan Digital Marketing.
              </p>
            </div>
            <button
              className="mt-2 group px-8 py-3 text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => router.push("/about")}
            >
              <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
                Lihat Selengkapnya
              </span>
            </button>
          </div>
        </CustomContainer>
      </div>
    </CustomContainer>
  );
}
