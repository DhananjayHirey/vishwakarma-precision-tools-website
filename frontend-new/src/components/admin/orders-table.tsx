"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./status-badge"
import { EditOrderDialog } from "./edit-order-dialog"

interface Order {
    id: string
    customer: string
    date: string
    total: number
    items: number
    paymentStatus: "completed" | "pending" | "failed"
    deliveryStatus: "pending" | "processing" | "shipped" | "delivered"
}

interface OrdersTableProps {
    orders: Order[]
    onUpdateStatus: (orderId: string, paymentStatus: string, deliveryStatus: string) => void
}

export default function OrdersTable({ orders, onUpdateStatus }: OrdersTableProps) {
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

    return (
        <>
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
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
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
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
                </CardContent>
            </Card>

            {selectedOrder && (
                <EditOrderDialog order={selectedOrder} open={isDialogOpen} onOpenChange={setIsDialogOpen} onSave={handleSave} />
            )}
        </>
    )
}
