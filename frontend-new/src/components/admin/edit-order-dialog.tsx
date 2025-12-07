
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
    id: string
    customer: string
    date: string
    total: number
    items: number
    paymentStatus: string
    deliveryStatus: string
}

interface EditOrderDialogProps {
    order: Order
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (paymentStatus: string, deliveryStatus: string) => void
}

export function EditOrderDialog({ order, open, onOpenChange, onSave }: EditOrderDialogProps) {
    const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
    const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus)

    const handleSave = () => {
        onSave(paymentStatus, deliveryStatus)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Order Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                        <p className="text-lg font-semibold text-foreground">{order.id}</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Customer</p>
                        <p className="text-foreground">{order.customer}</p>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="payment-status">Payment Status</Label>
                        <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                            <SelectTrigger id="payment-status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="delivery-status">Delivery Status</Label>
                        <Select value={deliveryStatus} onValueChange={setDeliveryStatus}>
                            <SelectTrigger id="delivery-status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
