import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DRITeaser from "@/components/DRITeaser";
import ServicesSection from "@/components/ServicesSection";
import USPSection from "@/components/USPSection";
import ApproachSection from "@/components/ApproachSection";
import TransformationScanSection from "@/components/TransformationScanSection";
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
        <ServicesSection />
        <USPSection />
        <ApproachSection />
        <TransformationScanSection />
        <ContactSection />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
};

export default Index;
