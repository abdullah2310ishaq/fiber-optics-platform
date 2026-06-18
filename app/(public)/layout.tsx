import { QueryProvider } from "@/components/providers/query-provider";
import { CartStoreHydrator } from "@/components/providers/cart-store-hydrator";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <CartStoreHydrator />
      <div className="public-site flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1 pt-16 lg:pt-[4.5rem]">{children}</main>
        <SiteFooter />
      </div>
    </QueryProvider>
  );
}
