
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { ShineBorder } from "../ui/shine-border";
import { useEffect, useState } from "react";
import { useApi } from "@/api/useFetch";
import { login } from "@/api/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { loginSuccess } from "@/redux/authSlice";
import { placeCustomOrder } from "@/api/orders.api";
import { AvatarUpload } from "../auth/AvatarUpload";
import { Upload } from "lucide-react";
import { Textarea } from "../ui/textarea";


interface CustomOrderDialogProps {
    open: boolean;
    onClose: () => void;
}

interface CustomOrder {
    orderingParty: string;
    customOrderDetails: string;
    expectedDeliveryDate: string;
    customOrderAttachment?: File | null;
}
const CustomOrderDialog = ({ open, onClose }: CustomOrderDialogProps) => {

    const [formData, setFormData] = useState<CustomOrder>({} as CustomOrder);
    const [imagePreview, setImagePreview] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setFormData({} as CustomOrder);
        onClose();
    }
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setFormData({ ...formData, customOrderAttachment: file })
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
            setFormData({ ...formData, customOrderAttachment: file })
        }
        reader.readAsDataURL(file)
    }

    const { call: placeOrder, data, loading: placingOrder, error } = useApi(placeCustomOrder)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("submitted")


        try {
            const payload = {
                customOrderDetails: formData.customOrderDetails,
                expectedDateByClient: formData.expectedDeliveryDate,
                customOrderAttachment: formData.customOrderAttachment,
            }
            const res = await placeOrder(payload);
            console.log(res);

            toast.success("Custom order placed successfully!");
            handleClose();
        } catch (err: any) {
            console.log(err);
            toast.error(err);
        }

    }


    useEffect(() => {
        if (!open) return;
        return () => {
            setFormData({} as CustomOrder);
        };
    }, [open]);



    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent showCloseButton={false} onInteractOutside={(e) => e.preventDefault()} className="sm:max-w-[425px] max-h-screen  shadow-lg shadow-black/70 rounded-2xl">
                <ShineBorder className="rounded-2xl" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-sans tracking-wide">Order a Custom Tool</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">

                    <div className="space-y-2">
                        <Label>Image</Label>
                        {imagePreview && (
                            <img src={imagePreview} className="w-full h-40 rounded-lg object-cover mb-2" />
                        )}
                        <label className="border-2 border-dashed rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer">
                            <Upload className="w-4 h-4" />
                            <span className="">{imagePreview ? "Change Image" : "Upload Image"}</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="customOrderDetails">Custom Order Details</Label>
                        <Textarea
                            id="customOrderDetails"
                            value={formData.customOrderDetails}
                            onChange={(e) => setFormData({ ...formData, customOrderDetails: e.target.value })}
                            name="customOrderDetails"
                            placeholder="Your custom order details here..."
                            required
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="expectedDeliveryDate">When do you expect this order to be delivered?</Label>
                        <Input
                            id="fullName"
                            value={formData.expectedDeliveryDate}
                            onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                            name="expectedDeliveryDate"
                            type="date"
                            placeholder="Enter expected delivery date"
                            required
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild >
                            <Button disabled={placingOrder} variant={'destructive'} onClick={onClose} type="button" className="cursor-pointer rounded-lg border px-5 py-2  ">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="rounded-lg border px-5 py-2  "
                        >
                            {placingOrder ? "Please wait..." : "Place Order"}
                        </Button>


                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CustomOrderDialog