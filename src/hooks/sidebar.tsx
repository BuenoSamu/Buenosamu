import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { PageNames } from '../enums/pages';

interface SidebarContextData {
  selectedPage: PageNames;
  setSelectedPage: (page: PageNames) => void;
}

const SidebarContext = createContext<SidebarContextData>(
  {} as SidebarContextData,
);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [selectedPage, setSelectedPage] = useState<PageNames>(
    PageNames.MANAGE_CUSTOMERS,
  );

  return (
    <SidebarContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextData => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
