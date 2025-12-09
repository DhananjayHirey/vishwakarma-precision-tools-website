import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ChevronRight } from "lucide-react"
import { useApi } from "@/api/useFetch"
import { getCustomOrders, updateCustomOrderStatus } from "@/api/orders.api"

interface CustomOrder {
    _id: string
    orderingParty: {
        _id: string
        name: string
        email: string
    }
    customOrderDetails: string
    orderDate: string
    signedAttachmentUrl?: string | null
    customOrderReviewStatus: "pending" | "approved" | "rejected"
    eta?: string | null
    totalBilling?: number | null
}

interface CustomOrdersSectionProps {
    showQuickView?: boolean
}

const statusStyles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    approved: "bg-green-500/10 text-green-700 dark:text-green-400",
    rejected: "bg-red-500/10 text-red-700 dark:text-red-400",
}

export default function CustomOrdersSection({ showQuickView }: CustomOrdersSectionProps) {

    const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [customOrders, setCustomOrders] = useState<CustomOrder[]>([])

    const [status, setStatus] = useState<CustomOrder["customOrderReviewStatus"]>("pending")
    const [eta, setEta] = useState("")
    const [billing, setBilling] = useState("")

    const { call: getOrders, loading } = useApi(getCustomOrders)
    const { call: updateStatus, loading: updateLoading } = useApi(updateCustomOrderStatus)

    useEffect(() => {
        async function fetchOrders() {
            const orders = await getOrders()
            console.log("Custom orders res", orders);

            setCustomOrders(orders)
        }
        fetchOrders()
    }, [getOrders])

    const openEdit = (order: CustomOrder) => {
        setSelectedOrder(order)
        setStatus(order.customOrderReviewStatus)
        setEta(order.eta || "")
        setBilling(order.totalBilling?.toString() || "")
        setIsDialogOpen(true)
    }

    const handleSave = async () => {
        if (!selectedOrder) return
        try {
            const payload = {
                orderId: selectedOrder._id,
                totalBilling: Number(billing),
                eta: eta || null,
                customOrderReviewStatus: status,
            }
            const res = await updateStatus(payload)
            console.log("Update custom order status res", res);
            setCustomOrders(customOrders.map((order) => (order._id === selectedOrder._id ? { ...order, ...payload } : order)))
            setIsDialogOpen(false)
        } catch (error: any) {
            console.error("Error updating custom order status:", error)

        }
        console.log("Saving custom order:", selectedOrder);

    }

    const displayOrders = showQuickView ? customOrders.slice(0, 3) : customOrders

    return (
        <>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground">Custom Orders</CardTitle>
                        {showQuickView && <span className="text-xs text-muted-foreground">{customOrders.length} total</span>}
                    </div>
                </CardHeader>

                <CardContent>
                    {displayOrders.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">No custom orders</p>
                    ) : showQuickView ? (
                        <div className="space-y-3">
                            {displayOrders.map(order => {
                                const cls = statusStyles[order.customOrderReviewStatus]
                                return (
                                    <div key={order._id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-sm text-foreground">{order._id}</p>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
                                                    {order.customOrderReviewStatus}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">{order.orderingParty.name}</p>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => openEdit(order)} className="h-8 w-8 p-0">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {displayOrders.map(order => {
                                const cls = statusStyles[order.customOrderReviewStatus]
                                return (
                                    <div key={order._id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-semibold text-foreground">{order._id}</p>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
                                                    {order.customOrderReviewStatus}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-1">{order.orderingParty.email}</p>
                                            <p className="text-sm text-foreground">{order.customOrderDetails}</p>
                                            <p className="text-xs text-muted-foreground mt-1">Requested: {new Date(order.orderDate).toLocaleDateString()}</p>
                                        </div>
                                        <Button variant="outline" onClick={() => openEdit(order)} className="ml-4">Review</Button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {selectedOrder && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                    <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                        <DialogHeader>
                            <DialogTitle>Review Custom Order</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 py-4">

                            {selectedOrder.signedAttachmentUrl && (
                                <img src={selectedOrder.signedAttachmentUrl} className="rounded-lg mb-3" />
                            )}

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Customer</p>
                                <p className="text-foreground">{selectedOrder.orderingParty.name}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Request</p>
                                <p className="text-foreground">{selectedOrder.customOrderDetails}</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={status} onValueChange={(value) => setStatus(value as CustomOrder["customOrderReviewStatus"])}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>ETA</Label>
                                <Input type="date" value={eta} onChange={(e) => setEta(e.target.value)} />
                            </div>

                            <div className="space-y-2">
                                <Label>Total Billing (₹)</Label>
                                <Input type="number" value={billing} onChange={(e) => setBilling(e.target.value)} />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave} disabled={updateLoading}>{updateLoading ? "Saving..." : "Save"}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    )
}
