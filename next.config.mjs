/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/RoseeRibbon" : "";

const nextConfig = {
  output: "export",
  basePath: basePath || undefined,
  optimizeFonts: false,
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
};

export default nextConfig;
