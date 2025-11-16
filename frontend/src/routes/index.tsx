import { createFileRoute } from "@tanstack/react-router";
// import logo from "../logo.svg";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AuroraText } from "@/components/ui/aurora-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { MagicCard } from "@/components/ui/magic-card";
import { ImageSlider } from "@/components/ImageSlider";
import { GridPattern } from "@/components/ui/grid-pattern";
import { DashboardGrid } from "@/components/DashboardGrid";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <ScrollProgress />
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

      <TextAnimate className="text-center text-3xl text-zinc-300 font-bold">
        Our Customers
      </TextAnimate>
      <ImageSlider />
    </>
  );
}
