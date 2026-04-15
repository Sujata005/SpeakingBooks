import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb',
        }
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'bt29vnf5da1kwvwv.private.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
            // Keep your Open Library pattern if it's there
            {
                protocol: 'https',
                hostname: 'covers.openlibrary.org',
            }
        ],
    },
};

export default nextConfig;
