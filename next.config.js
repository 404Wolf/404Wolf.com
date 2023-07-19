module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['wolf-mermelstein-personal-website.s3.us-east-2.amazonaws.com'],
    },
    experimental: {
        serverActions: true,
    },
    async redirects() {
        return [
            {
                source: "/posts",
                destination: "/",
                permanent: false,
            }
        ]
    }
}
