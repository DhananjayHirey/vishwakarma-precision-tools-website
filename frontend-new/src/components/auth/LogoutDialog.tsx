
import { useApi } from '@/api/useFetch'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { logout } from '@/api/auth.api'
import { toast } from 'sonner'
import { persistor } from '@/redux/store'
import { logout as logOutuser } from '@/redux/authSlice'
import { useAppDispatch } from '@/redux/hooks'
import { ShineBorder } from '../ui/shine-border'


const LogoutDialog = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

    const dispatch = useAppDispatch()
    const { call: logoutUser, loading: isPending } = useApi(logout)
    const handleLogout = async () => {
        console.log('logout clicked');
        await logoutUser();
        persistor.purge();
        dispatch(logOutuser())
        toast.success("Logged out successfully");
        onClose();
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent onInteractOutside={(e) => e.preventDefault()} showCloseButton={false} className="sm:max-w-[450px]    shadow-lg shadow-black/70 rounded-2xl font-sans">
                <ShineBorder className="rounded-2xl" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <DialogHeader>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <DialogDescription>
                        This action will log you out of your account.
                        <br />
                        You will need to log in again to access your profile and features.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'destructive'} className='cursor-pointer rounded-lg   px-5 py-2 hover:bg-red-500 hover:text-white' disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button className='rounded-lg border   cursor-pointer' onClick={() => handleLogout()} >{
                        isPending ? "Logging out..." : "Logout"
                    }</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default LogoutDialog