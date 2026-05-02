export const optimizeImageUrl = (url, width=1080) => {
    if (!url) return '';
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
}