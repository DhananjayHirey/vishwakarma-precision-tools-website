import { createFileRoute } from "@tanstack/react-router";
// import logo from "../logo.svg";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AuroraText } from "@/components/ui/aurora-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { MagicCard } from "@/components/ui/magic-card";
import { ImageSlider } from "@/components/ImageSlider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DashboardGrid } from "@/components/DashboardGrid";
import AboutUs from "@/components/About";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [authModalVisible, setAuthModalVisible] = useState(true);
  return (
    <>
      <ScrollProgress />
      {authModalVisible && (
        <div className="fixed inset-0 bg-[#00000080]  flex items-center justify-center z-50">
          <AuthModal
            authModalVisible={authModalVisible}
            setAuthModalVisible={setAuthModalVisible}
          />
        </div>
      )}
      <div className="text-center ">
        <div className="relative h-[500px] w-full overflow-hidden flex justify-center flex-col ">
          <GridPattern />
          <MagicCard
            className="p-16 pt-18 pb-18 w-[1000px] rounded-2xl mx-auto"
            gradientColor="gray"
            gradientOpacity={0.4}
          >
            <AuroraText className="text-6xl font-bold mb-4">
              Vishwakarma Precision Tools
            </AuroraText>
            <TextAnimate
              animation="slideLeft"
              by="character"
              className="text-white text-4xl font-bold"
            >
              Precision Engineered for the Finest Details
            </TextAnimate>
          </MagicCard>
        </div>
        <div className="w-2/3 mx-auto mt-24 mb-24">
          <DashboardGrid />
        </div>
      </div>

      <AboutUs />

      <TextAnimate className="text-center text-3xl text-zinc-300 font-bold">
        Our Customers
      </TextAnimate>
      <ImageSlider />
    </>
  );
}
