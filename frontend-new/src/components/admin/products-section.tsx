
import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Plus, Edit2, Trash2, ImageIcon, Upload } from "lucide-react"
import { useApi } from "@/api/useFetch"
import { createProduct, deleteProduct, getAllProducts } from "@/api/product.api"
import { ShineBorder } from "../ui/shine-border"
import EditProductDialog from "./edit-product-dialog"
import DeleteProductDialog from "./delete-product-dialog"

export interface Product {
    _id: string
    name: string
    description: string
    price: number
    image: string
    stock: number
    category: string
    sales: number
    etp: number
    signedImageUrl?: string
}

interface ProductsSectionProps {
    showQuickView?: boolean
}

export default function ProductsSection({
    showQuickView,
}: ProductsSectionProps) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [imagePreview, setImagePreview] = useState<string>("")
    const [imageFile, setImageFile] = useState<File | null>(null)

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: undefined as File | undefined,
    })

    const { call: getProds, loading } = useApi(getAllProducts)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProds()
                console.log("products", response);

                setProducts(response)
            } catch (err) {
                console.error("Failed to fetch products:", err)
            }
        }

        fetchProducts()
    }, [getProds])

    const handleAddClick = () => {
        setFormData({ name: "", description: "", price: 0, stock: 0, category: "", image: undefined })
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
            image: undefined,
        })
        setImagePreview(product.signedImageUrl || "")
        setImageFile(null)
        setIsEditDialogOpen(true)
    }



    const displayProducts = showQuickView ? products.slice(0, 3) : products

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <ShineBorder className="rounded-2xl" shineColor={["teal", "cyan", "yellow"]} />
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
                                    key={product._id}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                                        {product.signedImageUrl ? (
                                            <img
                                                src={product.signedImageUrl || "/placeholder.svg"}
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
                                            Rs. {product.price} • Stock: {product.stock}
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
                                        <tr key={product._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                                                        {product.signedImageUrl ? (
                                                            <img
                                                                src={product.signedImageUrl || "/placeholder.svg"}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-foreground truncate">{product.name}</p>
                                                        {/* <p className="text-xs text-muted-foreground truncate">{product.description}</p> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-foreground">{product.category}</td>
                                            <td className="py-3 px-4 font-semibold text-foreground">Rs.  {product.price}</td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-lg font-semibold italic Rs. {product.stock > 20
                                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                                            : product.stock > 0
                                                                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                                                                : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                            }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-foreground">{product.sales}</td>
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
                                                        onClick={() => {
                                                            setIsDeleteDialogOpen(true)
                                                            setSelectedProduct(product)
                                                        }}
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
            <EditProductDialog
                open={isAddDialogOpen || isEditDialogOpen}
                product={selectedProduct} // null = add mode
                onClose={() => {
                    setIsAddDialogOpen(false)
                    setIsEditDialogOpen(false)
                    setSelectedProduct(null)
                }}
                onSuccess={async () => {
                    const refreshed = await getProds()
                    setProducts(refreshed)
                }}
            />
            {selectedProduct && (
                <DeleteProductDialog
                    open={isDeleteDialogOpen}
                    productId={selectedProduct._id}
                    onClose={() => {
                        setIsDeleteDialogOpen(false)
                        setSelectedProduct(null)

                    }}
                    onSuccess={
                        async () => {
                            const refreshed = await getProds()
                            setProducts(refreshed)
                        }
                    }
                />
            )}



        </>
    )
}
