import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <HeroSection />
      <Footer />
    </div>
  );
}