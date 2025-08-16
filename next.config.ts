export default {
  reactStrictMode: true,
  images: {
    domains: ["wolf-mermelstein-personal-website.s3.us-east-2.amazonaws.com"],
  },
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/",
        permanent: false,
      },
      {
        source: "/bio",
        destination: "/about",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};
