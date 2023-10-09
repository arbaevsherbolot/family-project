/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "tfhlqsdjoblfxnghuumq.supabase.co",
        port: "",
        pathname: "/**/**",
      },
      {
        protocol: "https",
        hostname: "iotcdn.oss-ap-southeast-1.aliyuncs.com",
        port: "",
        pathname: "/**/*",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
};

module.exports = nextConfig;
