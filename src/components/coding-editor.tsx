"use client"

import { useState, useEffect, useCallback } from "react"
import { Editor } from "@monaco-editor/react"
import ChatWidget from "./chat-widget"
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSubmission } from "@/context/problem-context"
import axios from "axios"



const languages = [
  { value: "cpp", label: "C++", language_id: 76 },
  { value: "rust", label: "Rust", language_id: 73 },
]

const defaultCode = {
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
}

export function CodingEditor() {
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState(defaultCode.cpp)
  const { registerSubmit } = useSubmission()
  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || "")
  }, [])

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value)
    setCode(defaultCode[value as keyof typeof defaultCode])
  }, [])



  const handleSubmit = useCallback(async () => {
    try {
      const response = await axios.post('/api/submissions', {
        source_code: code,
        problem_id: 'two-sum',
        language_id: 75
      });

      const { verdict, results } = response.data;

      if (verdict === 'Accepted') {
        toast.success('All test cases passed! 🎉', {
          description: 'Your solution has been accepted.'
        });
      } else {
        // Show details of failed test cases
        toast.error('Some test cases failed', {
          description: results
            .filter((r: { status: string }) => r.status !== 'Accepted')
            .map((r: { compile_output: string; stderr: string }) =>
              r.compile_output || r.stderr || 'Wrong answer'
            )
            .join('\n')
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 'Failed to submit code';
        toast.error('Submission failed', {
          description: errorMessage
        });
      } else {
        toast.error('Submission failed', {
          description: 'An unexpected error occurred'
        });
      }
      console.error('Submission error:', error);
    }
  }, [code]);

  useEffect(() => {
    registerSubmit(handleSubmit)
  }, [registerSubmit, handleSubmit])

  return (
    <div className="flex flex-col space-y-4 ">
      <div className="flex px-2 ">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="mx-4 z-10 text-xs h-7 py-0.5 w-28 ">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="w-28 text-xs gap-2 ">
            {languages.map((lang) => (
              <SelectItem className="text-xs h-6 flex items-center" key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Editor
        className="h-[calc(100vh-3rem)]"
        language={language}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />

      <ChatWidget />
    </div>
  )
}


