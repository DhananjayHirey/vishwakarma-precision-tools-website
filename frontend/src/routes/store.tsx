import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
export const Route = createFileRoute("/store")({
  component: RouteComponent,
});

interface Item {
  productId: string;
  quantity: number;
}

function RouteComponent() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [items, setItems] = useState<Item[]>([]);

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

  const onPayment = async (orderObject: Item[]) => {
    if (orderObject.length == 0)
      return alert("Please add a product to your cart first");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/createOrder",
        { orderObject }
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

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  function handleAdd() {
    if (!productId || !quantity) return alert("Enter both fields!");

    setItems([...items, { productId, quantity }]);

    // clear inputs
    setProductId("");
    setQuantity(0);
  }

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2 className="text-white">Add Product</h2>

        <input
          type="text"
          className="text-white border-2 border-zinc-100 rounded-md p-2"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="number"
          className="text-white border-2 border-zinc-100 rounded-md p-2"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.valueAsNumber)}
          style={{ marginRight: "10px" }}
        />

        <button
          className="text-white border-2 border-zinc-100 rounded-md p-2 cursor-pointer"
          onClick={handleAdd}
        >
          Add
        </button>

        <h3 className="text-white">Items Added:</h3>
        <ul>
          {items.map((item, idx) => (
            <li className="text-white" key={idx}>
              Product ID: {item.productId} — Quantity: {item.quantity}
            </li>
          ))}
        </ul>
        <button
          className="border-2 bg-white text-black font-bold p-2 rounded-md cursor-pointer"
          onClick={() => onPayment(items)}
        >
          Proceed to Payment
        </button>
      </div>
    </>
  );
}
