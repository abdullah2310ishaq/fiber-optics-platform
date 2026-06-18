import { PageHeader } from "@/components/public/page-header";
import { QuoteCartList } from "@/components/public/quote-cart";
import { RfqSubmitForm } from "@/components/rfq/rfq-submit-form";

export default function RfqPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Bulk Procurement"
        title="Request for Quotation"
        description="Separate from cart checkout. Build your quote list and submit for enterprise pricing."
        dark
      />
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <QuoteCartList />
        <RfqSubmitForm />
      </div>
    </div>
  );
}
