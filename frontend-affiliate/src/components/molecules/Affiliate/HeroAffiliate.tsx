import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomContainer from "@/components/atoms/CustomContainer";

const HeroAffiliate = () => {
  const data = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      name: "Rino",
      students: 120,
      revenue: "Rp20.000.000",
      occupation: "Marketing Specialist",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      name: "Ilham",
      students: 80,
      revenue: "Rp10.000.000",
      occupation: "Data Analyst",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      name: "Malik",
      students: 95,
      revenue: "Rp10.000.000",
      occupation: "Web Developer",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100",
      name: "Cundus",
      students: 110,
      revenue: "Rp10.000.000",
      occupation: "Software Engineer",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/100",
      name: "Sultan Bransyah",
      students: 150,
      revenue: "Rp10.000.000",
      occupation: "Web Developer",
    },
  ];

  return (
    <div className="w-full ">
      <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8 p-6 max-w-7xl mx-auto my-4 sm:my-6 md:my-8">
        <div className="flex flex-col space-y-4 max-w-xl">
          <h1 className="text-4xl font-extrabold text-blueprimary">
            BAX DIGITAL
          </h1>

          <h2 className="text-3xl font-semibold text-bluesecondary ">
            AFFILIATE PROGRAM
          </h2>
          <div className="w-full h-1 mx-auto bg-gradient-to-r from-blue-700 to-blue-900 rounded-full"></div>

          <p className="text-xl text-gray-600 text-center italic">
            "Gabung dengan Bax Digital Affiliate Program dan raih komisi tanpa
            batas setiap kali ada mahasiswa yang mendaftar melalui link
            referral-mu. Semakin banyak yang mendaftar, semakin besar
            penghasilanmu!"
          </p>
        </div>
        <div>
          <img
            src="https://img.freepik.com/free-photo/top-view-diverse-people-hands-holding-together-circle-hands-stack_93675-134940.jpg?t=st=1736451841~exp=1736455441~hmac=ca9074cc91306c943cf5f1d2c3839b42e6850fe1f584fd40605d5d8fc56eb40e&w=1380"
            alt="People Holding Hands"
            className="w-full h-96 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <CustomContainer delay={0.4}>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8 p-6 max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full flex justify-center items-center sm:my-[50px] md:my-[50px] lg:my-0"
          >
            <CarouselContent className="h-[700px] select-none">
              {data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="flex-none h-[220px] pt-4"
                >
                  <div className="p-1">
                    <Card className="w-[500px] flex flex-row relative overflow-hidden shadow-lg rounded-lg border-2 border-blue-900 ">
                      <img
                        src={item.image}
                        alt={`Card Image ${item.name}`}
                        className="w-32 h-32 object-cover rounded-md m-4"
                      />

                      <CardContent className="flex items-start flex-col p-4 w-full ">
                        <div className="w-full">
                          <h3 className="text-4xl font-bold text-blueprimary">
                            {item.name}
                          </h3>
                          <div className="my-2 w-[300px] h-1 bg-gradient-to-r from-blue-700 to-blue-900 rounded-full"></div>

                          <p className="text-lg text-gray-600">
                            Total Students:{" "}
                            <span className="font-bold text-blueprimary">
                              {item.students}
                            </span>
                          </p>
                          <p className="text-lg text-gray-600">
                            Total Revenue:{" "}
                            <span className="font-bold text-blueprimary">
                              {item.revenue}
                            </span>
                          </p>
                          <p className="text-lg text-gray-600">
                            Occupation:{" "}
                            <span className="font-bold text-blueprimary">
                              {item.occupation}
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 transition-all shadow-md" />
            <CarouselNext className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 transition-all shadow-md" />

            <CarouselPrevious className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 transition-all shadow-md" />
            <CarouselNext className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-700 transition-all shadow-md" />
          </Carousel>

          <div className="flex flex-col space-y-4 max-w-xl">
            <h1 className="text-4xl font-extrabold text-blueprimary">
              RAIH PASSIVE INCOME
            </h1>
            <div className="w-full h-1 mx-auto bg-gradient-to-r from-blue-700 to-blue-900 rounded-full"></div>
            <h2 className="text-3xl font-semibold text-bluesecondary ">
              Semua Bisa Menjadi Affiliator!
            </h2>

            <p className="text-xl text-gray-600 text-justify">
              Di era digital ini, untuk mendapatkan passive income tidak sesulit
              yang Anda bayangkan dan bukan lagi sebuah angan. Anda hanya perlu
              menyisihkan waktu luang Anda untuk berbagi informasi dan dapatkan
              komisi. Ingin menjadi seperti mereka? Klik tombol dibawah ini
              untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default HeroAffiliate;
