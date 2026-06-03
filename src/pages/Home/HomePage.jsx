import Navbar from "../../features/navbar/components/Navbar";
import HeroSection from "../../features/home/components/HeroSection";
import CategoriesSection from "../../features/movies/components/CategoriesSection";
import DevicesSection from "../../features/devices/components/DevicesSection";
import FAQSection from "../../features/faq/components/FAQSection";
import PricingSection from "../../features/pricing/components/PricingSection";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";
import Footer from "../../features/footer/components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <DevicesSection />
      <FAQSection />
      <PricingSection />
      <FreeTrialSection />
      <Footer />
    </div>
  );
};

export default HomePage;

