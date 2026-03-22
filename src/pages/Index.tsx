import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DRISection from "@/components/DRISection";
import ServicesSection from "@/components/ServicesSection";
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
        <DRISection />
        <ServicesSection />
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
