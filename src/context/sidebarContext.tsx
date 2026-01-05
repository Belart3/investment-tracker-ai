import { createContext } from "react";

export const SidebarContext = createContext<{
    showSidebar: boolean;
    setShowSidebar: (value: boolean) => void;
}>({
    showSidebar: true,
    setShowSidebar: () => {},
});