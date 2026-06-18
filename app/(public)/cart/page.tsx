import { PageHeader } from "@/components/public/page-header";
import { ShoppingCartList } from "@/components/public/shopping-cart";
import { CheckoutForm } from "@/components/cart/checkout-form";

export default function CartPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Direct Order"
        title="Shopping Cart & Shipping"
        description="Review items and complete your delivery address to place an order."
        dark
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <ShoppingCartList />
        <CheckoutForm />
      </div>
    </div>
  );
}
