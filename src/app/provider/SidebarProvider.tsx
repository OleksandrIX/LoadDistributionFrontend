import {FC, createContext, useState, useContext, ReactNode, useMemo} from "react";
import {SidebarElement} from "types/enums";

interface SidebarContextType {
    selectedElement: SidebarElement;
    setSelectedElement: (element: SidebarElement) => void;
}

const SidebarContext = createContext<SidebarContextType>({
    selectedElement: SidebarElement.PROFILE,
    setSelectedElement: () => {
    }
});

const SidebarProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [selectedElement, setSelectedElement] = useState<SidebarElement>(SidebarElement.PROFILE);

    const contextValue = useMemo(
        () => ({
            selectedElement,
            setSelectedElement
        }), [selectedElement]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);

export default SidebarProvider;
