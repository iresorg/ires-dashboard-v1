import { gettingStartedSection } from "./getting-started";
import { ticketsSection } from "./tickets";
import { usersStaffSection } from "./users-staff";
import { subscriptionsSection } from "./subscriptions";
import { financialsSection } from "./financials";
import { glossarySection } from "./glossary";
import type { DocsSection } from "../types";

export const docsSections: DocsSection[] = [
  gettingStartedSection,
  ticketsSection,
  usersStaffSection,
  subscriptionsSection,
  financialsSection,
  glossarySection,
];

export const getDocsSection = (id: string): DocsSection | undefined =>
  docsSections.find((section) => section.id === id);

export const docsSectionMetas = docsSections.map(
  ({ id, title, summary, keywords }) => ({ id, title, summary, keywords })
);
