/** @type {import('next').NextConfig} */
const nextConfig = {
// Freepik and Picsum image usage: Add allowed domains for next/image
images: {
  domains: [
    "img.freepik.com",
    "freepik.com",
    "www.freepik.com",
    "picsum.photos"
  ],
},
};

export default nextConfig;
