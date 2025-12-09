// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { useNavigate } from "@tanstack/react-router";
interface AppSideBarProps {
  prodCategories: string[];
  selectedCategories: string[];
  orderOpen: Boolean;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AppSidebar({
  prodCategories,
  selectedCategories,
  setSelectedCategories,
  setOrderOpen,
  orderOpen,
}: AppSideBarProps) {
  // Toggle function
  const toggleCategory = (cat: string) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(cat)
          ? prev.filter((c) => c !== cat) // remove if selected
          : [...prev, cat] // add if not selected
    );
  };
  const nav = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="mt-16 ">
          <SidebarGroupLabel
            className={
              orderOpen
                ? "cursor-pointer text-lg font-mono"
                : "cursor-pointer bg-zinc-800 text-lg font-mono"
            }
            onClick={() => setOrderOpen(false)}
          >
            Categories
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {prodCategories.map((item) => {
                const isSelected = selectedCategories.includes(item);

                return (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton
                      onClick={() => toggleCategory(item)}
                      className={`
                        cursor-pointer
                        ${isSelected ? "bg-zinc-700 text-white" : "text-zinc-400"}
                      `}
                    >
                      <span className="ps-4">{item}</span>

                      {/* Optional UI indicator */}
                      {isSelected && (
                        <span className="ml-auto text-xs opacity-70">✓</span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel
            className={
              orderOpen
                ? " bg-zinc-800 cursor-pointer font-mono text-lg"
                : "cursor-pointer text-lg font-mono"
            }
            onClick={() => setOrderOpen(true)}
          >
            Orders
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className={" cursor-pointer text-zinc-400"}>
                  <span className="ps-4">Make a Custom Order</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel
            className={"text-lg font-mono hover:bg-zinc-800 cursor-pointer"}
            onClick={() => nav({ to: "/cart/details" })}
          >
            View Cart
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
