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
import CustomOrderDialog from "./custom-order-dialog";

interface AddressCompProps {
  date: Date;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setTin: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddressComp({
  date,
  setAddress,
  setEmail,
  setTin,
}: AddressCompProps) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3 min-w-120">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Label className="px-1">
            Estimated Time of Arrival :
            <span>
              <Info size={18} className="my-auto cursor-pointer" />
            </span>
          </Label>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>For urgent orders please make a custom order from here</p>
          <Button onClick={()=>setDialogOpen(true)} className="mt-1">Custom Order</Button>
        </HoverCardContent>
        <CustomOrderDialog open={dialogOpen} onClose={()=>setDialogOpen(false)} />
      </HoverCard>
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
            onSelect={() => {
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
      <Input onChange={(e) => setEmail(e.target.value)} />
    </div>
  );
}
