import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  size?: number;
}

function IconBase({
  className,
  size = 24,
  children,
  viewBox = "0 0 24 24",
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {children}
    </svg>
  );
}

export function ShieldWorkflowIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M12 2.5L4.5 5.5V11.5C4.5 16 7.5 19.5 12 21.5C16.5 19.5 19.5 16 19.5 11.5V5.5L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 11.5L10.8 13.8L15.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </IconBase>
  );
}

export function SpecSheetIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.5 8H15.5M8.5 12H15.5M8.5 16H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 3V6.5C14 7.3 14.7 8 15.5 8H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function QuotationIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M6 4H18C19.1 4 20 4.9 20 6V16C20 17.1 19.1 18 18 18H10L6 21V18H6C4.9 18 4 17.1 4 16V6C4 4.9 4.9 4 6 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 9H16M8 12.5H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="12.5" r="1.5" fill="currentColor" />
    </IconBase>
  );
}

export function DispatchIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M2.5 8H14V16H2.5V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 10.5H17L19.5 13V16H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="17.5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.5" cy="17.5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 5.5H9L10.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function FiberCableIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M4 12C4 8 7 5 12 5C17 5 20 8 20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 12C4 16 7 19 12 19C17 19 20 16 20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9.5V6M12 18V14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 12H6M18 12H14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </IconBase>
  );
}

export function CheckBadgeIcon({ className, size = 16 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M5.5 8L7.2 9.7L10.5 6.3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function DualFlowIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <rect
        x="3"
        y="4"
        width="8"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 11V13.5C7 14.3 7.7 15 8.5 15H13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 13V10.5C17 9.7 16.3 9 15.5 9H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function LifecycleIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse
        cx="12"
        cy="12"
        rx="4"
        ry="8.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3.5 12H20.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3.5C14.5 6 16 9 16 12C16 15 14.5 18 12 20.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="9" r="1.25" fill="currentColor" />
    </IconBase>
  );
}

export function FastResponseIcon({ className, size = 24 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M13 2.5L5.5 13.5H12L11 21.5L18.5 10.5H12L13 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ArrowRightIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ChevronLeftIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ChevronRightIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function RfqDocumentIcon({ className, size = 28 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <path
        d="M7 3H14L19 8V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M8.5 12H15.5M8.5 15.5H13M8.5 19H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="15.5" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.25" />
    </IconBase>
  );
}

export function CartIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M2.5 2.5H4L5.5 13H15.5L17 6.5H5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="16" r="1.25" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="14" cy="16" r="1.25" stroke="currentColor" strokeWidth="1.25" />
    </IconBase>
  );
}

export function MenuIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M3.5 5.5H16.5M3.5 10H16.5M3.5 14.5H16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function CloseIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function ArrowUpRightIcon({ className, size = 16 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 16 16">
      <path
        d="M5 11L11 5M11 5H6.5M11 5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function SearchIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

export function FilterIcon({ className, size = 20 }: IconProps) {
  return (
    <IconBase className={className} size={size} viewBox="0 0 20 20">
      <path
        d="M3 5H17M5.5 10H14.5M8 15H12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="6" cy="5" r="1.5" fill="currentColor" />
      <circle cx="13" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="15" r="1.5" fill="currentColor" />
    </IconBase>
  );
}

export function EmptyCatalogIcon({ className, size = 48 }: IconProps) {
  return (
    <IconBase className={className} size={size}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 9H21M8 5V9M16 5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 13H11M8 16H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}
