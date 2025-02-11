import { ProblemTopbar } from "@/components/layout/problem-topbar";

export default function InnerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      <ProblemTopbar />
      {children}
    </div>
  );
}
