import type { ProductSpecs } from "@/types/product";

interface SpecTableProps {
  specs: ProductSpecs;
}

export function SpecTable({ specs }: SpecTableProps) {
  const entries = Object.entries(specs).filter(([, value]) => value);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        No specifications listed for this product.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-3 text-left font-semibold text-foreground">Parameter</th>
            <th className="px-6 py-3 text-left font-semibold text-foreground">Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value], index) => (
            <tr
              key={key}
              className={index % 2 === 0 ? "bg-card" : "bg-muted/20"}
            >
              <td className="px-6 py-4 font-medium capitalize text-foreground">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </td>
              <td className="px-6 py-4 font-mono text-muted-foreground">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
