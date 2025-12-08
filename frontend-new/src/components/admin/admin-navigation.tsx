

import { ShoppingCart, Package, Zap } from "lucide-react"

interface AdminNavigationProps {
    activeSection: string
    onSectionChange: (section: any) => void
}

export default function AdminNavigation({ activeSection, onSectionChange }: AdminNavigationProps) {
    const sections = [
        { id: "overview", label: "Overview", icon: Zap },
        { id: "orders", label: "Orders", icon: ShoppingCart },
        { id: "products", label: "Products", icon: Package },
        { id: "custom", label: "Custom Orders", icon: Package },
    ]

    return (
        <div className="flex gap-2">
            {sections.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    onClick={() => onSectionChange(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-medium transition-all ${activeSection === id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "bg-muted/50 text-foreground hover:bg-muted"
                        }`}
                >
                    <Icon className="w-4 h-4" />
                    {label}
                </button>
            ))}
        </div>
    )
}
