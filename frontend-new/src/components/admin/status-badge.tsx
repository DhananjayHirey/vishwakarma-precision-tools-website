

const paymentStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-yellow-500/10", text: "text-yellow-700 dark:text-yellow-500", label: "Pending" },
    completed: {
        bg: "bg-green-500/10",
        text: "text-green-700 dark:text-green-500",
        label: "Completed",
    },
    failed: { bg: "bg-red-500/10", text: "text-red-700 dark:text-red-500", label: "Failed" },
}

const orderStatusConfig: Record<string, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-amber-500/10", text: "text-amber-700 dark:text-amber-500", label: "Pending" },
    "out for delivery": { bg: "bg-purple-500/10", text: "text-purple-700 dark:text-purple-500", label: "Out for Delivery" },
    delivered: {
        bg: "bg-green-500/10",
        text: "text-green-700 dark:text-green-500",
        label: "Delivered",
    },
    manufacturing: {
        bg: "bg-cyan-500/10",
        text: "text-cyan-700 dark:text-cyan-500",
        label: "Manufacturing",
    },
    rejected: { bg: "bg-red-500/10", text: "text-red-700 dark:text-red-500", label: "Rejected" },
}

interface StatusBadgeProps {
    status: string
    type: "payment" | "orderStatus"
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
    const config = type === "payment" ? paymentStatusConfig : orderStatusConfig
    const statusConfig = config[status] || config.pending
    // console.log("status connfig",statusConfig);
    
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-semibold italic ${statusConfig.bg} ${statusConfig.text}`}
        >
            {statusConfig.label}
        </span>
    )
}
