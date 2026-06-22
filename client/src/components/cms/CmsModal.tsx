import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCmsModal } from "@/components/cms/CmsModalContext";
import CmsWorkspace from "@/pages/admin/CmsWorkspace";

export function CmsModal() {
  const { isOpen, closeCms } = useCmsModal();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeCms();
      }}
    >
      <DialogContent className="cms-modal-content">
        <DialogTitle className="sr-only">Shiv CMS</DialogTitle>
        <DialogDescription className="sr-only">
          Content management for Shiv Insurance Brokers
        </DialogDescription>
        <CmsWorkspace />
      </DialogContent>
    </Dialog>
  );
}
