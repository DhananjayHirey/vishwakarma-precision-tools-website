import { getSalesMetrics } from "@/api/admin.api"
import { useApi } from "@/api/useFetch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package, Timer, IndianRupee } from "lucide-react"
import { useEffect, useState } from "react"

const iconMap: Record<string, any> = {
    totalSales: IndianRupee,
    totalOrders: ShoppingCart,
    shippedItems: Package,
    pendingOrders: Timer,
}

const bgStyles: Record<string, string> = {
    totalSales: "from-yellow-500/10 to-yellow-500/5",
    totalOrders: "from-purple-500/10 to-purple-500/5",
    shippedItems: "from-green-500/10 to-green-500/5",
    pendingOrders: "from-red-500/10 to-red-500/5",
}

const textStyles: Record<string, string> = {
    totalSales: "text-yellow-600 dark:text-yellow-400",
    totalOrders: "text-purple-600 dark:text-purple-400",
    shippedItems: "text-green-600 dark:text-green-400",
    pendingOrders: "text-red-600 dark:text-red-400",
}

export default function SalesMetrics() {
    const { call: getMetrics, loading, error } = useApi(getSalesMetrics)
    const [metrics, setMetrics] = useState<any>(null)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await getMetrics()
                setMetrics(response?.metrics) // <-- FIXED ACCESS
            } catch (err) {
                console.error("Failed to fetch sales metrics:", err)
            }
        }
        fetchMetrics()
    }, [getMetrics])

    if (loading) return <p className="text-center text-2xl italic font-semibold text-muted-foreground py-4">📦 Loading metrics...</p>
    if (error) return <p className="text-red-500 text-center py-4">❌ Failed to load metrics</p>
    if (!metrics) return null

    const displayData = [
        
        { key: "totalSales", label: "Total Sales", value: `₹${metrics.totalSales}` },
        { key: "totalOrders", label: "Total Orders", value: metrics.totalOrders },
        { key: "shippedItems", label: "Items Shipped", value: metrics.shippedItems },
        { key: "pendingOrders", label: "Pending Orders", value: metrics.pendingOrders },
    ]

    return (
        <div className="space-y-12">
            {/* ---------- METRICS GRID ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                {displayData.map((item) => {
                    const Icon = iconMap[item.key]
                    return (
                        <Card
                            key={item.key}
                            className="border border-border/50 bg-gradient-to-br bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {item.label}
                                    </CardTitle>
                                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${bgStyles[item.key]}`}>
                                        <Icon className={`w-5 h-5 ${textStyles[item.key]}`} />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.value}</div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* ---------- TOP PRODUCTS ----------- */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">🔥 Top Selling Products</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {metrics.topProducts?.length === 0 && (
                        <p className="text-muted-foreground text-sm">No product sales yet.</p>
                    )}

                    {/* Product List */}
                    <div className="grid gap-5">
                        {metrics.topProducts?.map((product: any) => (
                            <div
                                key={product.productId}
                                className="flex items-center justify-between border p-3 rounded-xl hover:bg-muted/30 transition"
                            >
                                {/* Left: Image + Details */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={product.signedImageUrl}
                                        alt={product.name}
                                        className="w-14 h-14 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">₹{product.price}</p>
                                    </div>
                                </div>

                                {/* Right: Sales Count */}
                                <p className="font-semibold text-green-600 dark:text-green-400">
                                    {product.sold} sold
                                </p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
