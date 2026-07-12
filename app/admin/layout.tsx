export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-site min-h-screen bg-background text-foreground">{children}</div>
  );
}
