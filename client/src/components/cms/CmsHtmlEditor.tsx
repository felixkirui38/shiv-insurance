import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  ChevronDown,
  Code,
  ImagePlus,
  Italic,
  LayoutGrid,
  Link2,
  List,
  ListOrdered,
  PaintBucket,
  Underline,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { cmsElementCategories, getCmsElementsByCategory } from "./cmsContentLayouts";

interface CmsHtmlEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

function ToolbarButton({
  title,
  onClick,
  active,
  children,
  className,
}: {
  title: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "flex h-8 min-w-8 items-center justify-center rounded border border-transparent px-2 text-xs font-semibold text-gray-700 hover:bg-gray-100",
        active && "border-gray-300 bg-gray-100",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default function CmsHtmlEditor({
  id = "content",
  value,
  onChange,
  label = "Content (HTML/JSON)",
}: CmsHtmlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState(value);
  const skipSyncRef = useRef(false);

  useEffect(() => {
    if (htmlMode) {
      setHtmlSource(value);
      return;
    }
    if (skipSyncRef.current) {
      skipSyncRef.current = false;
      return;
    }
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value, htmlMode]);

  const syncFromEditor = useCallback(() => {
    if (!editorRef.current) return;
    skipSyncRef.current = true;
    onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const runCommand = useCallback(
    (command: string, commandValue?: string) => {
      if (htmlMode) return;
      editorRef.current?.focus();
      document.execCommand(command, false, commandValue);
      syncFromEditor();
    },
    [htmlMode, syncFromEditor],
  );

  const insertHtml = useCallback(
    (html: string) => {
      if (htmlMode) {
        setHtmlSource((prev) => {
          const next = prev ? `${prev}\n${html}` : html;
          onChange(next);
          return next;
        });
        return;
      }
      editorRef.current?.focus();
      document.execCommand("insertHTML", false, html);
      syncFromEditor();
    },
    [htmlMode, onChange, syncFromEditor],
  );

  const addLink = () => {
    const url = window.prompt("Enter link URL", "https://");
    if (!url) return;
    runCommand("createLink", url);
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (!url) return;
    insertHtml(`<img src="${url}" alt="" class="cms-image" />`);
  };

  const addHighlight = () => {
    const color = window.prompt("Highlight color (e.g. #fff3cd)", "#fff3cd");
    if (!color) return;
    runCommand("hiliteColor", color);
  };

  const toggleHtmlMode = () => {
    if (htmlMode) {
      onChange(htmlSource);
      skipSyncRef.current = true;
      if (editorRef.current) {
        editorRef.current.innerHTML = htmlSource;
      }
      setHtmlMode(false);
      return;
    }
    setHtmlSource(value);
    setHtmlMode(true);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </Label>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
          <ToolbarButton title="Bold" onClick={() => runCommand("bold")}>
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Italic" onClick={() => runCommand("italic")}>
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Paragraph" onClick={() => runCommand("formatBlock", "p")}>
            P
          </ToolbarButton>
          {(["h1", "h2", "h3", "h4", "h5"] as const).map((tag) => (
            <ToolbarButton
              key={tag}
              title={tag.toUpperCase()}
              onClick={() => runCommand("formatBlock", tag)}
            >
              {tag.toUpperCase()}
            </ToolbarButton>
          ))}
          <ToolbarButton title="Bullet list" onClick={() => runCommand("insertUnorderedList")}>
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Numbered list" onClick={() => runCommand("insertOrderedList")}>
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Underline" onClick={() => runCommand("underline")}>
            <Underline className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Highlight color" onClick={addHighlight}>
            <PaintBucket className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Insert link" onClick={addLink}>
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton title="Insert image" onClick={addImage}>
            <ImagePlus className="h-4 w-4" />
          </ToolbarButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-1 h-8 gap-1 border-gray-300 bg-white px-2 text-xs font-medium text-gray-700"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                Elements
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="max-h-[70vh] w-64 overflow-y-auto">
              {cmsElementCategories.map((category, index) => (
                <div key={category.key}>
                  {index > 0 && <div className="my-1 border-t border-gray-100" />}
                  <DropdownMenuLabel className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">
                    {category.label}
                  </DropdownMenuLabel>
                  {getCmsElementsByCategory(category.key).map((element) => (
                    <DropdownMenuItem
                      key={element.id}
                      onClick={() => insertHtml(element.html)}
                      className="cursor-pointer"
                    >
                      {element.label}
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="ml-auto">
            <ToolbarButton
              title="Toggle HTML source"
              onClick={toggleHtmlMode}
              active={htmlMode}
              className="gap-1 px-3"
            >
              <Code className="h-4 w-4" />
              HTML
            </ToolbarButton>
          </div>
        </div>

        {htmlMode ? (
          <Textarea
            id={id}
            value={htmlSource}
            onChange={(e) => {
              setHtmlSource(e.target.value);
              onChange(e.target.value);
            }}
            rows={14}
            className="min-h-[320px] resize-y rounded-none border-0 font-mono text-sm focus-visible:ring-0"
          />
        ) : (
          <div
            ref={editorRef}
            id={id}
            contentEditable
            suppressContentEditableWarning
            onInput={syncFromEditor}
            className="cms-html-editor cms-content min-h-[320px] max-h-[480px] overflow-y-auto px-4 py-3 text-sm leading-relaxed text-gray-800 focus:outline-none prose prose-sm max-w-none"
          />
        )}
      </div>
    </div>
  );
}
