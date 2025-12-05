"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

interface AvatarUploadProps {
    value: File | null;
    onChange: (file: File | null) => void;
}

export function AvatarUpload({ value, onChange }: AvatarUploadProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => inputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (!file) {
            setPreview(null);
            onChange(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
        onChange(file);
    };

    return (
        <div className="w-full flex flex-col items-center gap-3 mt-2">
            <button
                type="button"
                onClick={handleClick}
                className="relative group h-28 w-28 rounded-full overflow-hidden border border-muted-foreground/30 hover:border-primary transition"
            >
                <Avatar className="h-full w-full">
                    <AvatarImage src={preview || ""} alt="preview" />
                    <AvatarFallback className="bg-muted text-xs">
                        <Camera className="h-6 w-6 opacity-60" />
                    </AvatarFallback>
                </Avatar>

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center text-xs transition">
                    Change
                </div>
                
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <p className="text-[11px] text-muted-foreground">Max size: 2MB</p>
        </div>
    );
}
