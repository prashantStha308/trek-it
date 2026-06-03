export default function cloudinaryLoader({ src, width, quality }) {

    if (!src) return "/assets/svg/defaultPfp.svg";
    if (src.startsWith("/") || src.startsWith("./")) return src;

    const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`].join(",");

    if (src.includes("res.cloudinary.com")) {
        return src.replace("/upload/", `/upload/${params}/`);
    }

    console.warn("cloudinaryLoader received a non-URL src:", src);
    return src;
}