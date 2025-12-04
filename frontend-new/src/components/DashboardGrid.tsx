import { GlobeIcon, StarIcon } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { MailIcon, StoreIcon, TrophyIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const features = [
  {
    Icon: StoreIcon,
    name: "Visit the Store",
    description:
      "Explore our collection and find everything you need in one place.",
    href: "/store",
    cta: "Learn more",
    background: (
      <img
        src="https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=1000"
        className="w-full h-full object-cover"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: TrophyIcon,
    name: "Testimonials",
    description: "Real stories from customers who love our products.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://i.ibb.co/7JhQqvkq/IMG20160605153704.jpg"
        className="w-full h-full object-cover"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Our Customers",
    description: "Trusted by individuals and businesses across the globe.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://i.ibb.co/yFm20bZy/business-people-handshake-successful-corporate-600nw-2421123259.webp"
        className="w-full h-full object-cover"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: MailIcon,
    name: "Contact Us",
    description:
      "We’re here to help—reach out anytime for support or inquiries.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://i.ibb.co/FkkxZTRB/istockphoto-2172494039-612x612.jpg"
        className="w-full h-full object-cover"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: StarIcon,
    name: "Why Choose Us?",
    description: "Exceptional quality, reliable service, and unmatched value.",
    href: "/",
    cta: "Learn more",
    background: (
      <img
        src="https://i.ibb.co/BVnV4tH4/parts.jpg"
        className="w-full h-full object-cover"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function DashboardGrid() {
  const navigate = useNavigate();
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard
          key={feature.name}
          {...feature}
          onClick={() => navigate({ to: feature.href })}
        />
      ))}
    </BentoGrid>
  );
}
