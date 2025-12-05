import { getCart } from "@/api/cart.api";
import { useApi } from "@/api/useFetch";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/cart/details/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const {
    call: getCartCall,
    data: cartData,
    error: cartError,
    loading: cartLoading,
  } = useApi(getCart);

  useEffect(() => {
    getCartCall();
  }, []);

  useEffect(() => {
    if (cartData) {
      setCart(cartData.products);
      setTotalAmount(cartData.totalAmount);
      // console.log(c);
      toast.success("Cart fetched successfully!", {
        id: "get-cart",
      });
    }
  }, [cartData]);
  useEffect(() => {
    if (cartLoading) {
      toast.loading("Fetching cart data...", {
        id: "get-cart",
      });
    }
  }, [cartLoading]);
  useEffect(() => {
    if (cartError) {
      toast.error("Failed to laod cart: " + cartError, {
        id: "get-cart",
      });
    }
  }, [cartError]);

  return (
    <>
      <Card className="w-full mx-auto max-w-xl border-zinc-800 bg-zinc-950/80 text-zinc-100 shadow-lg backdrop-blur mt-24">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold">Your Cart</CardTitle>
          <span className="text-xs text-zinc-400">
            {cart.length} item{cart.length !== 1 && "s"}
          </span>
        </CardHeader>

        <Separator className="bg-zinc-800" />

        <CardContent className="p-0">
          {cart.length === 0 ? (
            <div className="flex h-40 items-center justify-center text-sm text-zinc-500">
              Your cart is empty.
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="divide-y divide-zinc-800">
                {cart.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-900/60 transition-colors"
                  >
                    {/* Image */}
                    <div className="h-16 w-16 overflow-hidden rounded-md bg-zinc-900 flex items-center justify-center">
                      {c.signedImageUrl ? (
                        <img
                          src={c.signedImageUrl}
                          alt={c.quantity}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-zinc-500">No image</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col">
                      <span className="text-sm font-medium text-zinc-100 line-clamp-1">
                        {c.product.name}
                      </span>
                      <span className="text-xs text-zinc-400 mt-0.5">
                        ₹{c.product.price} / pc
                      </span>

                      {/* Quantity controls */}
                      {/* <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>*/}
                    </div>

                    {/* Price + remove */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-zinc-100">
                        ₹{c.product.price * c.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-red-950/40"
                        // onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>

        <Separator className="bg-zinc-800" />

        <CardFooter className="flex items-center justify-between py-3">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-400">Total</span>
            <span className="text-lg font-semibold text-zinc-50">
              ₹{totalAmount}
            </span>
          </div>
          <Button
            className="bg-zinc-100 text-zinc-900 hover:bg-white font-semibold"
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
