import React from "react";
import { Separator } from "@/components/ui/separator";
import { DrawerTrigger } from "@/components/ui/drawer";

interface ProductCardProps {
  imageUri: string;
  prod: any;
  setSelectedProduct: (p: any) => void;
}
function ProductCard({ imageUri, prod, setSelectedProduct }: ProductCardProps) {
  return (
    <div className="rounded-2xl bg-black w-72 overflow-hidden min-h-[380px] flex flex-col">
      <div className="w-full h-48 bg-zinc-900 flex items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={prod.signedImageUrl}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* CATEGORY */}
      <p className="mx-auto text-center border-2 border-zinc-500 px-2 bg-zinc-200 max-w-fit rounded-full mt-2">
        {prod.category}
      </p>

      {/* NAME */}
      <p className="font-bold text-2xl text-center mb-2">{prod.name}</p>

      {/* PRICE + BUTTON */}
      <div className="flex justify-between items-center mx-4 mt-auto mb-4">
        <p className="text-xl">Rs. {prod.price}/pc</p>
        <DrawerTrigger onClick={() => setSelectedProduct(prod)}>
          View Details
        </DrawerTrigger>
      </div>
    </div>
  );
}

export default ProductCard;
