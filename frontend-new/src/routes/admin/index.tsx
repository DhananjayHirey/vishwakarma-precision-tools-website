import CustomOrdersSection from '@/components/admin/custom-order-section'
import OrdersTable from '@/components/admin/orders-table'
import SalesMetrics from '@/components/admin/sales-metrics'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/redux/hooks'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/')({
    component: RouteComponent,
})


function RouteComponent() {
    const isAdmin = useAppSelector(state => state.auth.user?.role === 'admin')
    const navigate = useNavigate()

    if (!isAdmin) {
        return <div className="min-h-screen flex items-center text-4xl justify-center flex-col gap-5  text-red-800">
            You do not have access to this page.
            <br />
            <Button onClick={() => navigate({ to: '/' })}>Go to Home</Button>
        </div>
    }

    const [orders, setOrders] = useState([
        {
            id: "ORD-001",
            customer: "John Doe",
            date: "2025-01-10",
            total: 299.99,
            items: 3,
            paymentStatus: "completed",
            deliveryStatus: "shipped",
        },
        {
            id: "ORD-002",
            customer: "Jane Smith",
            date: "2025-01-09",
            total: 149.99,
            items: 2,
            paymentStatus: "pending",
            deliveryStatus: "processing",
        },
        {
            id: "ORD-003",
            customer: "Bob Johnson",
            date: "2025-01-08",
            total: 599.99,
            items: 5,
            paymentStatus: "completed",
            deliveryStatus: "delivered",
        },
        {
            id: "ORD-004",
            customer: "Alice Brown",
            date: "2025-01-07",
            total: 199.99,
            items: 2,
            paymentStatus: "failed",
            deliveryStatus: "pending",
        },
    ])

    const [customOrders, setCustomOrders] = useState([
        {
            id: "CUSTOM-001",
            customer: "Mike Wilson",
            request: "Custom engraved photo frame",
            date: "2025-01-09",
            status: "pending",
        },
        {
            id: "CUSTOM-002",
            customer: "Sarah Lee",
            request: "Personalized leather wallet",
            date: "2025-01-08",
            status: "approved",
        },
    ])

    const updateOrderStatus = (orderId: string, paymentStatus: string, deliveryStatus: string) => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, paymentStatus, deliveryStatus } : order)))
    }

    const updateCustomOrderStatus = (orderId: string, status: string) => {
        setCustomOrders(customOrders.map((order) => (order.id === orderId ? { ...order, status } : order)))
    }
    return (
        <main className="min-h-screen bg-background p-6 mt-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Manage your store, orders, and sales</p>
                </div>

                {/* Sales Metrics */}
                <SalesMetrics />

                {/* Orders Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">All Orders</h2>
                    <OrdersTable orders={orders} onUpdateStatus={updateOrderStatus} />
                </div>

                {/* Custom Orders Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Custom Orders</h2>
                    <CustomOrdersSection customOrders={customOrders} onUpdateStatus={updateCustomOrderStatus} />
                </div>
            </div>
        </main>
    )
}
