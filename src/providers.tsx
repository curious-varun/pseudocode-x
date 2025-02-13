"use client"
import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as ToasterToast } from "./components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <>

      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
          <ToasterToast />
        </ThemeProvider>
      </SessionProvider>

    </>
  );
}
