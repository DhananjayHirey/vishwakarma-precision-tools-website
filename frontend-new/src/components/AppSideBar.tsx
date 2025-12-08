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
interface AppSideBarProps {
  prodCategories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

function AppSidebar({
  prodCategories,
  selectedCategories,
  setSelectedCategories,
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

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="mt-16">
          <SidebarGroupLabel>Categories</SidebarGroupLabel>

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
                        ${isSelected ? "bg-zinc-800 text-white" : "text-zinc-400"}
                      `}
                    >
                      <span>{item}</span>

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
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
