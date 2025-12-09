
import { useApi } from '@/api/useFetch'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'

import { toast } from 'sonner'

import { ShineBorder } from '../ui/shine-border'
import { deleteProduct } from '@/api/product.api'


const DeleteProductDialog = ({ open, onClose,productId,onSuccess }: { open: boolean, onClose: () => void, productId: string, onSuccess: () => void }) => {

    const { call: deleteProd, loading: isPending } = useApi(deleteProduct)
    const handleDelete = async () => {
        console.log('delete clicked');
        await deleteProd(productId);
        toast.success("Product deleted successfully");
        onSuccess();
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent onInteractOutside={(e) => e.preventDefault()} showCloseButton={false} className="sm:max-w-[450px]    shadow-lg shadow-black/70 rounded-2xl font-sans">
                <ShineBorder className="rounded-2xl" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
                    <DialogDescription>
                        This action will delete the product permanently.
                        <br />
                        You will need to add the product again to make it available.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'destructive'} className='cursor-pointer rounded-lg   px-5 py-2 hover:bg-red-500 hover:text-white' disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button className='rounded-lg border   cursor-pointer' onClick={() => handleDelete()} >{
                        isPending ? "Deleting..." : "Delete Product"
                    }</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default DeleteProductDialog