import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DRITeaser from "@/components/DRITeaser";
import FunnelStepsSection from "@/components/FunnelStepsSection";
import AanpakSection from "@/components/AanpakSection";
import KleurlogicaSection from "@/components/KleurlogicaSection";
import OvertuigingSection from "@/components/OvertuigingSection";
import TransformationScanSection from "@/components/TransformationScanSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <>
      <StickyHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <DRITeaser />
        <FunnelStepsSection />
        <AanpakSection />
        <KleurlogicaSection />
        <OvertuigingSection />
        <TransformationScanSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
};

export default Index;
