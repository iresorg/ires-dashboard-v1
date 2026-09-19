import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import DocsLayout from "../components/DocsLayout";
import { getDocsSection } from "../content";

const DocsSectionPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = sectionId ? getDocsSection(sectionId) : undefined;

  useEffect(() => {
    if (!section) return;
    document.title = `${section.title} · Documentation`;
    return () => {
      document.title = "iRES Dashboard";
    };
  }, [section]);

  if (!sectionId || !section) {
    return <Navigate to={ROUTES.DOCS} replace />;
  }

  return (
    <DocsLayout section={section} headings={section.headings}>
      {section.content}
    </DocsLayout>
  );
};

export default DocsSectionPage;
