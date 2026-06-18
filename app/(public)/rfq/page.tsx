import { QuoteCartList } from "@/components/public/quote-cart";
import { RfqSubmitForm } from "@/components/rfq/rfq-submit-form";

export default function RfqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Request for Quote</h1>
        <p className="mt-2 text-muted-foreground">
          Review your quote cart and submit an RFQ. No login required.
        </p>
      </div>

      <div className="space-y-8">
        <QuoteCartList />
        <RfqSubmitForm />
      </div>
    </div>
  );
}
