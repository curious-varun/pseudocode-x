"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose max-w-3xl mx-auto p-4">
      <ReactMarkdown className="" remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

