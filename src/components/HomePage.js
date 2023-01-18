import React from "react";
import About from "./About";
import CertificateSection from "./CertificateSection";
import ProjectSection from "./ProjectSection";
import RecommendationSection from "./RecommendationSection";
import SkillsSection from "./SkillsSection";
import Title from "./Title";

function HomePage() {
  return (
    <div>
      <Title />
      <RecommendationSection />
      <SkillsSection />
      <ProjectSection />
      <About />
      <CertificateSection />
    </div>
  );
}

export default HomePage;
