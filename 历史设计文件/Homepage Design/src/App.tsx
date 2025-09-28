import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeatureSection } from "./components/FeatureSection";
import { PopularLanguages } from "./components/PopularLanguages";
import { CulturePreview } from "./components/CulturePreview";
import { LearningMethods } from "./components/LearningMethods";
import { ResourceTools } from "./components/ResourceTools";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <PopularLanguages />
        <CulturePreview />
        <LearningMethods />
        <ResourceTools />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}