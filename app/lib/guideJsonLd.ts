const SITE_URL = "https://proteinlab.kr";

export interface GuideJsonLdOptions {
  title: string;
  description: string;
  url: string;
  updatedAt?: string;
  faq?: { question: string; answer: string }[];
  breadcrumb?: { name: string; item: string }[];
}

export function buildGuideJsonLd(options: GuideJsonLdOptions): Record<string, unknown>[] {
  const { title, description, url, updatedAt, faq, breadcrumb } = options;

  const articleLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "ko-KR",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "ProteinLab", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "ProteinLab",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/proteinlab-logo.png`, width: 81, height: 88 },
    },
    ...(updatedAt ? { dateModified: updatedAt } : {}),
  };

  const result: Record<string, unknown>[] = [articleLd];

  if (breadcrumb && breadcrumb.length > 0) {
    result.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ProteinLab", item: SITE_URL },
        ...breadcrumb.map((crumb, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: crumb.name,
          item: crumb.item,
        })),
      ],
    });
  }

  if (faq && faq.length > 0) {
    result.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return result;
}
