import Navbar from "../components/Navbar";
import WelcomeSection from "./../components/Home/WelcomeSection";
import DescriptionSection from "../components/Home/DescriptionSection";
import VideoSection from "../components/Home/VideoSection";
import SlideShow from "../components/Home/SlideShow";
import ServicesSection from "../components/Home/ServicesSection";
import FeatureSection from "../components/Home/FeaturesSection";
import ContactSection from "../components/Home/ContactSection";
import ScrollToTop from "../components/Home/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <WelcomeSection />
      <DescriptionSection />
      <ServicesSection />
      <FeatureSection />
      <SlideShow />
      <VideoSection />
      <ContactSection />
    </>
  );
}
