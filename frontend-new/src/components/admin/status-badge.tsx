"use client"

const paymentStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-yellow-500/10", text: "text-yellow-700 dark:text-yellow-500", label: "Pending" },
    completed: {
        bg: "bg-green-500/10",
        text: "text-green-700 dark:text-green-500",
        label: "Completed",
    },
    failed: { bg: "bg-red-500/10", text: "text-red-700 dark:text-red-500", label: "Failed" },
}

const deliveryStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-slate-500/10", text: "text-slate-700 dark:text-slate-500", label: "Pending" },
    processing: {
        bg: "bg-blue-500/10",
        text: "text-blue-700 dark:text-blue-500",
        label: "Processing",
    },
    shipped: { bg: "bg-purple-500/10", text: "text-purple-700 dark:text-purple-500", label: "Shipped" },
    delivered: {
        bg: "bg-green-500/10",
        text: "text-green-700 dark:text-green-500",
        label: "Delivered",
    },
}

interface StatusBadgeProps {
    status: string
    type: "payment" | "delivery"
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
    const config = type === "payment" ? paymentStatusConfig : deliveryStatusConfig
    const statusConfig = config[status] || config.pending

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
        >
            {statusConfig.label}
        </span>
    )
}
