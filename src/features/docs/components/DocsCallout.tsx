import React from "react";
import type { DocsCalloutTone } from "../types";

const toneClass: Record<DocsCalloutTone, string> = {
  info: "bg-[var(--cool-blue-tint)] text-[var(--ires-navy-blue)] border-[color-mix(in_srgb,var(--ires-navy-blue)_15%,var(--border))]",
  admin: "bg-[#fff4e5] text-[#8a4b00] border-[#f0d2a8]",
  warning: "bg-[#fdebec] text-[var(--ires-red)] border-[#f3c4c9]",
};

const DocsCallout: React.FC<{
  tone?: DocsCalloutTone;
  title?: string;
  children: React.ReactNode;
}> = ({ tone = "info", title, children }) => (
  <div className={`rounded-lg border px-4 py-3 text-sm ${toneClass[tone]}`}>
    {title && <p className="font-semibold mb-1">{title}</p>}
    <div className="leading-relaxed [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
      {children}
    </div>
  </div>
);

export default DocsCallout;
