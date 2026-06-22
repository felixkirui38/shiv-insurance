import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CmsSection } from "@/lib/cms-sections";
import { CmsModal } from "@/components/cms/CmsModal";

type CmsModalContextValue = {
  isOpen: boolean;
  openCms: () => void;
  closeCms: () => void;
  section: CmsSection;
  setSection: (section: CmsSection) => void;
};

const CmsModalContext = createContext<CmsModalContextValue | null>(null);

export function CmsModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState<CmsSection>("inquiries");

  const openCms = useCallback(() => setIsOpen(true), []);
  const closeCms = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openCms, closeCms, section, setSection }),
    [isOpen, openCms, closeCms, section],
  );

  return (
    <CmsModalContext.Provider value={value}>
      {children}
      <CmsModal />
    </CmsModalContext.Provider>
  );
}

export function useCmsModal() {
  const context = useContext(CmsModalContext);
  if (!context) {
    throw new Error("useCmsModal must be used within CmsModalProvider");
  }
  return context;
}
