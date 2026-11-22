const isGithubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
const BASE_PATH = isGithubPages ? "/RoseeRibbon" : "";

export default function imageLoader({ src }) {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return `${BASE_PATH}${src.startsWith("/") ? "" : "/"}${src}`;
}
