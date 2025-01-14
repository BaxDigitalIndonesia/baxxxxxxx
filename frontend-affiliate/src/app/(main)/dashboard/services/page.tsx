"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/pagetitle";
import { ServicesCard } from "@/components/servicescard";
import { MyService } from "@/components/myService";
import SearchBarWithButton from "@/components/searchbar";
import { FETCH_SERVICES } from "../../../api/services/route";
import LoadingAnimate from "@/components/atoms/LoadingAnimate";
import { ADD_CART, FETCH_CART } from "@/app/api/cart/route";

interface CartItem {
  id: string;
  quantity: number;
  serviceId: string;
  totalPrice: number;
  userId: string;
  service: Service;
}
interface Service {
  id: string;
  name: string;
  qty: number;
  price: number;
  Category: {
    id: number;
    name: string;
    userId: string;
  };
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [filteredServicesUser, setFilteredServicesUser] = useState<Service[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = services.filter(
      (service) =>
        service.name.toLowerCase().includes(lowerCaseQuery) ||
        service.Category.name.toLowerCase().includes(lowerCaseQuery)
    );

    const resultsCart = cartItems
      .map((cartItem) => cartItem.service) 
      .filter(
        (service) =>
          service.name.toLowerCase().includes(lowerCaseQuery) ||
          service.Category.name.toLowerCase().includes(lowerCaseQuery)
      );
    setFilteredServicesUser(resultsCart);

    setFilteredServices(results);
  };
  const fetchData = async () => {
    try {
      const data = await FETCH_SERVICES();
      const cartsData = await FETCH_CART();
      
      setCartItems(cartsData); // Set keranjang
      const servicesFromCart = cartsData.map((item: CartItem) => item.service);
      setServices(data);
      setFilteredServices(data);
      setFilteredServicesUser(servicesFromCart);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full p-5 ">
      <div className="mt-2 mb-2 flex justify-between">
        <PageTitle title="All Services" />
        <section className="mb-2 flex justify-end  ">
          <SearchBarWithButton onSearch={handleSearch} />
        </section>
      </div>
      {isLoading ? (
        <LoadingAnimate />
      ) : filteredServices.length === 0 ? (
        <p className="text-center text-blue-700">No services found.</p>
      ): (
        <>
          <ServicesCard services={filteredServices} onReloadData={fetchData} />
          <div className="mt-20 mb-10 flex gap-4">
            <PageTitle title="My Services" />
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/checkout.png"
              alt="checkout"
            />
          </div>
          <div>
            {filteredServicesUser.length === 0 ? (
        <p className="text-center text-blue-700">No services found.</p>
      ) : (
        <MyService cartsData={cartItems} onReloadData={fetchData} />

      )}
        
          </div>
        </>
      )}
    </div>
  );
}
