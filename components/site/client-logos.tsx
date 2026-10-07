import Image from "next/image";
import Link from "next/link";
import { clientLogos, type ClientLogo } from "@/lib/content/company";
import { cn } from "@/lib/utils";

const iconClass = "size-10 shrink-0 rounded-[0.6rem] bg-white object-contain shadow-[0_1px_3px_rgb(0_0_0/0.15)]";

function TextLogo({ client }: { client: Extract<ClientLogo, { kind: "text" }> }) {
  switch (client.name) {
    case "Hovertech":
      return (
        <span className="font-poppins text-2xl font-bold tracking-tight">
          <span className="text-[#f26b1d]">Hover</span>
          <span className="text-ink">tech</span>
        </span>
      );
    case "Dhanvia":
      return <span className="font-poppins text-2xl font-bold tracking-tight text-[#00bc61]">Dhanvia</span>;
    default:
      return (
        <>
          {client.logo && <Image src={client.logo} alt="" width={80} height={80} className={iconClass} />}
          <span className="font-poppins text-2xl font-bold tracking-tight whitespace-nowrap text-ink">{client.name}</span>
        </>
      );
  }
}

function LogoContent({ client }: { client: ClientLogo }) {
  if (client.kind === "wordmark") {
    return (
      <Image
        src={client.logo}
        alt={client.name}
        width={client.width}
        height={client.height}
        className={cn("w-auto", client.width / client.height > 3 ? "h-8" : "h-12")}
      />
    );
  }
  if (client.kind === "text") return <TextLogo client={client} />;
  return (
    <>
      <Image src={client.logo} alt="" width={80} height={80} className={iconClass} />
      <span className="text-lg font-bold whitespace-nowrap text-ink">{client.name}</span>
    </>
  );
}

function LogoList({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={cn(
        "flex shrink-0 items-center gap-x-14 pr-14",
        hidden ? "motion-reduce:hidden" : "motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6 motion-reduce:pr-0"
      )}
    >
      {clientLogos.map((c) => {
        const content = <LogoContent client={c} />;
        const itemClass = "flex h-14 items-center gap-2.5";
        return (
          <li key={c.name}>
            {c.href ? (
              <Link
                href={c.href}
                tabIndex={hidden ? -1 : undefined}
                className={cn(itemClass, "transition-transform hover:-translate-y-0.5")}
              >
                {content}
              </Link>
            ) : (
              <span className={itemClass}>{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Client logos scrolling in an endless row; the list is rendered twice so the loop is seamless. */
export function ClientLogos() {
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none">
        <LogoList />
        <LogoList hidden />
      </div>
    </div>
  );
}
