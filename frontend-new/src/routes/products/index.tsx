import { createFileRoute } from "@tanstack/react-router";
import { useActionState, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";
import ProductCard from "@/components/ProductCard";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ProductDetails from "@/components/ProductDetails";
import { Minus, Plus } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
import { useApi } from "@/api/useFetch";
import { getAllProducts } from "@/api/product.api";
import { addToCart } from "@/api/cart.api";

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
});

interface Item {
  _id: string;
  product: string;
  quantity: number;
}

function RouteComponent() {
  const [productsData, setProductsData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const {
    call: getProductsCall,
    data: products,
    loading: loadingProducts,
    error: productsLoadError,
  } = useApi(getAllProducts);

  const {
    call: addToCartCall,
    data: addToCartData,
    loading: addToCartLoading,
    error: addToCartError,
  } = useApi(addToCart);

  useEffect(() => {
    if (addToCartLoading) {
      toast.loading("Item is being added to cart...", {
        id: "add-cart",
      });
    }
  }, [addToCartLoading]);
  useEffect(() => {
    if (addToCartError) {
      toast.error("Some error occured while adding to cart", {
        id: "add-cart",
      });
    }
  }, [addToCartError]);

  useEffect(() => {
    getProductsCall();
  }, []);

  useEffect(() => {
    if (products) {
      setProductsData(products);
      toast.success("Products fetched successfully!", {
        id: "get-prod",
      });
    }
  }, [products]);
  useEffect(() => {
    if (loadingProducts) {
      toast.loading("Loading products...", {
        id: "get-prod",
      });
    }
  }, [loadingProducts]);
  useEffect(() => {
    if (productsLoadError) {
      toast.error(
        "Some error occured while fetching products: " + productsLoadError,
        {
          id: "get-prod",
        }
      );
    }
  }, [productsLoadError]);

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

  useEffect(() => {
    const cat = [...new Set(productsData.map((p) => p?.category))];
    setCategory(cat);
  }, [productsData]);

  const onPayment = async (orderObject: Item[]) => {
    if (orderObject.length == 0) {
      return alert("Please add a product to your cart first");
    } else console.log(orderObject);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/createOrder",
        { orderObject },
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
          };
          axios
            .post("http://localhost:5000/api/payments/verifyPayment", options)
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                alert("Payment Successful");
              } else {
                console.log("Payment failed");
              }
            })
            .catch((e) => {
              console.log(e);
            });
        },
      });
      paymentObject.open();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <SidebarProvider>
        <Drawer>
          <AppSidebar
            prodCategories={category}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <SidebarTrigger className="bg-white" />
          <div className="grid grid-cols-3 space-x-4 mt-24 space-y-4">
            {productsData.length > 0 &&
              selectedCategories.length > 0 &&
              productsData?.map(
                (prod) =>
                  selectedCategories.includes(prod.category) && (
                    <ProductCard
                      imageUri={
                        "https://i.ibb.co/qM1kdnbt/517-BP179xk-L-UL500.jpg"
                      }
                      prod={prod}
                      setSelectedProduct={setSelectedProduct}
                      key={prod._id}
                    />
                  )
              )}
            {selectedCategories.length == 0 &&
              productsData.length > 0 &&
              productsData.map((prod) => (
                <ProductCard
                  imageUri="https://i.ibb.co/qM1kdnbt/517-BP179xk-L-UL500.jpg"
                  prod={prod}
                  setSelectedProduct={setSelectedProduct}
                  key={prod._id}
                />
              ))}
          </div>
          {/* <div className="flex flex-col">
            <p className="text-white">Cart: </p>
            {cart.map((cartItem: { product: string; quantity: number }) => {
              return (
                <p className="text-white" key={cartItem.product}>
                  {cartItem.product}, {cartItem.quantity}
                </p>
              );
            })}
            <button
              className="border-2 bg-white text-black font-bold p-2 rounded-md cursor-pointer"
              onClick={() => onPayment(cart)}
            >
              Proceed to Payment
            </button>
          </div> */}
          <DrawerContent className="bg-black px-30">
            <DrawerHeader>
              <DrawerTitle className="text-white">Product Details</DrawerTitle>
              <DrawerDescription className="text-white">
                This is some description
              </DrawerDescription>
              <div>
                <ProductDetails selectedProduct={selectedProduct} />
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <div className=" pb-0">
                <div className="flex items-center justify-end space-x-2">
                  <p className="text-4xl text-zinc-50 ">Quantity</p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full bg-zinc-800 text-zinc-400 ms-12"
                    onClick={() => setQuantity((quantity) => quantity - 1)}
                    disabled={quantity <= 0}
                  >
                    <Minus />
                    <span className="sr-only text-zinc-100">Decrease</span>
                  </Button>
                  <div className="text-center">
                    <div className="text-4xl font-bold tracking-tighter text-zinc-200 px-4">
                      {quantity}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full bg-zinc-800 text-zinc-400"
                    onClick={() => setQuantity((quantity) => quantity + 1)}
                    disabled={quantity >= 100}
                  >
                    <Plus />
                    <span className="sr-only">Increase</span>
                  </Button>
                  <div className="ms-24 text-zinc-50 text-4xl">
                    Total Price: Rs. {quantity * selectedProduct.price}
                  </div>
                  <div className="ms-12">
                    <RippleButton
                      className={
                        "bg-zinc-100 text-2xl text-zinc-900 rounded-lg font-bold"
                      }
                      rippleColor="black"
                      duration={400}
                      onClick={() => {
                        addToCartCall(selectedProduct._id, quantity);
                      }}
                    >
                      Add to Cart
                    </RippleButton>
                  </div>
                </div>
              </div>
              {/* <Button>Submit</Button> */}
              <DrawerClose asChild>
                <Button variant="outline" className="w-3/5 mx-auto">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </SidebarProvider>
    </>
  );
}
