import path from "node:path";


export const validateFileExt(file){
     const allowedExtensions = [
        // images
        ".png", ".jpeg", ".jpg", ".webp",
        // documents
        ".pdf", ".txt",
        ".doc", ".docx",
        ".ppt", ".pptx",
        ".xls", ".xlsx"
    ];

     const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
        throw new Error("Invalid files type");
    }
}