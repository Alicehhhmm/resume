/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    output: 'export', // 导出静态文件、如不在此处配置,则需要另外添加 next export 脚本
    reactStrictMode: true, // 使用React严格模式
};

export default nextConfig;
