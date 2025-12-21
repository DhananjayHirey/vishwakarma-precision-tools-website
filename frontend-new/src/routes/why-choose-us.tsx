import { createFileRoute } from '@tanstack/react-router'
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { TextAnimate } from "@/components/ui/text-animate";

export const Route = createFileRoute('/why-choose-us')({
  component: WhyChooseUs,
})

function WhyChooseUs() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 py-24 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-12">
        <TextAnimate className="text-center text-4xl text-zinc-300 font-bold">
            Why Choose Us
        </TextAnimate>

        <section className="space-y-8">
            <div className="relative w-full overflow-hidden rounded-xl">
                 <ShineBorder
                    borderWidth={2}
                    shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                  />
                <MagicCard className="p-8">
                    <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-emerald-500 pl-4">
                        Quality Commitment
                    </h2>
                    <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
                        <p>
                        We have always been aware about the product quality. A quality system (in line with ISO 9000) is adapted which describes the quality elements at Vishwakarma Precision Tools & is binding on all the employees.
                        </p>
                        <p>
                        The established system is periodically assessed. The production process for the components & products manufactured in the unit are carried out under controlled conditions and quality parameters are monitored to ensure continuous process capability.
                        </p>
                    </div>
                </MagicCard>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <MagicCard className="p-8">
                     <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-cyan-500 pl-4">
                        Customer Satisfaction
                    </h2>
                    <p className="text-lg text-neutral-300 leading-relaxed">
                        A yearly customer satisfaction level is calculated on the percentage quality acceptance. The desired level for customer satisfaction is preplanned. The target line is fixed & the quality policy is declared by the Director.
                    </p>
                </MagicCard>

                 <MagicCard className="p-8">
                     <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-purple-500 pl-4">
                        A Word of Pride
                    </h2>
                     <p className="text-lg text-neutral-300 leading-relaxed">
                        Since past 4 decades there have been no discrepancies in our product quality (at customers’ end) and the Quality acceptance is 100%.
                    </p>
                </MagicCard>
            </div>
        </section>
      </div>
    </div>
  )
}
