import type { ProductSpecs } from "@/types/product";

interface SpecTableProps {
  specs: ProductSpecs;
}

export function SpecTable({ specs }: SpecTableProps) {
  const entries = Object.entries(specs).filter(([, value]) => value);

  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No specifications listed.</p>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key} className="border-b border-border last:border-0">
              <td className="bg-muted/50 px-4 py-3 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
