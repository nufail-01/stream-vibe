import Navbar from "../../features/navbar/components/Navbar";
import SupportForm from "../../features/support/components/SupportForm";
import FAQSection from "../../features/faq/components/FAQSection";
import FreeTrialSection from "../../features/movies/components/FreeTrialSection";
import Footer from "../../features/footer/components/Footer";

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />
      <div className="pt-20">
        <div  id="contact">
          <SupportForm />
        </div>
        <FAQSection />
        <FreeTrialSection />
      </div>
      <Footer />
    </div>
  );
};

export default SupportPage;
