import { Check, MessageSquareText, Smartphone, Activity, Smile, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One 14s loop (timings live in globals.css): parts pop up spread apart with numbered labels, each is
 * outlined in turn while its details build, then everything clicks together, holds, and comes apart.
 */
const POP_STEP_MS = 260;
const FOCUS_STEP_MS = 450;
const DETAIL_STEP_MS = 90;

function Panel({
  x,
  y,
  z,
  from,
  step,
  label,
  flat,
  float = "y",
  delay = 0,
  className,
  children,
}: {
  x: number;
  y: number;
  z: number;
  /** Where the part sits in the exploded view, in scene px. */
  from: [number, number, number];
  step: number;
  label?: string;
  flat?: boolean;
  float?: "y" | "z" | "none";
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  // Flat panels are rotated onto the floor, so the scene offset is re-expressed in their own axes.
  const [ax, ay, az] = flat ? [from[0], from[2], -from[1]] : from;
  const popDelay = { animationDelay: `${step * POP_STEP_MS}ms` };
  return (
    <div
      className="absolute top-0 left-0 [transform-style:preserve-3d]"
      style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)${flat ? " rotateX(90deg)" : ""}` }}
    >
      <div
        className="[transform-style:preserve-3d] motion-safe:animate-assemble"
        style={{ "--ax": `${ax}px`, "--ay": `${ay}px`, "--az": `${az}px`, ...popDelay } as React.CSSProperties}
      >
        <div
          className={cn(
            "relative [transform-style:preserve-3d]",
            float === "y" && "motion-safe:animate-iso-bob-y",
            float === "z" && "motion-safe:animate-iso-bob-z",
            className
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          {children}
          {label && (
            <>
              <span
                className="absolute -inset-2.5 rounded-[28px] border-2 border-dashed border-brand opacity-0 motion-safe:animate-part-focus"
                style={{ animationDelay: `${step * FOCUS_STEP_MS}ms` }}
              />
              <span
                className="absolute -top-10 left-0 flex items-center gap-1.5 rounded-full bg-ink py-1 pr-3 pl-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 motion-safe:animate-part-label"
                style={popDelay}
              >
                <span className="grid size-5 place-items-center rounded-full bg-brand text-[10px]">
                  {String(step + 1).padStart(2, "0")}
                </span>
                {label}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/** A piece of a part's content that builds in while that part is in focus. */
function Detail({
  step,
  i = 0,
  as: Tag = "span",
  className,
  style,
  children,
}: {
  step: number;
  i?: number;
  as?: "span" | "div" | "p";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <Tag
      className={cn("motion-safe:animate-part-detail", className)}
      style={{ ...style, animationDelay: `${step * FOCUS_STEP_MS + i * DETAIL_STEP_MS}ms` }}
    >
      {children}
    </Tag>
  );
}

const line = "border-[1.5px] border-ink bg-white";
const bar = "h-2.5 rounded-sm bg-[#ececec]";

/** Line-art isometric phone that is laid out part by part, then assembled. Purely decorative. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative select-none", className)}>
      <div className="absolute top-[50%] left-[58%] size-0 [transform-style:preserve-3d] [transform:rotateX(-35deg)_rotateY(-45deg)] sm:top-[44%]">
        {/* Thin construction lines on the floor and up the phone's side. */}
        <Panel x={-430} y={130} z={-260} from={[0, -40, 0]} step={7} flat float="none">
          <div className="relative h-[260px] w-[200px]">
            <Detail step={7} className="absolute top-0 left-0 h-full w-[1.5px] origin-bottom bg-ink" />
            <Detail step={7} i={1} className="absolute top-24 left-0 h-[1.5px] w-10 origin-left bg-ink" />
            <Detail step={7} i={2} className="absolute top-0 left-28 h-[70%] w-[1.5px] origin-bottom bg-ink" />
          </div>
        </Panel>
        <Panel x={165} y={-60} z={-60} from={[0, -40, 0]} step={7} float="none">
          <div className="relative h-[300px] w-[60px]">
            <Detail step={7} className="absolute top-0 left-0 h-full w-[1.5px] origin-top bg-ink" />
            <Detail step={7} i={1} className="absolute top-16 left-0 h-[1.5px] w-8 origin-left bg-ink" />
            <Detail step={7} i={2} className="absolute top-48 left-0 h-[1.5px] w-8 origin-left bg-ink" />
          </div>
        </Panel>

        {/* Body: back plate with camera bump and side buttons. */}
        <Panel x={-130} y={-300} z={-150} from={[60, 40, -90]} step={0} label="Body" float="none">
          <div className="relative h-[600px] w-[300px] rounded-[48px] border-2 border-[#cfcfcf] bg-white">
            <Detail step={0} className="absolute top-8 right-8 grid size-24 grid-cols-2 place-items-center rounded-[26px] border-2 border-[#d6d6d6] p-3">
              <span className="size-7 rounded-full border-2 border-[#cfcfcf]" />
              <span className="size-7 rounded-full border-2 border-[#cfcfcf]" />
              <span className="size-7 rounded-full border-2 border-[#cfcfcf]" />
              <span className="size-3 rounded-full bg-[#dcdcdc]" />
            </Detail>
            <Detail step={0} i={2} className="absolute top-40 -right-[5px] h-16 w-[5px] origin-left rounded-r bg-[#cfcfcf]" />
            <Detail step={0} i={3} className="absolute top-60 -right-[5px] h-24 w-[5px] origin-left rounded-r bg-[#cfcfcf]" />
          </div>
        </Panel>

        {/* Display: frame, glass edge and notch. */}
        <Panel x={-130} y={-300} z={-136} from={[0, 0, 50]} step={1} label="Display" float="none">
          <div className="relative h-[600px] w-[300px] rounded-[48px] border-2 border-[#d4d4d4] bg-white">
            <Detail step={1} className="absolute inset-3 rounded-[38px] border-2 border-[#e2e2e2]" />
            <Detail step={1} i={1} className="absolute top-8 left-1/2 h-9 w-28 -translate-x-1/2 rounded-full bg-[#dedede]" />
            <Detail step={1} i={2} className="absolute inset-x-10 top-24 bottom-10 rounded-[26px] bg-[linear-gradient(135deg,#f6f6f6,transparent_60%)]" />
          </div>
        </Panel>

        {/* Chat card, standing in front of the phone. */}
        <Panel x={-170} y={-210} z={-40} from={[-170, -40, 120]} step={2} label="Chat" delay={0}>
          <div className={cn(line, "w-[230px] rounded-[22px] p-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]")}>
            <p className="text-[15px] font-semibold text-ink">Oslo Chat</p>
            <div className="mt-3 h-px bg-[#e5e5e5]" />
            <p className="mt-3 flex items-center justify-end gap-1 text-sm font-bold text-ink">
              <User className="size-4 fill-ink" />
              42
            </p>
            <div className="mt-3 flex gap-2">
              <Detail step={2} className="h-5 w-20 origin-left rounded-md bg-[#ececec]" />
              <Detail step={2} i={1} className="h-5 w-10 origin-left rounded-md bg-[#ececec]" />
            </div>
            <Detail
              step={2}
              i={3}
              as="div"
              className="mt-2 ml-auto flex w-fit origin-bottom-right gap-1.5 rounded-xl border-[1.5px] border-ink bg-[#c9f5cf] px-2.5 py-2"
            >
              <span className="h-3.5 w-12 rounded-sm bg-ink" />
              <span className="h-3.5 w-8 rounded-sm bg-ink" />
            </Detail>
            <div className="mt-3 rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] px-3 py-2 text-xs text-[#b5b5b5]">
              Message...
            </div>
          </div>
        </Panel>

        {/* To-do card, lower and further forward. */}
        <Panel x={-120} y={20} z={60} from={[-30, 110, 130]} step={4} label="Tasks" delay={700}>
          <div className={cn(line, "h-[230px] w-[190px] rounded-t-[22px] border-b-0 p-5")}>
            <p className="text-[15px] font-semibold text-ink">To-do list</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md border-[1.5px] border-ink bg-[#86e08f]">
                <Detail step={4}>
                  <Check className="size-4" strokeWidth={3} />
                </Detail>
              </span>
              <Detail step={4} i={1} className="h-3 w-4 rounded-sm bg-ink" />
              <Detail step={4} i={2} className="h-3 w-4 rounded-sm bg-ink" />
              <Detail step={4} i={3} className="h-3 w-9 origin-left rounded-sm bg-ink" />
            </div>
            {[0, 1].map((r) => (
              <div key={r} className="mt-3 flex items-center gap-2">
                <span className="size-6 rounded-md border-[1.5px] border-[#dcdcdc]" />
                <Detail step={4} i={4 + r} className={cn(bar, "w-20 origin-left")} />
              </div>
            ))}
            <Detail step={4} i={6} as="div" className={cn(bar, "mt-4 w-full origin-left")} />
            <Detail step={4} i={7} as="div" className={cn(bar, "mt-2 w-3/4 origin-left")} />
          </div>
        </Panel>

        {/* Tab bar lying on the floor in front of the to-do card. */}
        <Panel x={-150} y={250} z={0} from={[210, 0, 70]} step={6} label="Navigation" flat float="none">
          <div className="flex h-[70px] w-[250px] items-center justify-around rounded-[28px] border-[1.5px] border-[#d4d4d4] bg-white/90 px-3">
            {[Activity, MessageSquareText, Smartphone, Smile, Bot].map((Icon, i) => (
              <Detail
                key={i}
                step={6}
                i={i}
                className={cn(
                  "grid size-9 place-items-center rounded-full border-[1.5px]",
                  i === 1 ? "border-transparent text-ink" : "border-[#d0d0d0] text-[#9a9a9a]"
                )}
              >
                <Icon className={cn("size-4", i === 1 && "size-6 fill-ink")} />
              </Detail>
            ))}
          </div>
        </Panel>

        {/* Calendar card floating flat on the upper left. */}
        <Panel x={-390} y={-190} z={-60} from={[-30, 230, 150]} step={3} label="Schedule" flat float="z" delay={350}>
          <div className={cn(line, "relative h-[170px] w-[250px] rounded-[18px] p-4")}>
            <div className="space-y-2 text-[11px] text-[#9a9a9a]">
              <p className="opacity-40">8:00</p>
              <p>9:00</p>
              <p className="font-semibold text-ink">10:00</p>
              <p className="font-semibold text-ink">11:00</p>
              <p>12:00</p>
            </div>
            <Detail step={3} className="absolute top-10 left-20 h-10 w-28 origin-left rounded-lg border-[1.5px] border-ink/60" />
            <Detail
              step={3}
              i={2}
              className="absolute top-[5.5rem] left-16 h-12 w-24 origin-left rounded-lg border-[1.5px] border-ink/60 bg-white"
            />
            <span className="absolute -bottom-3 left-3 rounded-md bg-ink px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
              TUE, 12
            </span>
          </div>
        </Panel>

        {/* Performance card floating flat on the lower right. */}
        <Panel x={20} y={30} z={40} from={[150, 20, -30]} step={5} label="Analytics" flat float="z" delay={1050}>
          <div className={cn(line, "relative h-[150px] w-[260px] rounded-[18px] p-4")}>
            <div className="flex h-12 items-end gap-2">
              {[40, 70, 30, 85, 55, 95].map((h, i) => (
                <Detail
                  key={i}
                  step={5}
                  i={i}
                  className="relative w-1 origin-bottom rounded-full bg-[#dedede]"
                  style={{ height: `${h}%` }}
                >
                  <span className="absolute bottom-0 left-0 w-1 rounded-full bg-ink" style={{ height: `${h * 0.45}%` }} />
                </Detail>
              ))}
            </div>
            <p className="absolute top-4 right-4 w-24 text-right text-[11px] leading-tight text-ink">
              Overall tasks performance:
            </p>
            <Detail step={5} i={6} as="p" className="absolute right-4 bottom-4 flex origin-right items-center gap-2 text-lg font-bold text-ink">
              85.3%
              <span className="size-0 border-x-[6px] border-b-[9px] border-x-transparent border-b-ink" />
            </Detail>
          </div>
        </Panel>
      </div>
    </div>
  );
}
