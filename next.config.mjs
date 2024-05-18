const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: isProd ? '/blog' : '', // 确保静态文件路径为相对路径
    distDir: 'dist',
    output: 'export', // 导出静态文件、如不在此处配置,则需要另外添加 next export 脚本
    reactStrictMode: true, // 使用React严格模式
    assetPrefix: "/assets", // 静态资源前缀
};

export default nextConfig;
