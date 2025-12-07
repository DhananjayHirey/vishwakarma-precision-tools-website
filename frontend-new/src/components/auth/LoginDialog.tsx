
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


interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onSwitchToSignup: () => void;
}

const LoginDialog = ({ open, onClose, onSwitchToSignup }: LoginDialogProps) => {

    const [identifier, setIdentifier] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useAppDispatch();

    const handleClose = () => {
        setIdentifier("");
        setPassword("");
        onClose();
    }

    const { call: loginUser, data, loading, error } = useApi(login)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (identifier.trim() === "" || password.trim() === "") {
            toast.error("Please fill in all fields.");
            return;
        }
        console.log("submitted")
        const isEmail = identifier.includes("@")

        const loginData = isEmail
            ? { email: identifier, password }
            : { username: identifier, password }
        try {
            const res = await loginUser(loginData);
            console.log(res);
            
            toast.success("Login successful!");
            dispatch(loginSuccess(res.user))
            console.log("Login Response:", data.user);
            onClose();
        } catch {
            console.log(error);
            toast.error(error);
        }

    }


    useEffect(() => {
        if (!open) return;
        return () => {
            setIdentifier("");
            setPassword("");
        };
    }, [open, error]);



    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent showCloseButton={false} onInteractOutside={e => e.preventDefault()} className="sm:max-w-[425px] rounded-2xl">
                <form onSubmit={handleLogin} className="px-4  py-2 space-y-10">
                    <ShineBorder className="rounded-2xl" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-semibold">Login</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-5">
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Email or Username</Label>
                            <Input value={identifier} onChange={(e) => setIdentifier(e.target.value)} id="username-1" name="username" placeholder="Enter email or username" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Enter your password" type="password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="destructive">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
                    </DialogFooter>
                </form>
                <div className="text-center text-base font-semibold text-gray-400 mt-2">
                    Don't have an account?
                    <Button variant='link' className="cursor-pointer hover:text-cyan-500 font-bold" onClick={() => {
                        onClose();
                        onSwitchToSignup();
                    }}>
                        Sign up
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog