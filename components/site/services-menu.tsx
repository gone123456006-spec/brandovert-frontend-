import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { services, type Service, type ServiceCategory } from "@/lib/content/services";

type MenuGroup = {
  lead: string;
  rest: string;
  icon: string;
  categories: ServiceCategory[];
};

const groups: MenuGroup[] = [
  {
    lead: "Development",
    rest: " & Design",
    icon: "group-development",
    categories: ["Development", "Design"],
  },
  {
    lead: "Growth",
    rest: " & Support",
    icon: "group-growth",
    categories: ["Growth", "Management", "Support"],
  },
];

export function serviceMenuIcon(name: string) {
  return `/illustrations/menu/${name}.png`;
}

function ServiceTile({ service, onNavigate }: { service: Service; onNavigate: () => void }) {
  return (
    <li>
      <Link
        href={`/services/${service.slug}`}
        onClick={onNavigate}
        className="group flex h-full flex-col gap-2 rounded-[1.75rem] bg-tint-mid px-5 py-5 transition hover:-translate-y-0.5 hover:bg-tint-strong focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
      >
        <span className="flex items-center gap-3">
          <Image
            src={serviceMenuIcon(service.slug)}
            alt=""
            width={128}
            height={128}
            className="size-9 shrink-0 object-contain transition-transform group-hover:scale-110"
          />
          <span className="text-base leading-snug font-medium text-ink group-hover:text-brand">
            {service.title}
          </span>
        </span>
        <span className="line-clamp-3 text-sm leading-6 text-neutral-600">{service.summary}</span>
      </Link>
    </li>
  );
}

export function ServicesMenuPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="container-page">
      <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-b-2xl border border-t-0 border-border bg-white p-6 shadow-2xl shadow-ink/10 xl:p-8">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-8">
          {groups.map((group, i) => {
            const items = services.filter((s) => group.categories.includes(s.category));
            return (
              <div key={group.lead} className={cn(i === 1 && "col-start-3")}>
                <h2 className="mb-5 flex items-center justify-center gap-3 text-xl font-bold text-ink">
                  <Image
                    src={serviceMenuIcon(group.icon)}
                    alt=""
                    width={128}
                    height={128}
                    className="size-10 object-contain"
                  />
                  <span>
                    <span className={cn(i === 1 && "text-brand")}>{group.lead}</span>
                    {group.rest}
                  </span>
                </h2>
                <ul className="grid grid-cols-2 gap-3">
                  {items.map((service) => (
                    <ServiceTile key={service.slug} service={service} onNavigate={onNavigate} />
                  ))}
                </ul>
              </div>
            );
          })}
          <div aria-hidden className="col-start-2 row-start-1 w-px bg-border" />
        </div>
      </div>
    </div>
  );
}
