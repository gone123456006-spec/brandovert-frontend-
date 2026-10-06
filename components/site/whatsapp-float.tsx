import { whatsappHref } from "@/lib/site";
import { WhatsAppIcon } from "./brand-icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-30 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
