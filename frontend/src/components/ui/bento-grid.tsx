import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

export const BentoGrid = ({
  children,
  className,
  ...props
}: BentoGridProps) => {
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

export const BentoCard = ({
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
    className={cn(
      "group relative col-span-3 flex flex-col overflow-hidden rounded-xl",
      "bg-background shadow-sm",
      className
    )}
    {...props}
  >
    {/* BACKGROUND IMAGE */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {background &&
        // Force ANY passed image to fit the card
        (typeof background === "string" ? (
          <img src={background} className="w-full h-full object-cover" />
        ) : (
          // If user passes <img>, override className
          //@ts-ignore
          <div className="w-full h-full">
            {background &&
            //@ts-ignore
            background.type === "img" ? (
              //@ts-ignore
              <background.type
                {...background.props}
                className="w-full h-full object-cover"
              />
            ) : (
              background
            )}
          </div>
        ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>

    {/* CONTENT */}
    <div className="relative z-10 flex h-full flex-col justify-end p-4">
      <div className="flex flex-col gap-1 pointer-events-none transform-gpu transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="h-10 w-10 text-white" />

        <h3 className="text-xl font-semibold text-white">{name}</h3>

        <p className="text-sm text-neutral-200 max-w-md">{description}</p>
      </div>

      {/* MOBILE CTA */}
      <div className="mt-3 lg:hidden transform-gpu transition-all duration-300 group-hover:-translate-y-10">
        <Button variant="link" asChild size="sm" className="text-white p-0">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>

    {/* DESKTOP CTA */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 w-full translate-y-6 opacity-0",
        "transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden lg:flex p-4"
      )}
    >
      <Button variant="link" asChild size="sm" className="text-white p-0">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  </div>
);
