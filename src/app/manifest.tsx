import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'UnoffiMap',
        short_name: 'UnoffiMap',
        description: 'A Progressive Web App built with Next.js',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/logo.jpg',
                sizes: '192x192',
                type: 'image/jpg',
            },
            {
                src: '/logo.jpg',
                sizes: '512x512',
                type: 'image/jpg',
            },
        ],
    }
}