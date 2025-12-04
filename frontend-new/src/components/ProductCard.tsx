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
    <>
      <div className="rounded-2xl bg-white max-h-fit w-72 overflow-hidden">
        <img src={imageUri} alt="" className="w-full object-cover" />
        <p className="mx-auto text-center border-2 border-zinc-500 px-2 bg-zinc-200 max-w-fit rounded-full hover:bg-zinc-300    ">
          {prod.category}
        </p>
        <p className="font-bold text-2xl text-center mb-4">{prod.name}</p>
        {/* <div className="border-2 w-full" /> */}
        <div className="flex justify-between mx-4 my-4">
          <p className="text-2xl">Rs. {prod.price}/pc</p>
          {/* <button>Add to cart</button> */}
          <DrawerTrigger onClick={() => setSelectedProduct(prod)}>
            View Details
          </DrawerTrigger>
        </div>

        {/* <p>{imageUri}</p> */}
      </div>
    </>
  );
}

export default ProductCard;
