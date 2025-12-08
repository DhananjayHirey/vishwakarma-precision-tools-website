import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import { EditOrderDialog } from "./edit-order-dialog"
import { ChevronRight } from "lucide-react"
import { useApi } from "@/api/useFetch"
import { getAllOrders, updateOrderStatus, updatePaymentStatus } from "@/api/orders.api"
import { ShineBorder } from "../ui/shine-border"

export interface Order {
    id: string
    customer: string
    date: string
    total: number
    items: number
    paymentStatus: "completed" | "pending"
    orderStatus: "pending" | "out for delivery" | "rejected" | "delivered" |  "manufacturing"
}

interface OrdersSectionProps {
    showQuickView?: boolean
}

const normalizeOrders = (apiOrders: any[]): Order[] => {
    return apiOrders.map(order => ({
        id: order._id,
        customer: order.orderingParty?.name ?? "Unknown",
        date: new Date(order.orderDate).toLocaleDateString(),
        total: order.totalBilling,
        items: order.orderList.reduce((sum: number, item: any) => sum + item.quantity, 0),
        paymentStatus: order.paymentStatus ? "completed" : "pending",
        orderStatus: order.orderStatus
    }))
}


export default function OrdersSection({ showQuickView }: OrdersSectionProps) {
    const [orders, setOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { call: getOrders, loading: ordersLoading } = useApi(getAllOrders)
    const { call: updateDelivery, loading: updatingDeliveryStatus } = useApi(updateOrderStatus);
    const { call: updatePayment, loading: updatingPaymentStatus } = useApi(updatePaymentStatus);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders()
                console.log("Order response", response);

                const formatted = normalizeOrders(response)
                setOrders(formatted)
            } catch (err) {
                console.error("Failed to fetch orders:", err)
            }
        }

        fetchOrders()
    }, [getOrders])

    const handleEditClick = (order: Order) => {
        setSelectedOrder(order)
        setIsDialogOpen(true)
    }
    const isUpdating = updatingDeliveryStatus || updatingPaymentStatus;


    const handleSave = async (paymentStatus: string, orderStatus: string) => {
        if (!selectedOrder) return;
        try {
            // Only call payment API if changed
            if (paymentStatus !== selectedOrder.paymentStatus) {
                const response = await updatePayment(selectedOrder.id, paymentStatus=== "completed");
                console.log("Payment update response:", response);
            }

            // Only call delivery API if changed
            if (orderStatus !== selectedOrder.orderStatus) {
                const res = await updateDelivery(selectedOrder.id, orderStatus);
                console.log("Delivery update response:", res);
            }

            // Optimistically update UI
            setOrders(prev =>
                prev.map(order =>
                    order.id === selectedOrder.id
                        ? { ...order, paymentStatus: paymentStatus as "completed" | "pending", orderStatus: orderStatus as "pending" | "out for delivery" | "rejected" | "delivered" |  "manufacturing" }
                        : order
                )
            );

            setIsDialogOpen(false);
        } catch (err) {
            console.error("Error updating order:", err);
        }
    }

    const displayOrders = showQuickView ? orders.slice(0, 3) : orders

    return (
        <>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
        <ShineBorder className="rounded-2xl" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-foreground">Orders Overall</CardTitle>
                        {showQuickView && <span className="text-xs text-muted-foreground">{orders.length} total</span>}
                    </div>
                </CardHeader>

                <CardContent>
                    {ordersLoading && <p className="text-muted-foreground text-sm">Loading orders...</p>}

                    {showQuickView ? (
                        <div className="space-y-3">
                            {displayOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0 space-y-0.5">
                                        <p className="font-semibold text-sm text-foreground truncate">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">Rs.{order.total}</p>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                        <StatusBadge status={order.paymentStatus} type="payment" />
                                        <Button variant="ghost" size="sm" onClick={() => handleEditClick(order)} className="h-8 w-8 p-0">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/50">
                                        {/* <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Order ID</th> */}
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Customer Name</th>
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Total</th>
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Items</th>
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Payment Status</th>
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Delivery Status</th>
                                        <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                            {/* <td className="px-4 py-3 text-foreground font-semibold">{order.id}</td> */}
                                            <td className="px-4 py-3 text-foreground">{order.customer}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                                            <td className="px-4 py-3 font-semibold">Rs. {order.total}</td>
                                            <td className="px-4 py-3">{order.items}</td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={order.paymentStatus} type="payment" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={order.orderStatus} type="orderStatus" />
                                            </td>
                                            <td className="px-4 py-3">
                                                <Button variant="outline" size="sm" onClick={() => handleEditClick(order)}>Edit</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {selectedOrder && (
                <EditOrderDialog
                    order={selectedOrder}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onSave={handleSave}
                    loading={isUpdating}
                />
            )}
        </>
    )
}
