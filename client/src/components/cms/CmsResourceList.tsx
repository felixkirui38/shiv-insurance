import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CmsResourceListItem {
  id: string;
  title: string;
  category: string;
  appearance: string;
}

interface CmsResourceListProps {
  items: CmsResourceListItem[];
  emptyMessage: string;
  onEdit: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CmsResourceList({
  items,
  emptyMessage,
  onEdit,
  onDuplicate,
  onDelete,
}: CmsResourceListProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Title
            </TableHead>
            <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Category
            </TableHead>
            <TableHead className="h-12 px-6 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Appearance
            </TableHead>
            <TableHead className="h-12 px-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <TableCell className="px-6 py-4 font-semibold text-gray-900">
                  {item.title}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-500">
                  {item.category || "—"}
                </TableCell>
                <TableCell className="px-6 py-4 font-mono text-sm text-gray-500">
                  {item.appearance || "—"}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-4 text-sm font-medium">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                      onClick={() => onEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-900 hover:underline"
                      onClick={() => onDuplicate(item.id)}
                    >
                      Duplicate
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-700 hover:underline"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
