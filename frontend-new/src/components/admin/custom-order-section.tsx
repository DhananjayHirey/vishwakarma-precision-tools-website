"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomOrder {
    id: string
    customer: string
    request: string
    date: string
    status: "pending" | "approved" | "rejected"
}

interface CustomOrdersSectionProps {
    customOrders: CustomOrder[]
    onUpdateStatus: (orderId: string, status: string) => void
}

const customOrderStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-700 dark:text-yellow-500",
        label: "Pending",
    },
    approved: {
        bg: "bg-green-500/10",
        text: "text-green-700 dark:text-green-500",
        label: "Approved",
    },
    rejected: { bg: "bg-red-500/10", text: "text-red-700 dark:text-red-500", label: "Rejected" },
}

export default function CustomOrdersSection({ customOrders, onUpdateStatus }: CustomOrdersSectionProps) {
    const [selectedCustomOrder, setSelectedCustomOrder] = useState<CustomOrder | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [customOrderStatus, setCustomOrderStatus] = useState("")

    const handleEditClick = (order: CustomOrder) => {
        setSelectedCustomOrder(order)
        setCustomOrderStatus(order.status)
        setIsDialogOpen(true)
    }

    const handleSave = () => {
        if (selectedCustomOrder) {
            onUpdateStatus(selectedCustomOrder.id, customOrderStatus)
            setIsDialogOpen(false)
        }
    }

    return (
        <>
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-lg">Custom Order Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    {customOrders.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No custom orders yet</p>
                    ) : (
                        <div className="space-y-3">
                            {customOrders.map((order) => {
                                const statusConfig = customOrderStatusConfig[order.status] || customOrderStatusConfig.pending
                                return (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-foreground">{order.id}</p>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
                                                >
                                                    {statusConfig.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-1">{order.customer}</p>
                                            <p className="text-sm text-foreground">{order.request}</p>
                                            <p className="text-xs text-muted-foreground mt-1">Requested: {order.date}</p>
                                        </div>
                                        <Button variant="outline" onClick={() => handleEditClick(order)} className="ml-4">
                                            Review
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {selectedCustomOrder && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Review Custom Order</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                                <p className="text-lg font-semibold text-foreground">{selectedCustomOrder.id}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Customer</p>
                                <p className="text-foreground">{selectedCustomOrder.customer}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Request</p>
                                <p className="text-foreground">{selectedCustomOrder.request}</p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Requested Date</p>
                                <p className="text-foreground">{selectedCustomOrder.date}</p>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="custom-status">Status</Label>
                                <Select value={customOrderStatus} onValueChange={setCustomOrderStatus}>
                                    <SelectTrigger id="custom-status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save Status</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
