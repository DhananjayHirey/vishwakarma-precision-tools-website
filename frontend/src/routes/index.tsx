import { createFileRoute } from "@tanstack/react-router";
// import logo from "../logo.svg";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AuroraText } from "@/components/ui/aurora-text";
import { TextAnimate } from "@/components/ui/text-animate";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <ScrollProgress />
      <div className="text-center ">
        {/* <div className="border-2 rounded-2xl overflow-hidden"> */}
        <div className="relative h-[500px] w-full overflow-hidden flex justify-center flex-col ">
          <InteractiveGridPattern squares={[100, 100]} />
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
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
