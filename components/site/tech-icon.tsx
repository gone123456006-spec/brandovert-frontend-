import Image from "next/image";
import {
  type SimpleIcon,
  siCloudflare,
  siCloudinary,
  siDocker,
  siExpo,
  siFacebook,
  siFigma,
  siFirebase,
  siFlutter,
  siGithub,
  siGithubactions,
  siGoogle,
  siGoogleads,
  siGoogleanalytics,
  siGooglecloud,
  siGooglesearchconsole,
  siHubspot,
  siInstagram,
  siJavascript,
  siJira,
  siKotlin,
  siKubernetes,
  siLucide,
  siMeta,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siRazorpay,
  siReact,
  siReacthookform,
  siRedis,
  siResend,
  siSemrush,
  siSentry,
  siShadcnui,
  siShopify,
  siStripe,
  siSwift,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWebflow,
  siWoocommerce,
  siWordpress,
  siX,
  siYoutube,
  siZod,
  siDatadog,
} from "simple-icons";
import { cn } from "@/lib/utils";

const brandIcons: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  React: siReact,
  "React Native": siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  "Tailwind CSS": siTailwindcss,
  "shadcn/ui": siShadcnui,
  Lucide: siLucide,
  "React Hook Form": siReacthookform,
  Zod: siZod,
  PostgreSQL: siPostgresql,
  "MongoDB Atlas": siMongodb,
  Prisma: siPrisma,
  Cloudinary: siCloudinary,
  Razorpay: siRazorpay,
  Stripe: siStripe,
  Resend: siResend,
  Vercel: siVercel,
  GitHub: siGithub,
  "GitHub Actions": siGithubactions,
  Expo: siExpo,
  Flutter: siFlutter,
  Swift: siSwift,
  Kotlin: siKotlin,
  Firebase: siFirebase,
  Python: siPython,
  Redis: siRedis,
  Docker: siDocker,
  Kubernetes: siKubernetes,
  "Google Cloud": siGooglecloud,
  Cloudflare: siCloudflare,
  Shopify: siShopify,
  WooCommerce: siWoocommerce,
  WordPress: siWordpress,
  Webflow: siWebflow,
  Figma: siFigma,
  FigJam: siFigma,
  "Google Ads": siGoogleads,
  "Meta Ads": siMeta,
  "Meta Business Suite": siMeta,
  GA4: siGoogleanalytics,
  "Search Console": siGooglesearchconsole,
  "Google Business Profile": siGoogle,
  HubSpot: siHubspot,
  Semrush: siSemrush,
  Instagram: siInstagram,
  Facebook: siFacebook,
  YouTube: siYoutube,
  X: siX,
  Sentry: siSentry,
  Datadog: siDatadog,
  Jira: siJira,
};

// Logos simple-icons doesn't carry, saved from the brands' own assets.
const fileIcons: Record<string, string> = {
  Motion: "/tech/motion.svg",
  "Auth.js": "/tech/authjs.svg",
  "Amazon S3": "/tech/aws.svg",
  AWS: "/tech/aws.svg",
  Recharts: "/tech/recharts.svg",
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const file = fileIcons[name];
  if (file) {
    return (
      <Image
        src={file}
        alt=""
        aria-hidden
        width={20}
        height={20}
        unoptimized
        className={cn("size-5 object-contain", className)}
      />
    );
  }

  const icon = brandIcons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill={`#${icon.hex}`}
      className={cn("size-5 shrink-0", className)}
    >
      <path d={icon.path} />
    </svg>
  );
}
