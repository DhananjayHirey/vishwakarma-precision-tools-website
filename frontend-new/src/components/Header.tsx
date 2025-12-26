
import { useState } from "react"
import {
	Navbar as Nav,
	NavBody,
	NavItems,
	MobileNav,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ScrollProgress } from "./ui/scroll-progress";
import LoginDialog from "./auth/LoginDialog";
import { useAppSelector } from "@/redux/hooks";
import LogoutDialog from "./auth/LogoutDialog";
import { SignUpDialog } from "./auth/SignUpDialog";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import CustomOrderDialog from "./cart/custom-order-dialog";

export function Header() {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const user = useAppSelector(state => state.auth.user)
	const isAdmin = user?.role === 'admin'
	const navigate = useNavigate()
	const location = useLocation()

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState<string | null>(null)

	const navItems = [
		// { name: "About", link: "/about" },
		{ name: "Products", link: "/products" },
        { name: "Why Us", link: "/why-choose-us" },
        { name: "Testimonials", link: "/testimonials" },
        { name: "Customers", link: "/our-customers" },
		{ name: "Contact", link: "/contact" },
	]

	return (
		<main className="fixed w-full z-50 top-0">
			<ScrollProgress className=" h-1" />
			<Nav className="px-3 py-2 z-20">
				{/* Desktop Navigation */}
				<NavBody>
					<span
						className="font-bold  text-2xl cursor-pointer z-40  font-sans"
						onClick={() => navigate({ to: '/' })}
					>
						&lt;VP&gt;
					</span>

					<NavItems className="" items={navItems} />

					{/* Profile + Auth Actions */}
					{!isAuthenticated ? (
						<div className="flex gap-4">
							<NavbarButton variant="gradient" className="px-5" onClick={() => setActiveDialog("login")}>
								Login
							</NavbarButton>
							<NavbarButton variant="gradient" className="px-5" onClick={() => setActiveDialog("signup")}>
								Signup
							</NavbarButton>
						</div>
					) : (
						<div className="flex items-center gap-4">
							{/* {(isAdmin && location.pathname != '/admin') && (
								<NavbarButton variant="gradient" className="px-5" onClick={() => navigate({ to: '/admin' })}>
									Dashboard
								</NavbarButton>
							)} */}

							<DropdownMenu>
								<DropdownMenuTrigger className="outline-none">
									<Avatar className="cursor-pointer border h-12 w-12">
										<AvatarImage src={user?.avatar || ""} />
										<AvatarFallback className="bg-gray-700 text-white">
											{user?.name?.[0] || "U"}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>

								<DropdownMenuContent className="w-48">
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{(isAdmin && location.pathname != '/admin') && (
										<DropdownMenuItem className="px-5 text-center cursor-pointer" onClick={() => navigate({ to: '/admin' })}>
											Admin Dashboard
										</DropdownMenuItem>
									)}
									<DropdownMenuItem className="px-5 text-center cursor-pointer" onClick={() => setActiveDialog("customOrder")}>
										Custom Order
									</DropdownMenuItem>
										{/* <DropdownMenuItem className="px-5 text-center cursor-pointer" onClick={() => navigate({ to: "/" })}>
											Settings
										</DropdownMenuItem> */}
									<DropdownMenuSeparator />
									<DropdownMenuItem className="px-5 text-center cursor-pointer" onClick={() => setActiveDialog("logout")}>
										<LogOut className="h-4 w-4 mr-2" /> Logout
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}
				</NavBody>

				{/* Mobile Navigation */}
				<MobileNav>
					<MobileNavHeader>
						<span className="font-bold text-md font-sans">&lt;VP&gt;</span>
						<MobileNavToggle
							isOpen={isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						/>
					</MobileNavHeader>

					<MobileNavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						{navItems.map((item, idx) => (
							<a
								key={`mobile-link-${idx}`}
								href={item.link}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative text-neutral-600 dark:text-neutral-300"
							>
								<span className="block">{item.name}</span>
							</a>
						))}

						{/* AUTH + PROFILE MOBILE */}
						{!isAuthenticated ? (
							<div className="flex w-full flex-col gap-3">
								<NavbarButton variant="secondary" onClick={() => {
									setActiveDialog("login");
									setIsMobileMenuOpen(false);
								}}>
									Login
								</NavbarButton>
								<NavbarButton variant="secondary" onClick={() => {
									setActiveDialog("signup");
									setIsMobileMenuOpen(false);
								}}>
									Signup
								</NavbarButton>
							</div>
						) : (
							<div className="flex w-full flex-col gap-3">
								<button className="text-left py-2" onClick={() => navigate({ to: "/" })}>
									👤 Profile
								</button>
								<button className="text-left py-2" onClick={() => navigate({ to: "/" })}>
									⚙️ Settings
								</button>
								<NavbarButton
									variant="secondary"
									onClick={() => {
										setActiveDialog("logout");
										setIsMobileMenuOpen(false);
									}}
									className="flex items-center gap-2"
								>
									<LogOut className="h-5 w-5" /> Logout
								</NavbarButton>
							</div>
						)}
					</MobileNavMenu>
				</MobileNav>

				<LoginDialog open={activeDialog === "login"} onClose={() => setActiveDialog(null)} onSwitchToSignup={() => setActiveDialog("signup")} />
				<LogoutDialog open={activeDialog === "logout"} onClose={() => setActiveDialog(null)} />
				<SignUpDialog open={activeDialog === "signup"} onClose={() => setActiveDialog(null)} onSwitchToLogin={() => setActiveDialog("login")} />
				<CustomOrderDialog open={activeDialog === "customOrder"} onClose={() => setActiveDialog(null)} />
			</Nav>
		</main>
	)
}
