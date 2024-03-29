module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['wolf-mermelstein-personal-website.s3.us-east-2.amazonaws.com'],
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
            }
        ]
    },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.externals.push({ canvas: 'commonjs canvas' })
        return config
    },
}
