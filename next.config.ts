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
                hostname: 'bt29vnf5da1kwvwv.private.blob.vercel-storage.com', // Match the error exactly
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'bt29vnf5da1kwvwv.public.blob.vercel-storage.com', // Good to have for fallback
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'covers.openlibrary.org',
            }
        ],
    },
};

export default nextConfig;
