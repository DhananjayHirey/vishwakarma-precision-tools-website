
import { register } from "@/api/auth.api"
import { useApi } from "@/api/useFetch"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ShineBorder } from "../ui/shine-border"
import { AvatarUpload } from "./AvatarUpload"


export function SignUpDialog({
    open,
    onClose,
    onSwitchToLogin
}: {

    open: boolean
    onClose: () => void
    onSwitchToLogin: () => void
}) {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        avatar: null as File | null,
    })

    const {
        call: createAccount,
        loading: isPending,
        error
    } = useApi(register)



    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!(formData.avatar instanceof File)) {
            toast.error("Please add profile image")
            return
        }
        try {
            await createAccount(formData)
            console.log("Creating :", formData);
            toast.success("Account created successfully! Please log in.");
            onSwitchToLogin();
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error || "Registration failed. Please try again.");
        }



    }

    useEffect(() => {
        if (!open) return;
        if (error) {
            toast.error(error);
            return
        }
        return () => {
            setFormData({
                name: "",
                username: "",
                email: "",
                password: "",
                avatar: null,
            })
        }
    }, [open, error])

    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent showCloseButton={false} onInteractOutside={(e) => e.preventDefault()} className="sm:max-w-[425px] max-h-screen  shadow-lg shadow-black/70 rounded-2xl">
                <ShineBorder className="rounded-2xl" shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-sans tracking-wide">SignUp</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRegister} className="grid gap-4">

                    <AvatarUpload
                        value={formData.avatar}
                        onChange={(file) => setFormData({ ...formData, avatar: file })}
                    />
                    <div className="grid gap-3">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            name="fullName"
                            placeholder="Your full name here..."
                            required
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            name="username"
                            placeholder="Your username here..."
                            required
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            name="email"
                            placeholder="Your email here..."
                            required
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            id="password"
                            name="password"
                            placeholder="Your password here..."
                            required
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild >
                            <Button disabled={isPending} variant={'destructive'} onClick={onClose} type="button" className="cursor-pointer rounded-lg border px-5 py-2  ">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            className="rounded-lg border px-5 py-2  "
                        >
                            {isPending ? "Creating Account..." : "Create Account"}
                        </Button>


                    </DialogFooter>
                </form>
                <div className="text-center text-base font-semibold text-gray-400 mt-2">
                    Already have an account?
                    <Button variant='link' className="cursor-pointer hover:text-cyan-500 font-bold" onClick={() => {
                        onClose();
                        onSwitchToLogin();
                    }}>
                        Log in
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}