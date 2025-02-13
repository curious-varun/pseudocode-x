"use client"

import { useState, useEffect, useCallback } from "react"
import { Editor } from "@monaco-editor/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSubmission } from "@/context/problem-context"
import axios from "axios"



const languages = [
  { value: "cpp", label: "C++" },
  { value: "rust", label: "Rust" },
]

const defaultCode = {
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
}

export function CodingEditor() {
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState(defaultCode.cpp)
  const { registerSubmit } = useSubmission()
  // what is doing 
  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || "")
  }, [])

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value)
    setCode(defaultCode[value as keyof typeof defaultCode])
  }, [])

  const handleSubmit = useCallback(async () => {
    const language_id = 76;

    const response = await axios.post("/api/useSubmission/", {
      code,
      languageId: 76,
      problemId: "two-sum",
    });


    console.log(response);
    alert(code)


  }, [code])

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
    </div>
  )
}


