import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseBusiness, Building, PencilRuler } from "lucide-react";

const AffiliateOne = () => {
  const cardData = [
    {
      icon: <Building className="w-20 h-20" />,
      title: "UNIVERSITAS TERNAMA",
      content:
        "Mitra kami yang tersebar di seluruh Indonesia memiliki reputasi unggul dan kapabilitas yang terbukti, siap memberikan pengalaman pendidikan terbaik.",
    },
    {
      icon: <BriefcaseBusiness className="w-20 h-20" />,
      title: "CERTIFIED PROFESSIONALS",
      content:
        "Selain kualitas perguruan tinggi, kami juga bangga memiliki tenaga pendidik yang ahli di bidangnya, siap membimbing Anda menuju kesuksesan.",
    },
    {
      icon: <PencilRuler className="w-20 h-20" />,
      title: "TOP CLASSES & MATERIALS",
      content:
        "Kami menyediakan kelas terdepan dengan materi pembelajaran yang lengkap, terbaru, dan relevan dengan tantangan industri nyata.",
    },
  ];
  return (
    <div>
      <div>
        <h1 className="font-heading text-foreground text-left py-6 text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight w-full bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
          Raih Komisi hanya dengan berbagi informasi
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 tracking-normal font-medium max-w-2xl leading-relaxed">
          Yuk Gabung
        </p>
        <p className="text-2xl md:text-3xl text-blueprimary tracking-normal font-semibold max-w-2xl leading-relaxed">
          Bax Digital Affiliate Program
        </p>

        <div className="flex items-start space-x-4 mt-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <button className="group px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
                DAFTAR BAX DIGITAL AFFILIATE
              </span>
            </button>
            <button className="group px-8 py-4 text-blue-900 bg-white border-2 border-blue-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="font-semibold tracking-wide group-hover:tracking-wider transition-all duration-300">
                BAX DIGITAL AFFILIATE +
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6 w-full my-10">
        {cardData.map((card, index) => (
          <Card
            key={index}
            className="w-full sm:w-1/4 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-blue-900 text-white flex flex-col items-center justify-center text-center">
              <CardTitle className="font-semibold">{card.icon}</CardTitle>
              <CardTitle className="text-xl font-semibold">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-gray-700">
              <p className="text-justify">{card.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AffiliateOne;
