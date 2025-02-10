export default function InnerLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      {children}
    </div>
  );
}
