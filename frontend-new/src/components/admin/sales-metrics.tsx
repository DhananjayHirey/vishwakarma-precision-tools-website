"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, TrendingUp, Package, DollarSign } from "lucide-react"

export default function SalesMetrics() {
    const metrics = [
        {
            title: "Total Sales",
            value: "$12,459.99",
            change: "+12.5%",
            icon: DollarSign,
            color: "bg-blue-500/10 text-blue-600",
        },
        {
            title: "Orders",
            value: "142",
            change: "+8.2%",
            icon: ShoppingCart,
            color: "bg-purple-500/10 text-purple-600",
        },
        {
            title: "Items Shipped",
            value: "128",
            change: "+15.3%",
            icon: Package,
            color: "bg-green-500/10 text-green-600",
        },
        {
            title: "Growth",
            value: "+23.8%",
            change: "vs last month",
            icon: TrendingUp,
            color: "bg-orange-500/10 text-orange-600",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => {
                const Icon = metric.icon
                return (
                    <Card key={metric.title} className="border-border/50">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                                <div className={`p-2 rounded-lg ${metric.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                            <p className="text-xs text-green-600 font-medium mt-1">{metric.change}</p>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
