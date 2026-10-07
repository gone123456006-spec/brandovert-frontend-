import { Check, MessageSquareText, Smartphone, Activity, Smile, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

/** Gap between parts clicking into place during the assembly loop. */
const ASSEMBLY_STEP_MS = 260;

/**
 * Places a panel in the isometric scene. Upright panels face the viewer's left; flat ones lie on the floor.
 * Each panel flies in from `from` (scene px) as assembly step `step`, then floats in place.
 */
function Panel({
  x,
  y,
  z,
  from,
  step,
  flat,
  float = "y",
  delay = 0,
  className,
  children,
}: {
  x: number;
  y: number;
  z: number;
  from: [number, number, number];
  step: number;
  flat?: boolean;
  float?: "y" | "z" | "none";
  delay?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  // Flat panels are rotated onto the floor, so the scene offset is re-expressed in their own axes.
  const [ax, ay, az] = flat ? [from[0], from[2], -from[1]] : from;
  return (
    <div
      className="absolute top-0 left-0 [transform-style:preserve-3d]"
      style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)${flat ? " rotateX(90deg)" : ""}` }}
    >
      <div
        className="[transform-style:preserve-3d] motion-safe:animate-assemble"
        style={
          {
            "--ax": `${ax}px`,
            "--ay": `${ay}px`,
            "--az": `${az}px`,
            animationDelay: `${step * ASSEMBLY_STEP_MS}ms`,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "[transform-style:preserve-3d]",
            float === "y" && "motion-safe:animate-iso-bob-y",
            float === "z" && "motion-safe:animate-iso-bob-z",
            className
          )}
          style={{ animationDelay: `${delay}ms` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const line = "border-[1.5px] border-ink bg-white";
const bar = "h-2.5 rounded-sm bg-[#ececec]";

/** Line-art isometric phone with floating chat, calendar, to-do and performance cards. Purely decorative. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none relative select-none", className)}>
      <div className="absolute top-[50%] left-[58%] sm:top-[44%] size-0 [transform-style:preserve-3d] [transform:rotateX(-35deg)_rotateY(-45deg)]">
        {/* Thin construction lines on the floor and up the phone's side. */}
        <Panel x={-430} y={130} z={0} from={[0, -90, 0]} step={7} flat float="none">
          <div className="relative h-[260px] w-[200px] [transform:translateY(-260px)]">
            <span className="absolute top-0 left-0 h-full w-[1.5px] bg-ink" />
            <span className="absolute top-24 left-0 h-[1.5px] w-10 bg-ink" />
            <span className="absolute top-0 left-28 h-[70%] w-[1.5px] bg-ink" />
          </div>
        </Panel>
        <Panel x={165} y={-60} z={-60} from={[0, -120, 0]} step={7} float="none">
          <div className="relative h-[300px] w-[60px]">
            <span className="absolute top-0 left-0 h-full w-[1.5px] bg-ink" />
            <span className="absolute top-16 left-0 h-[1.5px] w-8 bg-ink" />
            <span className="absolute top-48 left-0 h-[1.5px] w-8 bg-ink" />
          </div>
        </Panel>

        {/* Phone body: a back plate for thickness, then the face with its notch. */}
        <Panel x={-130} y={-300} z={-150} from={[0, 0, -320]} step={0} float="none">
          <div className="h-[600px] w-[300px] rounded-[48px] border-2 border-[#dcdcdc] bg-white" />
        </Panel>
        <Panel x={-130} y={-300} z={-136} from={[0, 0, 340]} step={1} float="none">
          <div className="relative h-[600px] w-[300px] rounded-[48px] border-2 border-[#d4d4d4] bg-white">
            <div className="absolute inset-3 rounded-[38px] border-2 border-[#e2e2e2]" />
            <div className="absolute top-8 left-1/2 h-9 w-28 -translate-x-1/2 rounded-full bg-[#dedede]" />
          </div>
        </Panel>

        {/* Chat card, standing in front of the phone. */}
        <Panel x={-170} y={-210} z={-40} from={[-360, -140, 0]} step={2} delay={0}>
          <div className={cn(line, "w-[230px] rounded-[22px] p-5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.25)]")}>
            <p className="text-[15px] font-semibold text-ink">Oslo Chat</p>
            <div className="mt-3 h-px bg-[#e5e5e5]" />
            <p className="mt-3 flex items-center justify-end gap-1 text-sm font-bold text-ink">
              <User className="size-4 fill-ink" />
              42
            </p>
            <div className="mt-3 flex gap-2">
              <span className="h-5 w-20 rounded-md bg-[#ececec]" />
              <span className="h-5 w-10 rounded-md bg-[#ececec]" />
            </div>
            <div className="mt-2 ml-auto flex w-fit gap-1.5 rounded-xl border-[1.5px] border-ink bg-[#c9f5cf] px-2.5 py-2">
              <span className="h-3.5 w-12 rounded-sm bg-ink" />
              <span className="h-3.5 w-8 rounded-sm bg-ink" />
            </div>
            <div className="mt-3 rounded-xl border border-[#e2e2e2] bg-[#f7f7f7] px-3 py-2 text-xs text-[#b5b5b5]">
              Message...
            </div>
          </div>
        </Panel>

        {/* To-do card, lower and further forward. */}
        <Panel x={-120} y={20} z={60} from={[0, 360, 0]} step={4} delay={700}>
          <div className={cn(line, "h-[230px] w-[190px] rounded-t-[22px] border-b-0 p-5")}>
            <p className="text-[15px] font-semibold text-ink">To-do list</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md border-[1.5px] border-ink bg-[#86e08f]">
                <Check className="size-4" strokeWidth={3} />
              </span>
              <span className="h-3 w-4 rounded-sm bg-ink" />
              <span className="h-3 w-4 rounded-sm bg-ink" />
              <span className="h-3 w-9 rounded-sm bg-ink" />
            </div>
            {[0, 1].map((i) => (
              <div key={i} className="mt-3 flex items-center gap-2">
                <span className="size-6 rounded-md border-[1.5px] border-[#dcdcdc]" />
                <span className={cn(bar, "w-20")} />
              </div>
            ))}
            <div className={cn(bar, "mt-4 w-full")} />
            <div className={cn(bar, "mt-2 w-3/4")} />
          </div>
        </Panel>

        {/* Tab bar lying on the floor in front of the to-do card. */}
        <Panel x={-150} y={250} z={70} from={[0, 0, 360]} step={6} flat float="none">
          <div className="flex h-[70px] w-[250px] items-center justify-around rounded-[28px] border-[1.5px] border-[#d4d4d4] bg-white/90 px-3 [transform:translateY(-70px)]">
            {[Activity, MessageSquareText, Smartphone, Smile, Bot].map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  "grid size-9 place-items-center rounded-full border-[1.5px]",
                  i === 1 ? "border-transparent text-ink" : "border-[#d0d0d0] text-[#9a9a9a]"
                )}
              >
                <Icon className={cn("size-4", i === 1 && "size-6 fill-ink")} />
              </span>
            ))}
          </div>
        </Panel>

        {/* Calendar card floating flat on the upper left. */}
        <Panel x={-390} y={-190} z={110} from={[0, -340, 0]} step={3} flat float="z" delay={350}>
          <div className={cn(line, "relative h-[170px] w-[250px] rounded-[18px] p-4 [transform:translateY(-170px)]")}>
            <div className="space-y-2 text-[11px] text-[#9a9a9a]">
              <p className="opacity-40">8:00</p>
              <p>9:00</p>
              <p className="font-semibold text-ink">10:00</p>
              <p className="font-semibold text-ink">11:00</p>
              <p>12:00</p>
            </div>
            <span className="absolute top-10 left-20 h-10 w-28 rounded-lg border-[1.5px] border-ink/60" />
            <span className="absolute top-[5.5rem] left-16 h-12 w-24 rounded-lg border-[1.5px] border-ink/60 bg-white" />
            <span className="absolute -bottom-3 left-3 rounded-md bg-ink px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
              TUE, 12
            </span>
          </div>
        </Panel>

        {/* Performance card floating flat on the lower right. */}
        <Panel x={20} y={30} z={190} from={[360, 0, 0]} step={5} flat float="z" delay={1050}>
          <div className={cn(line, "relative h-[150px] w-[260px] rounded-[18px] p-4 [transform:translateY(-150px)]")}>
            <div className="flex h-12 items-end gap-2">
              {[40, 70, 30, 85, 55, 95].map((h, i) => (
                <span key={i} className="relative w-1 rounded-full bg-[#dedede]" style={{ height: `${h}%` }}>
                  <span className="absolute bottom-0 left-0 w-1 rounded-full bg-ink" style={{ height: `${h * 0.45}%` }} />
                </span>
              ))}
            </div>
            <p className="absolute top-4 right-4 w-24 text-right text-[11px] leading-tight text-ink">
              Overall tasks performance:
            </p>
            <p className="absolute right-4 bottom-4 flex items-center gap-2 text-lg font-bold text-ink">
              85.3%
              <span className="size-0 border-x-[6px] border-b-[9px] border-x-transparent border-b-ink" />
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
