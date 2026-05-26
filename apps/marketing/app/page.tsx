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

export default function Home() {
  return (
    <div id="top" className="bg-background text-text">
      <Header />
      <main>
        <HeroSection />
        <PainPointsSection />
        <GuideIntroSection />
        <LearningPillarsSection />
        <ProductIncludesSection />
        <PlannerSection />
        <LeadCaptureSection />
        <AboutMichelaSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
