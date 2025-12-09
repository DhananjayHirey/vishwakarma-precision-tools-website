import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import { useApi } from "@/api/useFetch"
import { createProduct, updateProduct } from "@/api/product.api"
import type { Product } from "./products-section"

// export interface Product {
//     _id: string
//     name: string
//     description: string
//     price: number
//     stock: number
//     category: string
//     signedImageUrl?: string
// }

interface EditProductDialogProps {
    open: boolean
    product?: Product | null // null = Add mode, product = Edit mode
    onClose: () => void
    onSuccess: () => void // refresh parent list
}

export default function EditProductDialog({ open, product, onClose, onSuccess }: EditProductDialogProps) {

    const isEdit = !!product

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        image: undefined as File | undefined,
        etp: 0,
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("")


    const { call: addProd, loading: adding } = useApi(createProduct)
    const { call: editProd, loading: updating } = useApi(updateProduct)

    useEffect(() => {
        if (!open) return; // run only when dialog opens

        if (product) {

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                image: undefined,
                etp: product.etp || 0,
            })
            setImagePreview(product.signedImageUrl || "")
            setImageFile(null)
        } else {
            setFormData({
                name: "",
                description: "",
                price: 0,
                stock: 0,
                category: "",
                etp: 0,
                image: undefined,
            })
            setImagePreview("")
        }
    }, [open, product])


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setImageFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
            setFormData({ ...formData, image: file })
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = async () => {
        if (!imageFile && !isEdit) {
            alert("Please upload an image.")
            return
        }

        const form = new FormData()

        form.append("name", formData.name)
        form.append("description", formData.description)
        form.append("price", String(formData.price))
        form.append("stock", String(formData.stock))
        form.append("category", formData.category)
        form.append("etp", String(formData.etp))

        if (imageFile) {
            form.append("productImage", imageFile) // << actual file
        } 
        try {
            if (isEdit && product) {
                await editProd(product._id, form)   // send FormData
            } else {
                await addProd(form)                // send FormData
            }

            onSuccess()
            onClose()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">

                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            className="h-20"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Price</Label>
                            <Input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label>Stock</Label>
                            <Input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Input
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>ETP (Estimated Time to Produce)</Label>
                        <Input
                            value={formData.etp}
                            type="number"
                            onChange={(e) => setFormData({ ...formData, etp: Number(e.target.value) })}
                            placeholder="Enter ETP"
                        />
                    </div>


                    <div className="space-y-2">
                        <Label>Image</Label>

                        {imagePreview && (
                            <img src={imagePreview} className="w-full h-40 rounded-lg object-cover mb-2" />
                        )}

                        <label className="border-2 border-dashed rounded-lg p-3 flex items-center gap-2 cursor-pointer">
                            <Upload className="w-4 h-4" />
                            <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>

                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button disabled={adding || updating} onClick={handleSubmit}>
                        {adding || updating ? "Saving..." : isEdit ? "Update" : "Add"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
