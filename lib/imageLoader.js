export default function imageLoader({ src }) {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  return src.startsWith("/") ? src : `/${src}`;
}
