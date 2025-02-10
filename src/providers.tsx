"use client"
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ToasterToast } from "./components/ui/toaster";

export const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <>

      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster position="top-right" />
        <ToasterToast />
      </ThemeProvider>

    </>
  );
}
