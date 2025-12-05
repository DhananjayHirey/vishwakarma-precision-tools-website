import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-background dark:bg-background",
      "transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    {/* background FIXED here */}
    <div className="absolute inset-0 z-0">{background}</div>

    {/* gradient overlay for better visibility */}
    <div className="absolute inset-0 bg-black/40 dark:bg-black/50 z-0" />

    {/* content sits above */}
    <div className="relative z-10 p-4">
      <div className="flex flex-col gap-1 transform-gpu pointer-events-none transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className="h-12 w-12 text-neutral-700 dark:text-neutral-300 group-hover:scale-75 transition-all duration-300" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-300 dark:text-neutral-400">
          {description}
        </p>
      </div>

      {/* CTA button for mobile */}
      <div className="lg:hidden mt-3">
        <Button variant="link" asChild size="sm" className="p-0">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>

    {/* CTA button on desktop */}
    <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 p-4 lg:flex z-10">
      <Button variant="link" asChild size="sm" className="p-0">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
