import React from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  iconSrc: string;
  featured?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  iconSrc,
  featured = false,
}) => {
  return (
    <div
      className={`ui-card flex items-center gap-4 px-5 py-4 ${
        featured ? "bg-[var(--ires-navy-blue)] text-white border-transparent" : ""
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${
          featured ? "bg-white/12" : "bg-[var(--cool-blue-tint)]"
        }`}
      >
        <img src={iconSrc} alt="" className="w-6 h-6 object-contain" />
      </div>
      <div>
        <p className={`text-xs font-medium ${featured ? "text-white/70" : "text-[var(--muted)]"}`}>
          {label}
        </p>
        <p className={`text-2xl font-semibold tracking-tight ${featured ? "text-white" : "text-[var(--ires-navy-blue)]"}`}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
