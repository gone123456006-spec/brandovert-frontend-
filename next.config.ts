import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the same Wi-Fi load the dev server's scripts via the Mac's LAN IP.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
};

export default nextConfig;
