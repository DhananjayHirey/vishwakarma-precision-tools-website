
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import { EditOrderDialog } from "./edit-order-dialog"
import { ChevronRight } from "lucide-react"

interface Order {
    id: string
    customer: string
    date: string
    total: number
    items: number
    paymentStatus: "completed" | "pending" | "failed"
    deliveryStatus: "pending" | "processing" | "shipped" | "delivered"
}

interface OrdersSectionProps {
    orders: Order[]
    onUpdateStatus: (orderId: string, paymentStatus: string, deliveryStatus: string) => void
    showQuickView?: boolean
}

export default function OrdersSection({ orders, onUpdateStatus, showQuickView }: OrdersSectionProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleEditClick = (order: Order) => {
        setSelectedOrder(order)
        setIsDialogOpen(true)
    }

    const handleSave = (paymentStatus: string, deliveryStatus: string) => {
        if (selectedOrder) {
            onUpdateStatus(selectedOrder.id, paymentStatus, deliveryStatus)
            setIsDialogOpen(false)
        }
    }

    const displayOrders = showQuickView ? orders.slice(0, 3) : orders

    return (
        <>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground">Orders</CardTitle>
                        {showQuickView && <span className="text-xs text-muted-foreground">{orders.length} total</span>}
                    </div>
                </CardHeader>
                <CardContent>
                    {showQuickView ? (
                        <div className="space-y-3">
                            {displayOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-foreground truncate">{order.customer}</p>
                                        <p className="text-xs text-muted-foreground">{order.id}</p>
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
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Order ID</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Customer</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Total</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Items</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Payment</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Delivery</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4 font-semibold text-foreground">{order.id}</td>
                                            <td className="py-3 px-4 text-foreground">{order.customer}</td>
                                            <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                                            <td className="py-3 px-4 text-foreground font-semibold">${order.total}</td>
                                            <td className="py-3 px-4 text-foreground">{order.items}</td>
                                            <td className="py-3 px-4">
                                                <StatusBadge status={order.paymentStatus} type="payment" />
                                            </td>
                                            <td className="py-3 px-4">
                                                <StatusBadge status={order.deliveryStatus} type="delivery" />
                                            </td>
                                            <td className="py-3 px-4">
                                                <Button variant="outline" size="sm" onClick={() => handleEditClick(order)} className="text-xs">
                                                    Edit
                                                </Button>
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
                <EditOrderDialog order={selectedOrder} open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleSave} />
            )}
        </>
    )
}
