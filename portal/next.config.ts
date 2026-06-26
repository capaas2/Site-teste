import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cfqwufidvchaybqknuar.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.skoda-storyboard.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.motor1.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.nasa.gov",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.arcpublishing.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com va.vercel-scripts.com pagead2.googlesyndication.com tpc.googlesyndication.com fundingchoicesmessages.google.com api.adtrafficquality.google;",
              "style-src 'self' 'unsafe-inline';",
              "img-src 'self' blob: data: cfqwufidvchaybqknuar.supabase.co images.unsplash.com images.pexels.com cdn.skoda-storyboard.com cdn.motor1.com raw.githubusercontent.com images-assets.nasa.gov www.nasa.gov images.arcpublishing.com pagead2.googlesyndication.com tpc.googlesyndication.com *.doubleclick.net www.googletagmanager.com;",
              "font-src 'self' data:;",
              "connect-src 'self' cfqwufidvchaybqknuar.supabase.co vitals.vercel-insights.com pagead2.googlesyndication.com tpc.googlesyndication.com *.doubleclick.net fundingchoicesmessages.google.com www.googletagmanager.com api.adtrafficquality.google;",
              "frame-src 'self' fundingchoicesmessages.google.com googleads.g.doubleclick.net tpc.googlesyndication.com www.google.com www.googletagmanager.com;",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;",
            ].join(" "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/feed",
        destination: "/feed.xml",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
