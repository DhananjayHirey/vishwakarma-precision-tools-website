import { createFileRoute } from '@tanstack/react-router'
import { MagicCard } from "@/components/ui/magic-card";
import { TextAnimate } from "@/components/ui/text-animate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 py-24 px-6 lg:px-20">
       <div className="max-w-6xl mx-auto">
         <TextAnimate className="text-center text-4xl text-zinc-300 font-bold mb-16">
            Contact Us
       </TextAnimate>

       <div className="max-w-2/5 mx-auto">
            {/* Contact Info */}
            <div className='space-y-6'>
                <MagicCard className="p-8 h-full rounded-xl">
                    <h3 className="text-2xl font-semibold text-white mb-8">Get in Touch</h3>
                    
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-emerald-500 w-6 h-6 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-medium text-white">Address</h4>
                                <p className="text-neutral-400 mt-1">
                                    Vishwakarma Precision Tools<br/>
                                    [Add Full Address Here]<br/>
                                    Nashik, Maharashtra, India.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Phone className="text-emerald-500 w-6 h-6 shrink-0" />
                            <div>
                                <h4 className="font-medium text-white">Phone</h4>
                                <p className="text-neutral-400 mt-1">+91 123 456 7890</p>
                            </div>
                        </div>

                         <div className="flex items-center gap-4">
                            <Mail className="text-emerald-500 w-6 h-6 shrink-0" />
                            <div>
                                <h4 className="font-medium text-white">Email</h4>
                                <p className="text-neutral-400 mt-1">info@vishwakarmatools.com</p>
                            </div>
                        </div>
                    </div>
                </MagicCard>
            </div>

          
       </div>
       </div>
    </div>
  )
}
