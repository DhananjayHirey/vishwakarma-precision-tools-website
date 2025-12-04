import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

const IMAGES_ROW_A = [
  "https://i.ibb.co/vvYkSb67/download.png",
  "https://i.ibb.co/Ppkm54k/hindustan-aeronautics-ltd-ramesh-nagar-bangalore-037kyjuhjk.jpg",
  "https://i.ibb.co/fV5mM8Hs/01312025-image6-equitymaster.jpg",
  "https://i.ibb.co/qY53VqCk/wil-wendt-india-ltd-logo.jpg",
  "https://i.ibb.co/ZzHGQJsx/igtr-logo.jpg",
  "https://i.ibb.co/dJtKQWWc/cropped-Jay-Finechem-Logo-1.webp",
];

const IMAGES_ROW_B = [
  "https://i.ibb.co/vvYkSb67/download.png",
  "https://i.ibb.co/Ppkm54k/hindustan-aeronautics-ltd-ramesh-nagar-bangalore-037kyjuhjk.jpg",
  "https://i.ibb.co/fV5mM8Hs/01312025-image6-equitymaster.jpg",
  "https://i.ibb.co/qY53VqCk/wil-wendt-india-ltd-logo.jpg",
  "https://i.ibb.co/ZzHGQJsx/igtr-logo.jpg",
  "https://i.ibb.co/dJtKQWWc/cropped-Jay-Finechem-Logo-1.webp",
];
export function ImageSlider() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 bg-neutral-950">
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
          {IMAGES_ROW_A.map((src, idx) => (
            <img
              key={idx}
              src={`${src}&ixlib=rb-4.0.3`}
              alt="Client Logo"
              width={240}
              height={160}
              loading="lazy"
              decoding="async"
              className="mx-4 inline-block h-40 w-60 rounded-lg object-contain shadow-sm bg-white p-2"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>

      {/* LEFT DARK FADE */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-128 bg-gradient-to-r from-black to-transparent" />

      {/* RIGHT DARK FADE */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-128 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}
