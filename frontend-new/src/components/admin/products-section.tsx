
import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, ImageIcon, Upload } from "lucide-react"

interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
    category: string
    sold: number
}

interface ProductsSectionProps {
    products: Product[]
    onAddProduct: (product: Omit<Product, "id">) => void
    onUpdateProduct: (id: string, data: Partial<Product>) => void
    onDeleteProduct: (id: string) => void
    showQuickView?: boolean
}

export default function ProductsSection({
    products,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
    showQuickView,
}: ProductsSectionProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
    })

    const handleAddClick = () => {
        setFormData({ name: "", description: "", price: 0, stock: 0, category: "", image: "" })
        setImagePreview("")
        setIsAddDialogOpen(true)
    }

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product)
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            image: product.image,
        })
        setImagePreview(product.image)
        setIsEditDialogOpen(true)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setImagePreview(result)
                setFormData({ ...formData, image: result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveProduct = () => {
        if (selectedProduct) {
            onUpdateProduct(selectedProduct.id, formData)
            setIsEditDialogOpen(false)
        } else {
            onAddProduct({ ...formData, sold: 0 })
            setIsAddDialogOpen(false)
        }
    }

    const displayProducts = showQuickView ? products.slice(0, 3) : products

    return (
        <>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-bold text-foreground">Products</CardTitle>
                        <Button onClick={handleAddClick} size="sm" className="gap-2">
                            <Plus className="w-4 h-4" />
                            {showQuickView ? "Add" : "Add Product"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {showQuickView ? (
                        <div className="space-y-3">
                            {displayProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                                        {product.image ? (
                                            <img
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-foreground truncate">{product.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            ${product.price} • Stock: {product.stock}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(product)} className="h-8 w-8 p-0">
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/50">
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Product</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Category</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Price</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Stock</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Sold</th>
                                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                                                        {product.image ? (
                                                            <img
                                                                src={product.image || "/placeholder.svg"}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-foreground truncate">{product.name}</p>
                                                        <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-foreground">{product.category}</td>
                                            <td className="py-3 px-4 font-semibold text-foreground">${product.price}</td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${product.stock > 20
                                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                                            : product.stock > 0
                                                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                        }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-foreground">{product.sold}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditClick(product)}
                                                        className="h-8 px-2"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onDeleteProduct(product.id)}
                                                        className="h-8 px-2 text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Product Dialog */}
            <Dialog
                open={isAddDialogOpen || isEditDialogOpen}
                onOpenChange={(open) => {
                    setIsAddDialogOpen(false)
                    setIsEditDialogOpen(false)
                }}
            >
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter product name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Enter product description"
                                className="h-20"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) })}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="Enter category"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image-upload">Product Image</Label>
                            <div className="space-y-3">
                                {imagePreview && (
                                    <div className="w-full h-40 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden border border-border/50">
                                        <img
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <label className="flex items-center justify-center gap-2 w-full p-3 border-2 border-dashed border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 cursor-pointer transition-colors">
                                    <Upload className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">
                                        {imagePreview ? "Change image" : "Click to upload image"}
                                    </span>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsAddDialogOpen(false)
                                setIsEditDialogOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveProduct}>{selectedProduct ? "Update" : "Add"} Product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
