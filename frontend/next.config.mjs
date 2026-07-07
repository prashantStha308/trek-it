
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
 reactStrictMode: false,
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './config/imgLoader.js',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "randomuser.me"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
    ]
  }
};

export default nextConfig;
