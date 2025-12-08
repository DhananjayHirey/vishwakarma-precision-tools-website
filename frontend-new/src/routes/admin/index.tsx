import AdminNavigation from '@/components/admin/admin-navigation'
import CustomOrdersSection from '@/components/admin/custom-order-section'
import OrdersSection from '@/components/admin/order-section'
import ProductsSection from '@/components/admin/products-section'

import SalesMetrics from '@/components/admin/sales-metrics'
import { useAdminGuard } from '@/hooks/guards'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/admin/')({
    component: RouteComponent,
})
type Section = "overview" | "orders"  | "products"| "custom"

function RouteComponent() {
    useAdminGuard('/')
    const [activeSection, setActiveSection] = useState<Section>("overview")


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



    const updateCustomOrderStatus = (orderId: string, status: string) => {
        setCustomOrders(customOrders.map((order) => (order.id === orderId ? { ...order, status } : order)))
    }





    return (
        <main className=" mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="">
                    <div className="px-6 py-6">
                        <div className="mb-4">
                            <h1 className="text-4xl font-bold text-foreground mb-1">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Manage your store, products, and orders</p>
                        </div>
                        <AdminNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 py-8">
                    {activeSection === "overview" && (
                        <div className="space-y-8">
                            <SalesMetrics />
                            <div className="grid grid-cols-3 gap-6">
                                <OrdersSection showQuickView />
                                <CustomOrdersSection
                                    customOrders={customOrders}
                                    onUpdateStatus={updateCustomOrderStatus}
                                    showQuickView
                                />
                                <ProductsSection
                                    showQuickView
                                />
                            </div>
                        </div>
                    )}

                    {activeSection === "orders" && <OrdersSection  />}

                    {activeSection === "custom" && (
                        <CustomOrdersSection customOrders={customOrders} onUpdateStatus={updateCustomOrderStatus} />
                    )}

                    {activeSection === "products" && (
                        <ProductsSection
                        />
                    )}
                </div>
            </div>
        </main>
    )
}
