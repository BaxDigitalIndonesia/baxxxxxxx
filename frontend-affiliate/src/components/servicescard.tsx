"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardTransparent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ADD_CART } from "@/app/api/cart/route";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  qty: number;
  price: number;
  Category: {
    name: string;
  };
  onClick?: () => void;
}
interface ServicesCardProps {
  services: Service[];
  onReloadData: () => void;
}

export const ServicesCard: React.FC<ServicesCardProps> = ({ services,onReloadData  }) => {
  
  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null); 

  const handleServiceClick = async (id: string, name: string) => {
    setLoadingServiceId(id);
    try {
    
      const response = await ADD_CART(id);
   
      if (response) {
        toast(`${name} Service has been adding`, {
          style: {
            background: "#34eb86",
            color: "#fff",
          }
         
        });
        onReloadData();
      } else {
        toast(`Failed to add service ${name}`, {
          style: {
            background: "#eb3480",
            color: "#fff",
          }
         
        });
      
      }
    } catch (error) {
      toast(`Something wrong error`, {
        position: "top-right",
        duration: 4000,
        style: {
          background: "#eb3480",
          color: "#fff",
        },
      });
    } finally {
      setLoadingServiceId(null);
    }
  };
  return (
    <>
    
      <div className="grid md:grid-cols-3 gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="w-full h-full text-center">
            <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-4">
              <CardTitle className="text-lg font-bold">
                {service.name}
              </CardTitle>
            </CardHeader>
            <CardTransparent>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Category: {service.Category.name}
                </div>
                {/* <div className="text-sm text-muted-foreground">
                  Quantity: {service.qty}
                </div> */}
                <div className="text-sm text-muted-foreground">
                  Price:{" "}
                  {service.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-chart-5 text-white"
                  onClick={() => handleServiceClick(service.id, service.name)}
                  disabled={loadingServiceId === service.id}
                >
                  {loadingServiceId === service.id ? (
                    <span>Loading...</span>
                  ) : (
                    <p>Add Service</p>
                  )}
                </Button>
              </CardFooter>
            </CardTransparent>
          </Card>
        ))}
      </div>
    </>
  );
};
