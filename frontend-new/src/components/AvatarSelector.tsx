import React, { useState } from "react";

const AVATARS = [
  {
    id: "AV001",
    label: "AV001",
    src: "https://avatar.iran.liara.run/public/boy",
  },
  {
    id: "AV002",
    label: "AV002",
    src: "https://avatar.iran.liara.run/public/girl",
  },
  {
    id: "AV003",
    label: "AV003",
    src: "https://i.ibb.co/mVbh83Bx/man-avatar-profile-picture-illustration-eps10-vector.jpg",
  },
  {
    id: "AV004",
    label: "AV004",
    src: "https://i.ibb.co/vvc46Z6m/portraet-einer-geschaeftsfrau-505024-2788.jpg",
  },
];

export default function AvatarSelector({ value, onChange }) {
  const [selectedId, setSelectedId] = useState(value ?? AVATARS[0].id);

  const handleSelect = (id) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">Choose your avatar</p>

      <div
        className="flex flex-wrap gap-4 justify-center m-2"
        role="radiogroup"
        aria-label="Avatar selector"
      >
        {AVATARS.map((avatar) => {
          const isSelected = avatar.id === selectedId;

          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => handleSelect(avatar.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(avatar.id);
                }
              }}
              role="radio"
              aria-checked={isSelected}
              className={`relative flex flex-col items-center gap-1 focus:outline-none
                ${isSelected ? "scale-105" : "hover:scale-105"}
                transition transform`}
            >
              <div
                className={`w-16 h-16 rounded-full overflow-hidden border-2 shadow-sm
                flex items-center justify-center bg-gray-100
                ${
                  isSelected
                    ? "border-blue-500 ring-2 ring-blue-300"
                    : "border-transparent"
                }`}
              >
                <img
                  src={avatar.src}
                  alt={avatar.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-xs ${
                  isSelected ? "text-blue-600 font-semibold" : "text-gray-600"
                }`}
              >
                {avatar.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
