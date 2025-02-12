import { TopBar } from "@/components/layout/app-topbar";
import { NavBar } from "@/components/layout/navbar";

export default function InnerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (

    <div className="">
      <TopBar />
      {children}
    </div>
  );
}
