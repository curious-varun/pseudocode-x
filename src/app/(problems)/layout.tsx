import { ProblemNavbar } from "@/components/layout/problem-navbar";

export default function InnerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      <ProblemNavbar />
      {children}
    </div>
  );
}
