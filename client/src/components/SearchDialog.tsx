import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { searchSite, type SearchEntry } from '@/lib/searchIndex';
import { Search, FileText, ArrowRight } from 'lucide-react';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchSite(query);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSelect = (entry: SearchEntry) => {
    setLocation(entry.url);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
      return;
    }
    if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      handleSelect(results[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search the site</DialogTitle>
        </DialogHeader>
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search pages, services, downloads..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none py-6"
            autoComplete="off"
            aria-label="Search"
          />
        </div>
        <div className="max-h-[min(60vh,320px)] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-8 px-4 text-center text-sm text-muted-foreground">
              Type to search across the site
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 px-4 text-center text-sm text-muted-foreground">
              No results for &quot;{query}&quot;
            </div>
          ) : (
            <ul className="py-2" role="listbox">
              {results.map((entry) => (
                <li key={entry.id} role="option">
                  <button
                    type="button"
                    onClick={() => handleSelect(entry)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/60 focus:bg-muted/60 focus:outline-none transition-colors"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-shiv-gold/15">
                      <FileText className="h-4 w-4 text-shiv-gold" />
                    </div>
                    <span className="flex-1 font-medium text-shiv-text">
                      {entry.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
