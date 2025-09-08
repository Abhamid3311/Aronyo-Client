"use client";

import React, { useCallback } from "react";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { $generateHtmlFromNodes } from "@lexical/html";
import { ErrorBoundary } from "react-error-boundary";
import { TRANSFORMERS } from "@lexical/markdown";
import { ToolbarPlugin } from "./ToolbarPlugin";

// ---------- Editor Config ----------
const editorConfig: InitialConfigType = {
  namespace: "BlogEditor",
  theme: {
    paragraph: "mb-2",
    heading: {
      h1: "text-2xl font-bold mb-4",
      h2: "text-xl font-semibold mb-3",
      h3: "text-lg font-medium mb-2",
    },
    list: {
      nested: { listitem: "list-item" },
      ol: "list-decimal list-inside ml-4 mb-2",
      ul: "list-disc list-inside ml-4 mb-2",
    },
    quote: "border-l-4 border-gray-300 pl-4 italic my-4",
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      strikethrough: "line-through",
      code: "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono",
    },
  },
  onError: (error: Error) => console.error("Lexical Error:", error),
  nodes: [
    ListNode,
    ListItemNode,
    LinkNode,
    HorizontalRuleNode,
    HeadingNode,
    QuoteNode,
    CodeNode,
  ],
};

// ---------- Placeholder ----------
function Placeholder() {
  return (
    <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
      Start writing your blog content...
    </div>
  );
}

// ---------- Error Boundary ----------
function LexicalErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <p className="text-red-600">Something went wrong with the editor.</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// ---------- BlogEditor ----------
interface BlogEditorProps {
  value?: string; // initial HTML (for edit mode)
  onChange: (html: string) => void; // callback to pass updated HTML
}

export function BlogEditor({ value, onChange }: BlogEditorProps) {
  // Sync content changes
  const handleChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (editorState: any, editor: any) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        onChange(htmlString);
      });
    },
    [onChange]
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <LexicalComposer initialConfig={editorConfig}>
        <LexicalErrorBoundary>
          <ToolbarPlugin />
          <div className="relative min-h-[300px] max-h-[400px] overflow-y-auto">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input px-4 py-4 min-h-[300px] outline-none text-sm leading-relaxed" />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={handleChange} />
          </div>
        </LexicalErrorBoundary>
      </LexicalComposer>
    </div>
  );
}
