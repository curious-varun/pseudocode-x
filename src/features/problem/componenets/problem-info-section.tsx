"use client";
import React from "react";
import MarkdownRenderer from "@/components/markdown-renderer";
import { Varela_Round } from "next/font/google";


const markdownContent = `
# Hello, Next.js!
### un 
# varun 
This is a simple Markdown renderer.
\`\`\`js
console.log("Hello, Markdown!");
\`\`\`

## Features
  - ** Bold **, _italic_, and ~~strikethrough~~.
- Lists, tables, and links:
  
| Name | Age |
| -------| -----|
| John | 25 |
| Alice | 30 |

  - ✅ Task lists:
-[x] Complete setup
  - [] Write more Markdown

\`Inline code\` and code blocks:

`;


export function ProblemInfoSection() {
  return (
    <div className="prose">
      <MarkdownRenderer content={markdownContent} />
    </div>
  );
};




