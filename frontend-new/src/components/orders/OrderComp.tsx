import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSideBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Factory,
  Calendar,
  Mail,
  MapPin,
  FileText,
  IndianRupee,
} from "lucide-react";
import { useApi } from "@/api/useFetch";
import { getUserOrders } from "@/api/orders.api";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  etp: number;
  signedImageUrl?: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  orderList: OrderItem[];
  shippingAddress: string;
  TIN: string;
  email: string;
  orderDate: string;
  expectedDateByClient: string | null;
  eta: string | null;
  paymentStatus: boolean;
  totalBilling: number;
  orderStatus:
    | "pending"
    | "manufacturing"
    | "out for delivery"
    | "delivered"
    | "rejected";
  isCustomOrder: boolean;
  customOrderDetails: string;
  customOrderAttachment: string;
  customOrderReviewStatus: "pending" | "approved" | "rejected";
  customOrderAttachmentSignedUrl: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="w-5 h-5" />;
    case "manufacturing":
      return <Factory className="w-5 h-5" />;
    case "out for delivery":
      return <Truck className="w-5 h-5" />;
    case "delivered":
      return <CheckCircle className="w-5 h-5" />;
    case "rejected":
      return <XCircle className="w-5 h-5" />;
    default:
      return <Package className="w-5 h-5" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "manufacturing":
      return "bg-blue-500 hover:bg-blue-600";
    case "out for delivery":
      return "bg-purple-500 hover:bg-purple-600";
    case "delivered":
      return "bg-green-500 hover:bg-green-600";
    case "rejected":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Not specified";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function OrderComp() {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const {
    call: getOrdersCall,
    data: orders,
    loading: loadingOrders,
    error: ordersLoadError,
  } = useApi(getUserOrders);

  const nav = useNavigate();

  useEffect(() => {
    getOrdersCall();
  }, []);

  useEffect(() => {
    if (loadingOrders) {
      toast.loading("Loading orders...", {
        id: "get-orders",
      });
    }
  }, [loadingOrders]);

  useEffect(() => {
    if (orders) {
      setOrdersData(orders);
      toast.success("Orders fetched successfully!", {
        id: "get-orders",
      });
    }
  }, [orders]);

  useEffect(() => {
    if (ordersLoadError) {
      toast.error("Error fetching orders: " + ordersLoadError, {
        id: "get-orders",
      });
    }
  }, [ordersLoadError]);

  return (
    <div className="flex-1 w-full bg-background">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              My Orders
            </h1>
          </div>
          <Badge variant="secondary" className="text-sm sm:text-base">
            {ordersData.length} {ordersData.length === 1 ? "Order" : "Orders"}
          </Badge>
        </div>

        {/* Orders List */}
        {ordersData.length === 0 && !loadingOrders ? (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20">
            <Package className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-6 text-center px-4">
              Start shopping to see your orders here
            </p>
            <Button onClick={() => nav({ to: "/products" })}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {ordersData.map((order) => (
              <Card
                key={order._id}
                className="overflow-hidden hover:shadow-lg transition-shadow border-border bg-zinc-800"
              >
                <CardHeader className="bg-muted/50 border-b border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl mb-2">
                        Order #{order._id.toUpperCase()}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Ordered: {formatDate(order.orderDate)}</span>
                        {order.isCustomOrder && (
                          <Badge variant="outline" className="ml-2">
                            Custom Order
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <Badge
                        className={`${getStatusColor(order.orderStatus)} text-white`}
                      >
                        <span className="flex items-center gap-2">
                          {getStatusIcon(order.orderStatus)}
                          <span className="capitalize">
                            {order.orderStatus}
                          </span>
                        </span>
                      </Badge>
                      {order.paymentStatus ? (
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50">
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50">
                          Unpaid
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-base sm:text-lg text-foreground">
                      Order Items:
                    </h3>
                    <div className="space-y-3">
                      {order.orderList.map((item) => (
                        <div
                          key={item._id}
                          className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border"
                        >
                          <img
                            src={item.product.signedImageUrl}
                            alt={item.product.name}
                            className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded border border-border"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm sm:text-base text-foreground">
                              {item.product.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {item.product.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm">
                              <span className="text-muted-foreground">
                                Qty: {item.quantity}
                              </span>
                              <span className="text-muted-foreground">
                                Price: ₹{item.product.price}
                              </span>
                              <span className="font-semibold text-foreground">
                                Total: ₹{item.quantity * item.product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!order.isCustomOrder && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Shipping Address
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {order.shippingAddress}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            Email
                          </p>
                          <p className="text-sm font-medium text-foreground break-all">
                            {order.email}
                          </p>
                        </div>
                      </div>

                      {order.TIN && (
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              TIN
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {order.TIN}
                            </p>
                          </div>
                        </div>
                      )}

                      {order.eta && (
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              ETA
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {formatDate(order.eta)}
                            </p>
                          </div>
                        </div>
                      )}

                      {order.expectedDateByClient && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Expected Date
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {formatDate(order.expectedDateByClient)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Custom Order Details */}
                  {order.isCustomOrder && order.customOrderDetails && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <h4 className="font-semibold text-sm sm:text-base mb-2 flex items-center gap-2 text-foreground">
                        <FileText className="w-4 h-4" />
                        Custom Order Details
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {order.customOrderDetails}
                      </p>
                      {/* {order.customOrderAttachment && (
                        <a
                          href={order.customOrderAttachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline text-xs sm:text-sm mt-2 inline-block"
                        >
                          View Attachment
                        </a>
                      )} */}
                      <img src={order.customOrderAttachmentSignedUrl} alt="" />
                      <div className="mt-2">
                        <Badge
                          variant={
                            order.customOrderReviewStatus === "approved"
                              ? "default"
                              : order.customOrderReviewStatus === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          Review: {order.customOrderReviewStatus}
                        </Badge>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="bg-muted/50 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-muted-foreground" />
                    <span className="text-lg sm:text-xl font-bold text-foreground">
                      Total: ₹{order.totalBilling}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
