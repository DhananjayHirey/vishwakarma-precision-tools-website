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
type Section = "overview" | "orders" | "custom" | "products"

function RouteComponent() {
    useAdminGuard('/')
    const [activeSection, setActiveSection] = useState<Section>("overview")

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

    const [products, setProducts] = useState([
        {
            id: "PRD-001",
            name: "Premium Wireless Headphones",
            description: "High-quality audio with noise cancellation",
            price: 299.99,
            image: "/wireless-headphones.png",
            stock: 45,
            category: "Electronics",
            sold: 120,
        },
        {
            id: "PRD-002",
            name: "Leather Messenger Bag",
            description: "Durable and stylish messenger bag",
            price: 129.99,
            image: "/brown-leather-messenger-bag.png",
            stock: 32,
            category: "Accessories",
            sold: 87,
        },
        {
            id: "PRD-003",
            name: "Smart Watch",
            description: "Track fitness and stay connected",
            price: 199.99,
            image: "/smartwatch-lifestyle.png",
            stock: 18,
            category: "Electronics",
            sold: 203,
        },
    ])

    const updateOrderStatus = (orderId: string, paymentStatus: string, deliveryStatus: string) => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, paymentStatus, deliveryStatus } : order)))
    }

    const updateCustomOrderStatus = (orderId: string, status: string) => {
        setCustomOrders(customOrders.map((order) => (order.id === orderId ? { ...order, status } : order)))
    }

    const addProduct = (newProduct: any) => {
        setProducts([
            ...products,
            {
                ...newProduct,
                id: `PRD-${Date.now()}`,
                sold: 0,
            },
        ])
    }

    const updateProduct = (productId: string, updatedData: any) => {
        setProducts(products.map((product) => (product.id === productId ? { ...product, ...updatedData } : product)))
    }

    const deleteProduct = (productId: string) => {
        setProducts(products.filter((product) => product.id !== productId))
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
                                <OrdersSection orders={orders} onUpdateStatus={updateOrderStatus} showQuickView />
                                <CustomOrdersSection
                                    customOrders={customOrders}
                                    onUpdateStatus={updateCustomOrderStatus}
                                    showQuickView
                                />
                                <ProductsSection
                                    products={products}
                                    onAddProduct={addProduct}
                                    onUpdateProduct={updateProduct}
                                    onDeleteProduct={deleteProduct}
                                    showQuickView
                                />
                            </div>
                        </div>
                    )}

                    {activeSection === "orders" && <OrdersSection orders={orders} onUpdateStatus={updateOrderStatus} />}

                    {activeSection === "custom" && (
                        <CustomOrdersSection customOrders={customOrders} onUpdateStatus={updateCustomOrderStatus} />
                    )}

                    {activeSection === "products" && (
                        <ProductsSection
                            products={products}
                            onAddProduct={addProduct}
                            onUpdateProduct={updateProduct}
                            onDeleteProduct={deleteProduct}
                        />
                    )}
                </div>
            </div>
        </main>
    )
}
