import React from "react";
import { TextAnimate } from "./ui/text-animate";
import { ShineBorder } from "./ui/shine-border";
import { MagicCard } from "./ui/magic-card";

export default function AboutUs() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-20">
        {/* Header */}
        <div className="space-y-4 text-center">
          <TextAnimate className="text-center text-3xl text-zinc-300 font-bold">
            About Us
          </TextAnimate>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A legacy of precision engineering, craftsmanship, and trusted
            excellence since 1986.
          </p>
        </div>

        {/* Introduction & History */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white border-l-4 border-emerald-500 pl-4">
            Introduction & History
          </h2>
          <div className="relative w-full overflow-hidden rounded-xl">
            {/* <ShineBorder
              borderWidth={2}
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            /> */}
            <MagicCard>
              <div className="bg-neutral-900/40 inset-10 rounded-xl p-6 leading-relaxed">
                <p className="mb-4">
                  Vishwakarma Precision Tools, established in 1986, is a
                  high-precision manufacturing toolroom with a distinguished
                  legacy of 38 years as of 2024. Founded by the late Shri P. R.
                  Wagh — a technical expert with 68 years of combined experience
                  — the organisation has grown with a strong foundation of
                  engineering excellence and innovation.
                </p>
                <p className="mb-4">
                  Over the decades, the company has continuously evolved in
                  tooling technology, led by the dedication of Technical
                  Director Mr. C. P. Wagh. The company’s philosophy of
                  relentless improvement, opportunity consciousness, and
                  high-quality workmanship has resulted in a reputation for
                  reliability and precision.
                </p>
                <p>
                  Today, Vishwakarma Precision Tools proudly serves a diverse
                  range of customers across local and state industries, with
                  over 90% of its tooling work contributing directly to import
                  substitution.
                </p>
              </div>
            </MagicCard>
          </div>
        </section>

        {/* Import Substitution */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white border-l-4 border-cyan-500 pl-4">
            Import Substitution
          </h2>
          <div className="relative w-full overflow-hidden rounded-xl">
            <MagicCard>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 leading-relaxed">
                <p className="mb-4">
                  A major part of our manufacturing activity focuses on import
                  substitution — designing, engineering, and producing intricate
                  tooling, special measuring systems, fixtures, and complex
                  parts entirely in-house.
                </p>
                <p className="mb-4">
                  With a well-equipped precision design and manufacturing setup,
                  we deliver solutions that dramatically reduce cost, lead-time,
                  and dependency on foreign suppliers. Our indigenised solutions
                  ensure remarkable improvements in efficiency for our
                  customers.
                </p>
                <ul className="list-disc pl-6 text-neutral-300 space-y-2">
                  <li>Sliding fixtures and holders for checking machines</li>
                  <li>In-process checking feelers, fingers, and probes</li>
                  <li>Special measurement systems for standards labs</li>
                  <li>Custom-engineered complex machine spares</li>
                </ul>
              </div>
            </MagicCard>
          </div>
        </section>

        {/* Product Range */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white border-l-4 border-purple-500 pl-4">
            Product Range & Manufacturing Capabilities
          </h2>
          <div className="relative w-full overflow-hidden rounded-xl">
            <MagicCard>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 leading-relaxed">
                <ul className="list-disc pl-6 space-y-3 text-neutral-300">
                  <li>
                    Special Measurement Systems & form-testing probes, feelers,
                    and stylus for precision metrology labs.
                  </li>
                  <li>
                    Precision miniature collets, holders, fixtures, and custom
                    tooling designed in-house.
                  </li>
                  <li>Microdrilling from Ø 0.20 mm and above.</li>
                  <li>
                    Precision jigs & drill bushes with ID grinding up to Ø 1.50
                    mm.
                  </li>
                  <li>
                    High-precision press tools and micro press components.
                  </li>
                  <li>
                    Manufacturing of carbide tool grinding & lapping machines.
                  </li>
                  <li>
                    Designing, development, and micro-machining of critical
                    parts.
                  </li>
                </ul>
              </div>
            </MagicCard>
          </div>
        </section>

        {/* Organisation */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white border-l-4 border-amber-500 pl-4">
            The Organisation
          </h2>
          <div className="relative w-full overflow-hidden rounded-xl">
            <MagicCard>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 leading-relaxed">
                <p>
                  The company operates with a focused and skilled team,
                  supported by a strong quality management system aligned with
                  ISO 9000 principles. Team members undergo continuous training
                  and development to meet the increasing demands of
                  ultra-precision manufacturing. All technical decisions and
                  development strategies are led by the Directors.
                </p>
              </div>
            </MagicCard>
          </div>
        </section>

        {/* Quality Awareness */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white border-l-4 border-red-500 pl-4">
            Quality Awareness
          </h2>
          <div className="relative w-full overflow-hidden rounded-xl">
            <MagicCard>
              <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 leading-relaxed">
                <p className="mb-4">
                  Quality is the cornerstone of our manufacturing philosophy.
                  Our quality system, aligned with ISO 9000 standards, governs
                  all activities and is periodically evaluated for continued
                  effectiveness.
                </p>
                <p className="mb-4">
                  Every process — from raw material to final inspection — is
                  carried out under controlled conditions to ensure consistent
                  performance and precision.
                </p>
                <p className="font-semibold text-neutral-100">
                  A matter of great pride: for the past four decades, our
                  products have maintained a 100% quality acceptance rate at the
                  customer end.
                </p>
              </div>
            </MagicCard>
          </div>
        </section>
      </div>
    </div>
  );
}
