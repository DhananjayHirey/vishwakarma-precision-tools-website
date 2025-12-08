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
    <div className="rounded-2xl bg-black w-72 overflow-hidden h-80 flex flex-col hover:shadow-2xl hover:shadow-zinc-800">
      <div className="w-full h-48 bg-zinc-900 flex items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={prod.signedImageUrl}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* NAME */}
      <div className="flex justify-between items-center ps-4 w-full">
        <span className="font-bold text-2xl mb-2 font-serif mt-2">
          {prod.name}
        </span>

        {/* CATEGORY */}
        <span className="mx-auto text-center text-sm border-2 border-zinc-500 px-2 bg-zinc-700 max-w-fit rounded-full">
          {prod.category}
        </span>
      </div>

      {/* PRICE + BUTTON */}
      <div className="flex justify-between items-center mx-4 mt-auto mb-4">
        <p className="text-xl font-mono">Rs. {prod.price}/pc</p>
        <DrawerTrigger
          className="bg-zinc-300 px-4 py-1 cursor-pointer rounded-md font-bold text-black"
          onClick={() => setSelectedProduct(prod)}
        >
          View Details
        </DrawerTrigger>
      </div>
    </div>
  );
}

export default ProductCard;
