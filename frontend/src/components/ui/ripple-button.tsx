import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.4)",
  duration = 600,
  onClick,
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = {
      x,
      y,
      size,
      key: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);
    onClick?.(event);
  };

  useEffect(() => {
    if (ripples.length === 0) return;

    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, duration);

    return () => clearTimeout(timer);
  }, [ripples, duration]);

  return (
    <button
      {...props}
      onClick={createRipple}
      className={cn(
        "relative overflow-hidden rounded-lg px-4 py-2 bg-primary text-primary-foreground transition active:scale-[0.98]",
        className
      )}
      style={{ "--duration": `${duration}ms` }}
    >
      <span className="relative z-10">{children}</span>

      {/* Ripple Container */}
      <span className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <span
            key={ripple.key}
            className="absolute rounded-full animate-(--animate-rippling)"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </span>
    </button>
  );
}
