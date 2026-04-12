import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SessionsSection from "@/components/SessionsSection";
import HackathonSection from "@/components/HackathonSection";
import TimelineSection from "@/components/TimelineSection";
import LiveStatsBar from "@/components/LiveStatsBar";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import MapSection from "@/components/MapSection";
import CrossingMarquee from "@/components/CrossingMarquee";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CrossingMarquee />
      <SessionsSection />
      <HackathonSection />
      <CrossingMarquee />
      <TimelineSection />
      <LiveStatsBar />
      <TeamSection />
      <FAQSection />
      <MapSection />
      <FinalCTA />
    </>
  );
}

