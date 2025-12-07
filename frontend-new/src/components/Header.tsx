"use client"

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


export function Header() {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const isAdmin = useAppSelector(state => state.auth.user?.role === 'admin')
	console.log("Authenticated:", isAuthenticated);
	const navigate = useNavigate()
	const location = useLocation()

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeDialog, setActiveDialog] = useState<string | null>(null)

	const navItems = [
		// { name: "Home", link: "/" },
		{ name: "About", link: "/about" },
		{ name: "Products", link: "/products" },
		{ name: "Contact", link: "/contact" },
	]



	return (
		<main className="fixed w-full z-50 top-0">
			<ScrollProgress className=" h-1" />
			<Nav className="px-3 py-2 z-20">
				{/* Desktop Navigation */}
				<NavBody>
					{/* <NavbarLogo /> */}
					<span className="font-bold  text-2xl cursor-pointer z-40  font-sans" onClick={()=>navigate({to:'/'})}> &lt;VP&gt;</span>
					<NavItems items={navItems} />
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
						<div className="flex gap-4">
							{(isAdmin && location.pathname != '/admin') && <NavbarButton variant="gradient" className="px-5" onClick={()=>navigate({to:'/admin'})}>
								Dashboard
							</NavbarButton>}
							<NavbarButton variant="dark" className="bg-trans rounded-2xl flex hover:scale-none  gap-2  text-white hover:bg-white/15" onClick={() => setActiveDialog("logout")}>
								<LogOut className="h-5 w-5"/>
							</NavbarButton>
						</div>
					)}
				</NavBody>

				{/* Mobile Navigation */}
				<MobileNav>
					<MobileNavHeader>
						<span className="font-bold text-md font-sans">&lt;/&gt;</span>
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
						<div className="flex w-full justify-center flex-col gap-4">
							<NavbarButton
								onClick={() => setIsMobileMenuOpen(false)}
								variant="secondary"

							>
								Login
							</NavbarButton>
						</div>
					</MobileNavMenu>
				</MobileNav>
				<LoginDialog
					open={activeDialog === "login"}
					onClose={() => setActiveDialog(null)}
					onSwitchToSignup={() => setActiveDialog("signup")}
				/>
				<LogoutDialog
					open={activeDialog === "logout"}
					onClose={() => setActiveDialog(null)}
				/>
				<SignUpDialog
					open={activeDialog === "signup"}
					onClose={() => setActiveDialog(null)}
					onSwitchToLogin={() => setActiveDialog("login")}
				/>
			</Nav>
		</main>
	)
}