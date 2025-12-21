import { createFileRoute } from '@tanstack/react-router'
import { MagicCard } from "@/components/ui/magic-card";
import { TextAnimate } from "@/components/ui/text-animate";

export const Route = createFileRoute('/testimonials')({
  component: Testimonials,
})

const timeline = [
  { year: "1989", desc: "Development of critical stylus for form-testing m/c for MICO-BOSCH, Nashik." },
  { year: "1991", desc: "Attended the Hannover-Messe, Germany representing the Nashik Industries, India." },
  { year: "1996", desc: "Achieving the ISO-9002 certification being one of the first 3 SSI units in Nashik. (Presently discontinued by us but the basic systems are still maintained)." },
  { year: "1997", desc: "Awarded by the state level “Quality Award” (for outstanding work in the field of quality engg) by Entrepreneurs’ International, Pune at the hands of Minister of Industries." },
  { year: "2003", desc: "Development of one of the most critical in-process gauging measuring fingers for UVA grinding m/c for BOSCH – Nashik." },
  { year: "2005/2006", desc: "One of the few initial suppliers to BOSCH- common rail injector plant for indignation of critical toolings." },
  { year: "2009", desc: "Special development of sensors/ components for Mercedes-Benz, Germany, through BOSCH-Nashik." },
  { year: "2012", desc: "Development of special holding fixtures for checking of various Geometrical parameters of manufactured components in ONE-GO. For Fine Measuring Rooms (BOSCH Ltd)." },
  { year: "2016", desc: "A major development of import substitution of Auto FEEDER on the Valve-piece CNC grinding Machine- BAHMULLER for BOSCH-CRi (Common Rail Injector) 100% EOU." },
  { year: "2018", desc: "Development of special checking fixtures for MAHR machines at BOSCH." },
  { year: "2019", desc: "Mirror holder plates [HWS] developed for BEL. (used with AK-47)" },
  { year: "2020", desc: "Development of critical import substitute components for IGTR, Aurangabad." },
  { year: "2022", desc: "Electro-chemical machining ECM electrodes. Import substitution for BOSCH, Jaipur." },
  { year: "2023", desc: "Critical Development of Sensors/Headers for Pressure Transducers for HAL, Nashik." },
];

const achievements = [
    {
        title: "State level ABEE QUALITY AWARD",
        desc: "Given to Vishwakarma Precision Tools at the hands of then Hon. Minister for Industries, Mr. Leeladhar Dake.",
        img: "https://i.ibb.co/Q33Sgqmc/12.jpg"
    },
    {
        title: "Entrepreneur's International Felicitation",
        desc: "Mr. P.R.Wagh & Mr. C.P.Wagh being felicitated for their outstanding quality work in the field of engineering - 29th July 2018.",
        img: "https://i.ibb.co/23fLY4PM/Enterpreneurs-Int-29-07-2018.jpg"
    },
     {
        title: "Visit by MICO-BOSCH Directors",
        desc: "Mr. J.L. Pasricha and Mr. Lovekar with our Director Mr. P.R. Wagh, during their visit to Vishwakarma Precision Tools, 1994.",
        img: "https://i.ibb.co/rR9BvYWM/10.jpg"
    },
     {
        title: "German Master Technician Visit",
        desc: "Mr. Heinz Weber, German Master Technician & Engineer, visited Vishwakarma Precision Tools in 1998.",
        img: "https://i.ibb.co/1JM6K1F0/Screenshot-2025-12-21-162915.jpg"
    },
     {
        title: "Excellence in Quality Trophy",
        desc: "Certificate awarded with a trophy for Excellence in Quality by the Entrepreneur’s International.",
        img: "https://i.ibb.co/JjtdPxdT/IMG20160605160654.jpg"
    },
    {
        title: "NIMA Felicitation",
        desc: "Felicitation from NIMA in appreciation for receiving Quality Award by hands of MLA, Mr. T. Dighole.",
        img: "https://i.ibb.co/zHmVcBXx/15.jpg"
    },
    {
        title: "Valued by Associations",
        desc: "Our Quality work has been appreciated, valued and awarded by various renowned associations in the city and state.",
         img: "https://i.ibb.co/x00jR23/IMG20160605153704-1.jpg"
    }
];

function Testimonials() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 py-24 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Journey / Timeline Section */}
        <section>
            <TextAnimate className="text-center text-4xl text-zinc-300 font-bold mb-16">
                Our Journey & Milestones
            </TextAnimate>
            <div className="relative border-l-2 border-neutral-800 ml-4 md:ml-10 space-y-12">
                {timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-8 md:pl-12">
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-500 border-4 border-neutral-950" />
                        
                        <div className="flex flex-col md:flex-row md:gap-8 items-start">
                            <span className="text-emerald-400 font-bold text-xl md:w-32 shrink-0">{item.year}</span>
                            <p className="text-neutral-300 mt-1 md:mt-0 text-lg">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Achievements Section */}
         <section>
            <TextAnimate className="text-center text-4xl text-zinc-300 font-bold mb-16">
                Achievements at a Glance
            </TextAnimate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((ach, idx) => (
                    <MagicCard key={idx} className=" flex flex-col h-full overflow-hidden">
                        <div className="h-48 overflow-hidden">
                            <img src={ach.img} alt={ach.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                        </div>
                        <div className="p-6 flex flex-col grow">
                            <h3 className="text-xl font-bold text-white mb-2">{ach.title}</h3>
                            <p className="text-neutral-400 text-sm">{ach.desc}</p>
                        </div>
                    </MagicCard>
                ))}
            </div>
        </section>

      </div>
    </div>
  )
}
