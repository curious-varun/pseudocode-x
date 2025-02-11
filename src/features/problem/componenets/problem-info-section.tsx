"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownContent = `
# Hello, Next.js!
This is a **bold** text.

- List Item 1
- List Item 2

[Google](https://google.com)
`;



export function ProblemInfoSection() {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
    </div>
  );
};




