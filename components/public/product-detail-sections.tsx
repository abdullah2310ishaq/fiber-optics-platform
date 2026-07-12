import type { Product } from "@/types/product";
import type { ProductOrderingRow } from "@/types/product-detail";
import {
  getDimensionRows,
  hasDimensions,
  parseDetailSections,
} from "@/lib/product-content/format";
import { cn } from "@/lib/utils";

function SectionCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card shadow-sm", className)}>
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <h2 className="display-font text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function KeyValueTable({ rows }: { rows: { label: string; value?: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={row.label} className="transition-colors hover:bg-muted/30">
              <th className="w-40 bg-muted/40 px-4 py-3 text-left font-semibold text-foreground sm:w-48">
                {row.label}
              </th>
              <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BulletSections({
  sections,
  mainTitle,
}: {
  sections: ReturnType<typeof parseDetailSections>;
  mainTitle: string;
}) {
  if (sections.length === 0 || sections.every((s) => s.items.length === 0)) return null;

  const flatItems = sections.every((s) => !s.heading) && sections.length === 1;

  return (
    <SectionCard title={mainTitle}>
      {flatItems ? (
        <ul className="grid gap-2 sm:grid-cols-2">
          {sections[0].items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={`${section.heading ?? "section"}-${index}`}>
              {section.heading && (
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                  {section.heading}
                </h3>
              )}
              <ul className="grid gap-2 sm:grid-cols-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function OrderingTable({ rows }: { rows: ProductOrderingRow[] }) {
  const filled = rows.filter(
    (row) => row.size?.trim() || row.width?.trim() || row.depth?.trim() || row.partNo?.trim()
  );
  if (filled.length === 0) return null;

  return (
    <SectionCard title="Ordering Information">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-xs font-semibold uppercase tracking-wide text-foreground">
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Width</th>
              <th className="px-4 py-3">Depth</th>
              <th className="px-4 py-3">Part No.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filled.map((row, index) => (
              <tr key={index} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3 font-medium text-foreground">{row.size ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.width ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.depth ?? "—"}</td>
                <td className="px-4 py-3 font-mono text-xs text-accent">{row.partNo ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

export function ProductDetailSections({ product }: { product: Product }) {
  const dimensionRows = getDimensionRows(product.dimensions);
  const cabinetSections = parseDetailSections(product.cabinetFeatures);
  const technicalSections = parseDetailSections(product.technicalSpecifications);
  const orderingRows = product.orderingInformation ?? [];

  const hasRichContent =
    dimensionRows.length > 0 ||
    cabinetSections.some((s) => s.items.length > 0) ||
    technicalSections.some((s) => s.items.length > 0) ||
    orderingRows.some((r) => r.partNo || r.size);

  if (!hasRichContent) return null;

  return (
    <div className="mt-16 space-y-8">
      {hasDimensions(product.dimensions) && (
        <SectionCard title="Dimensions">
          <KeyValueTable rows={dimensionRows} />
        </SectionCard>
      )}

      <BulletSections sections={cabinetSections} mainTitle="Cabinet Features" />

      <BulletSections sections={technicalSections} mainTitle="Technical Specifications" />

      <OrderingTable rows={orderingRows} />
    </div>
  );
}
