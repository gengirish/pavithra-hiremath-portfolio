import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillDNA from "@/components/SkillDNA";
import ProjectShowcase from "@/components/ProjectShowcase";
import CertificationsSection from "@/components/CertificationsSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="neural-grid outline-none">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceTimeline />
        <SkillDNA />
        <ProjectShowcase />
        <CertificationsSection />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
