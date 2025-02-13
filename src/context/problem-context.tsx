"use client";

import { createContext, useContext, useRef } from "react";

type SubmissionContextType = {
  registerSubmit: (callback: () => void) => void;
  triggerSubmit: () => void;
};

const SubmissionContext = createContext<SubmissionContextType | null>(null);

export const SubmissionProvider = ({ children }: { children: React.ReactNode }) => {
  const submitCallbackRef = useRef<(() => void) | null>(null);

  // Function to register a submission function from the Problem Page
  const registerSubmit = (callback: () => void) => {
    submitCallbackRef.current = callback;
  };

  // Function to trigger the submission function from Navbar
  const triggerSubmit = () => {
    if (submitCallbackRef.current) {
      submitCallbackRef.current();
    }
  };

  return (
    <SubmissionContext.Provider value={{ registerSubmit, triggerSubmit }}>
      {children}
    </SubmissionContext.Provider>
  );
};

// Custom hook to use the submission context in components
export const useSubmission = () => {
  const context = useContext(SubmissionContext);
  if (!context) throw new Error("useSubmission must be used within a SubmissionProvider");
  return context;
};

