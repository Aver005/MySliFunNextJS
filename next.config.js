/** @type {import('next').NextConfig} */
const nextConfig = 
{
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    async redirects() 
    {
        return [
            {
                source: '/artists/:name',
                destination: '/artist/:name',
                permanent: true,
            },
            {
                source: '/releases/:id',
                destination: '/release/:id',
                permanent: true,
            }
        ];
    }
}

module.exports = nextConfig
