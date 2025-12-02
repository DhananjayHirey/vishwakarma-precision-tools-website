import React from "react";
import { Separator } from "./ui/separator";

interface ProductCardProps {
  imageUri: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  price: number;
}

function ProductCard({
  imageUri,
  name,
  description,
  stock,
  price,
  category,
}: ProductCardProps) {
  return (
    <>
      <div className="rounded-2xl bg-white max-h-fit w-72 overflow-hidden">
        <img src={imageUri} alt="" className="w-full object-cover" />
        <p className="mx-auto text-center border-2 border-zinc-500 px-2 bg-zinc-200 max-w-fit rounded-full hover:bg-zinc-300    ">
          {category}
        </p>
        <p className="font-bold text-2xl text-center mb-4">{name}</p>
        {/* <div className="border-2 w-full" /> */}
        <div className="flex justify-between mx-4 my-4">
          <p className="text-2xl">Rs. {price}/pc</p>
          <button>Add to cart</button>
        </div>

        {/* <p>{imageUri}</p> */}
      </div>
    </>
  );
}

export default ProductCard;
