import multer from "multer";

export const bufferUpload = multer({ storage: multer.memoryStorage() });