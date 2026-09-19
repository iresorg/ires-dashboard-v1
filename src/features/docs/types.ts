import type { ReactNode } from "react";

export interface DocsHeading {
  id: string;
  title: string;
}

export interface DocsSectionMeta {
  id: string;
  title: string;
  summary: string;
  keywords?: string[];
}

export interface DocsSection extends DocsSectionMeta {
  headings: DocsHeading[];
  content: ReactNode;
}

export type DocsCalloutTone = "info" | "admin" | "warning";
