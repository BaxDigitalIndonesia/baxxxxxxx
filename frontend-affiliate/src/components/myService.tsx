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
import { Check } from "lucide-react";
import { toast } from "sonner";
import { ADD_CART, DELETE_CART } from "@/app/api/cart/route";
import { useState } from "react";


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

interface ServicesCardProps {
  cartsData: CartItem[];
  onReloadData: () => void;
}

export const MyService: React.FC<ServicesCardProps> = ({
  cartsData,
  onReloadData,
  
}) => {

  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null);

  const handleServiceClick = async (id: string, name: string) => {
    setLoadingServiceId(id);
    try {
      const response = await DELETE_CART(id);
      
      if (response) {
        toast(`${name} Service has been Deleted`, {
          style: {
            background: "#34eb86",
            color: "#fff",
          },
        });
        onReloadData();
      }
      if(!response) {
        toast(`${name} Failed to delete Service`, {
          style: {
            background: "#eb3480",
            color: "#fff",
          },
        });
       
      }
    } catch (error) {
      toast(`${name} Failed to delete Service`, {
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
      {cartsData.map((cartItem) => (
      
        <Card key={cartItem.id} className="w-full h-full text-center">
          
          <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-4">
            <CardTitle className="text-lg font-bold">{cartItem.service.name}</CardTitle>
          </CardHeader>
          <CardTransparent>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Category: {cartItem.service.Category.name}
              </div>
              {/* <div className="text-sm text-muted-foreground">
              Quantity: {service.qty}
            </div> */}
              <div className="text-sm text-muted-foreground">
                Price:{" "}
                {cartItem.service.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-red-400  text-white"
                onClick={() => handleServiceClick(cartItem.id, cartItem.service.name)}
                disabled={loadingServiceId === cartItem.id}
              >
                {loadingServiceId === cartItem.id ? (
                  <span>Delete...</span>
                ) : (
                  <p>Delete</p>
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
