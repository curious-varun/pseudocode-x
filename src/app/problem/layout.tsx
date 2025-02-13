import { ProblemTopbar } from "@/components/layout/problem-topbar";
import { SubmissionProvider } from "@/context/problem-context";

export default function ProblemLayout({ children }: { children: React.ReactNode }) {
  return (

    <SubmissionProvider>
      <ProblemTopbar />
      {children}
    </SubmissionProvider>
  );
}

