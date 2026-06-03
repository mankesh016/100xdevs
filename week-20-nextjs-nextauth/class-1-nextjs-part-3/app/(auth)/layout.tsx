export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>Auth Layout Header</div>
      {children}
      <div>Auth Layout Footer</div>
    </div>
  );
}
