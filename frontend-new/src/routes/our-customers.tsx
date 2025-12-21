import { createFileRoute } from '@tanstack/react-router'
import { ImageSlider } from "@/components/ImageSlider";
import { TextAnimate } from "@/components/ui/text-animate";

export const Route = createFileRoute('/our-customers')({
  component: OurCustomers,
})

function OurCustomers() {
  return (
    <div className="min-h-screen w-full bg-black text-neutral-200 py-24 px-6 lg:px-20 flex flex-col items-center">
       <TextAnimate className="text-center text-4xl text-zinc-300 font-bold mb-16">
            Our Customers
       </TextAnimate>
       <div className='w-full max-w-6xl'>
          <p className="text-center text-neutral-400 text-lg mb-12 max-w-2xl mx-auto">
            We are proud to serve a diverse range of clients, delivering precision and quality that powers their success.
          </p>
          <ImageSlider />
       </div>
    </div>
  )
}
