import { Package, ShoppingCart, Tag, Filter, Check } from "lucide-react";

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
import CustomOrderDialog from "./cart/custom-order-dialog";
import { useState } from "react";
interface AppSideBarProps {
  prodCategories: string[];
  selectedCategories: string[];
  orderOpen: boolean;
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

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);


  return (
    <Sidebar className="border-r border-zinc-800 bg-black">
      <SidebarContent className="px-2">
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel
            className={
              orderOpen
                ? "flex items-center gap-2 px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 cursor-pointer hover:text-white transition-colors"
                : "flex items-center gap-2 px-3 text-xs font-medium text-white uppercase tracking-wider mb-2 cursor-pointer"
            }
            onClick={() => setOrderOpen(false)}
          >
            <Filter className="w-4 h-4" />
            Categories
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {prodCategories.map((item) => {
                const isSelected = selectedCategories.includes(item);

                return (
                  <SidebarMenuItem key={item}>
                    <SidebarMenuButton
                      onClick={() => toggleCategory(item)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                        ${isSelected 
                          ? "bg-zinc-800 text-white font-medium" 
                          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}
                      `}
                    >
                      <Tag className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item}</span>

                      {isSelected && (
                        <Check className="ml-auto w-3 h-3 text-emerald-500" />
                      )}
                    </SidebarMenuButton>

                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="my-4 px-3">
             <Separator className="bg-zinc-800" />
        </div>

        <SidebarGroup>
          <SidebarGroupLabel
            className={
              orderOpen
                ? "flex items-center gap-2 px-3 text-xs font-medium text-white uppercase tracking-wider mb-2 cursor-pointer"
                : "flex items-center gap-2 px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 cursor-pointer hover:text-white transition-colors"
            }
            onClick={() => setOrderOpen(true)}
          >
             <Package className="w-4 h-4" />
            Orders
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                    onClick={()=>setDialogOpen(true)} 
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200"
                >
                  <Package className="w-4 h-4" />
                  <span>Make a Custom Order</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <CustomOrderDialog
            open={dialogOpen}
            onClose={()=>setDialogOpen(false)}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-4 px-3">
             <Separator className="bg-zinc-800" />
        </div>

        <SidebarGroup>
             <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                    onClick={() => nav({ to: "/cart/details" })}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 transition-all duration-200 group"
                >
                  <ShoppingCart className="w-4 h-4 group-hover:text-emerald-500 transition-colors" />
                  <span className="font-medium group-hover:text-white">View Cart</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
