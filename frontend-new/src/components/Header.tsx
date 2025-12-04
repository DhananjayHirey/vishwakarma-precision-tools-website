"use client"

import * as React from "react"
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
import { Download } from "lucide-react";
import { ScrollProgress } from "./ui/scroll-progress";
import { Button } from "./ui/button";


export function Header() {


	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);


	const navItems = [
		{ name: "About", link: "/about" },
		{ name: "Products", link: "/products" },
		{ name: "Contact", link: "/contact" },
	]



	return (
		<main className="fixed w-full z-20">
			<ScrollProgress className=" h-1 z-50" />
			<Nav className="px-3 py-2">
				{/* Desktop Navigation */}
				<NavBody>
					{/* <NavbarLogo /> */}
					<span className="font-bold   text-2xl  font-sans"> &lt;VP&gt;</span>
					<NavItems items={navItems} />
					<Button variant="outline" className="hidden md:inline-flex">
						Login
					</Button>
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
			</Nav>
		</main>
	)
}