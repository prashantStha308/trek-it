// config/imgLoader.js
export default function cloudinaryLoader({ src, width, quality }) {
  // Local public folder images — return as-is
  if (src.startsWith("/") || src.startsWith("./")) {
    return src
  }

  const params = [
    "f_auto",
    "c_limit",
    `w_${width}`,
    `q_${quality || "auto"}`,
  ].join(",")

  // Already a full Cloudinary URL — inject transforms
  if (src.includes("res.cloudinary.com")) {
    return src.replace("/upload/", `/upload/${params}/`)
  }

  // Raw public_id
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${src}`
}