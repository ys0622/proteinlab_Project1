const SITE_URL = "https://proteinlab.kr";

export interface GuideJsonLdOptions {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  /** @deprecated use dateModified */
  updatedAt?: string;
  faq?: { question: string; answer: string }[];
  breadcrumb?: { name: string; item: string }[];
}

export function buildGuideJsonLd(options: GuideJsonLdOptions): Record<string, unknown>[] {
  const { title, description, url, datePublished, dateModified, updatedAt, faq, breadcrumb } = options;
  const modifiedDate = dateModified ?? updatedAt;

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
      logo: { "@type": "ImageObject", url: `${SITE_URL}/proteinlab-logo.png`, width: 715, height: 717 },
    },
    ...(datePublished ? { datePublished } : {}),
    ...(modifiedDate ? { dateModified: modifiedDate } : {}),
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

// 템플릿이 만든 블록에 페이지별 추가 블록을 합친다. 같은 @type이면 추가 블록으로 바꿔 Article·FAQPage가 두 번 나가지 않게 한다.
export function mergeJsonLd(base: Record<string, unknown>[], extra: Record<string, unknown>[] = []): Record<string, unknown>[] {
  const result = [...base];
  for (const item of extra) {
    const index = result.findIndex((existing) => existing["@type"] === item["@type"]);
    if (index >= 0) result[index] = item;
    else result.push(item);
  }
  return result;
}
