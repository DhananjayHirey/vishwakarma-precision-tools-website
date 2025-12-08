// import * as React from "react";
import { ChevronDownIcon, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface AddressCompProps {
  date: Date;
  address: string;
  tin: number;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setTin: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddressComp({
  date,
  address,
  setAddress,
  email,
  setEmail,
  tin,
  setTin,
}: AddressCompProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 min-w-120">
      <Label htmlFor="date" className="px-1">
        Date of birth:
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Label className="px-1">Shipping Address:</Label>
      <Input onChange={(e) => setAddress(e.target.value)} />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Label className="px-1">
            Transporter Interaction Number (TIN) :
            <span>
              <Info size={18} className="my-auto cursor-pointer" />
            </span>
          </Label>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>
            TIN is the number our transporter will contact while shipping the
            package.
          </p>
        </HoverCardContent>
      </HoverCard>
      <Input onChange={(e) => setTin(e.target.value)} />
      <Label>Email Address: (Sales Dept.)</Label>
      <Input />
    </div>
  );
}
