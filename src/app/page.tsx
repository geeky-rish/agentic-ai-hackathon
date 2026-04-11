import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SessionsSection from "@/components/SessionsSection";
import HackathonSection from "@/components/HackathonSection";
import TimelineSection from "@/components/TimelineSection";
import LiveStatsBar from "@/components/LiveStatsBar";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SessionsSection />
      <HackathonSection />
      <TimelineSection />
      <LiveStatsBar />
      <TeamSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
