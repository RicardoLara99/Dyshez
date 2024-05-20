/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
        remotePatterns: [
          {
            hostname:'sicdirirqtfbcymxzofn.supabase.co'
          }
        ],
      },
      experimental: {
        serverActions: {
          bodySizeLimit: '10MB', 
        },
      },
};

export default nextConfig;
