/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["avatar.vercel.sh", "auraui.com"],
    remotePatterns: [new URL("https://cdn.sanity.io/images/ozyqsoog/production/**")]
  },
};

export default nextConfig;
