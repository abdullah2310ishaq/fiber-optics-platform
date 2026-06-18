import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function PageHeader({ eyebrow, title, description, className, dark }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-b",
        dark ? "navy-mesh border-white/10 text-white" : "border-border bg-card",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        {eyebrow && (
          <p className={cn("section-label", dark && "text-blue-300")}>{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && (
          <p
            className={cn(
              "mt-3 max-w-2xl text-base leading-relaxed",
              dark ? "text-blue-100/80" : "text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface SectionHeadingProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
