export const optimizeImageUrl = (url, width=1080) => {

    if (!url) return null;

    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
}

export const formatDate = (iso) => {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
