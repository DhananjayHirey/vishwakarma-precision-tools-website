import { MagicCard } from "@/components/ui/magic-card";
import { Lens } from "@/components/ui/lens";

function ProductDetails({ selectedProduct }: any) {
  return (
    <>
      <MagicCard className="bg-zinc-800 rounded-2xl overflow-hidden ">
        <div className="flex justify-between gap-12 w-full h-full">
          <Lens>
            <img
              src={"https://i.ibb.co/qM1kdnbt/517-BP179xk-L-UL500.jpg"}
              alt=""
              className="rounded-none w-100"
            />
          </Lens>
          <div className="flex flex-col flex-1 p-12 ps-4">
            <div className="flex justify-between">
              <p className="text-white text-md text-start font-light flex flex-col">
                <span className="display-block">
                  PID: {selectedProduct._id}
                </span>
                <span className="text-white text-start text-4xl font-bold display-block">
                  {selectedProduct.name}
                </span>
              </p>
              <p className="text-white text-4xl">
                Rs. {selectedProduct.price}.00
                <span className="text-4xl">/pc</span>
              </p>
            </div>
            <div>
              <p className="text-white text-start mt-8 max-w-5/7 text-lg">
                {selectedProduct.description} Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Ullam qui beatae, quia sapiente
                mollitia ipsum placeat neque voluptates? Quisquam sint delectus
                voluptas voluptatum, accusamus enim suscipit minima maiores,
                sunt pariatur veniam repellendus blanditiis veritatis alias odio
                ducimus rerum dolorem nemo.
              </p>
              <div className="flex gap-2">
                <div className="px-3 rounded-full text-white bg-zinc-700 mt-8">
                  {selectedProduct.category}
                </div>
                <div className="px-3 rounded-full text-white bg-zinc-700 mt-8">
                  In Stock: {selectedProduct.stock}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MagicCard>
    </>
  );
}

export default ProductDetails;
