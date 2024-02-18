import { deserialize } from 'v8';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, 
    env: {
        SERVER: 'http://localhost:5000',
        CLIENT: 'http://localhost:5173',
        SPOTIFY_CLIENT_ID: '58068c9e86e64d2dbc08e4a5c8b8e1ab',
        REDIRECT_URI: 'http://localhost:5173/callback',
        PUBLIC_URL: ''
    },
    async redirects() {
        return [
            {
                source: '/revisit',
                destination: 'revisit/home',
                permanent: true,
            }

        ]
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',

            }
        ]
    }
};


export default nextConfig;
