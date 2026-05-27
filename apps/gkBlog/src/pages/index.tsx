import Head from "@/components/meta/Head";

import { getBaseUrl } from "@/helpers/url";

import IndexContents from "@/contents/index";

function Index() {
  const baseUrl = getBaseUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "leeyolo的博客空间",
    description:
      "leeyolo的个人博客，记录技术学习、开发实践与生活感悟。",
    url: "https://example.com/",
    publisher: {
      "@type": "Person",
      name: "leeyolo",
      url: "https://example.com/about-me",
    },
    author: {
      "@type": "Person",
      name: "leeyolo",
      url: "https://example.com/about-me",
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Head
        title="leeyolo的博客空间"
        description="leeyolo的个人博客，记录技术学习、开发实践与生活感悟。"
        ogImage={`${baseUrl}/assets/images/og-image.png`}
        overrideTitle
      />
      <IndexContents />
    </>
  );
}

export default Index;
