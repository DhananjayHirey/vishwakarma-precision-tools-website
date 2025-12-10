import { getCart, removeFromCart } from "@/api/cart.api";
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
import { Trash2 } from "lucide-react";
import AddressComp from "@/components/cart/addressComp";
import z from "zod";
import axios from "axios";

export const Route = createFileRoute("/cart/details/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tin, setTin] = useState("");

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const {
    call: getCartCall,
    data: cartData,
    error: cartError,
    loading: cartLoading,
  } = useApi(getCart);

  const {
    call: removeFromCartCall,
    data: removeFromCartData,
    error: removeFromCartError,
    loading: removeFromCartLoading,
  } = useApi(removeFromCart);

  useEffect(() => {
    if (removeFromCartLoading) {
      toast.loading("Item being removed from cart...", {
        id: "remove-from-cart",
      });
    }
  }, [removeFromCartLoading]);

  useEffect(() => {
    if (removeFromCartError) {
      toast.error("Error removing from cart...", {
        id: "remove-from-cart",
      });
    }
  }, [removeFromCartError]);

  useEffect(() => {
    if (removeFromCartData) {
      toast.success("Item removed successfully!", {
        id: "remove-from-cart",
      });
      getCartCall();
    }
  }, [removeFromCartData]);

  useEffect(() => {
    getCartCall();
  }, []);

  useEffect(() => {
    if (cartData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(cartData.products);
      setTotalAmount(cartData.totalAmount);
      // console.log(cartData.eta);
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

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const onPayment = async (payload:any) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/payments/createOrder",
        payload,
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);

      const paymentObject = new (window as any).Razorpay({
        key: import.meta.env.VITE_APP_RZP_TEST_API_KEY,
        order_id: data.id,
        ...data,
        handler: function (response: any) {
          console.log(response);
          const options = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            email: email,
            shippingAddress: address,
            orderDate: new Date(),
            eta: new Date(cartData.eta),
            totalBilling: totalAmount,
            TIN: tin,
          };
          axios
            .post(
              import.meta.env.VITE_API_BASE_URL + "/payments/verifyPayment",
              options,
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                // alert("Payment Successful");
                toast.success(
                  "Payment Verified. Your order has been placed successfully!"
                );
              } else {
                console.log("Payment failed");
              }
            })
            .catch((e) => {
              console.log(e);
            });
          getCartCall();
        },
      });
      paymentObject.open();
    } catch (e) {
      console.log(e);
    }
  };

  async function handleCheckout() {
    try {
      if (email.length <= 0 || tin.length < 10 || tin.length > 10 || !address) {
        return toast.error(
          "Please provide a proper Email or TIN or Shipping Address"
        );
      }
      await onPayment({
        email,
        TIN: tin,
        shippingAddress: address,
        eta: cartData.eta,
        totalAmount
      });
      console.log("handle");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <>
      <div className="flex justify-center mt-24 gap-12">
        <Card className=" min-w-2/5 border-zinc-800 bg-zinc-950/80 text-zinc-100 shadow-lg backdrop-blur">
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
                          <span className="text-xs text-zinc-500">
                            No image
                          </span>
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
                          onClick={() => removeFromCartCall(c._id)}
                          disabled={removeFromCartLoading}
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
              onClick={() => handleCheckout()}
            >
              Checkout
            </Button>
          </CardFooter>
        </Card>
        {cartData && (
          <AddressComp
            date={new Date(cartData.eta)}
            setTin={setTin}
            setEmail={setEmail}
            setAddress={setAddress}
          />
        )}
      </div>
    </>
  );
}
