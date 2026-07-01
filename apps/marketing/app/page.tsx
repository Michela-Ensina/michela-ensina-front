import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutMichelaSection } from "@/components/sections/landing/AboutMichelaSection";
import { FinalCtaSection } from "@/components/sections/landing/FinalCtaSection";
import { GuideIntroSection } from "@/components/sections/landing/GuideIntroSection";
import { HeroSection } from "@/components/sections/landing/HeroSection";
import { LeadCaptureSection } from "@/components/sections/landing/LeadCaptureSection";
import { LearningPillarsSection } from "@/components/sections/landing/LearningPillarsSection";
import { PainPointsSection } from "@/components/sections/landing/PainPointsSection";
import { PlannerSection } from "@/components/sections/landing/PlannerSection";
import { ProductIncludesSection } from "@/components/sections/landing/ProductIncludesSection";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from "@/lib/seo/site";
import { getIsReleased, MODO_FLUENTE_HOTMART_URL } from "@/lib/release";

export const metadata: Metadata = {
  title: SITE_DEFAULT_TITLE,
  description: SITE_DEFAULT_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 512,
        height: 512,
        alt: "Pré-lançamento do Modo Fluente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
};

export default function Home() {
  const isReleased = getIsReleased();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/brand/logos/logo-horizontal-purple-dark.svg`,
    sameAs: [
      "https://www.instagram.com/michelaensina",
      "https://www.tiktok.com/@michelaensina",
      "https://www.youtube.com/@michelaensina",
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Modo Fluente",
    description:
      "Guia prático para aprender idiomas com clareza, organização e constância.",
    image: [`${SITE_URL}${SITE_OG_IMAGE}`],
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: isReleased ? MODO_FLUENTE_HOTMART_URL : SITE_URL,
      priceCurrency: "BRL",
      price: "64.90",
      availability: isReleased
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div id="top" className="bg-background text-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header isReleased={isReleased} />
      <main>
        <HeroSection isReleased={isReleased} />
        <PainPointsSection />
        <GuideIntroSection />
        <LearningPillarsSection isReleased={isReleased} />
        <ProductIncludesSection />
        <PlannerSection />
        <LeadCaptureSection isReleased={isReleased} />
        <AboutMichelaSection />
        <FinalCtaSection isReleased={isReleased} />
      </main>
      <Footer />
    </div>
  );
}
