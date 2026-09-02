import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
    console.log("Running in Production mode");
    config({ path: join(__dirname, "../../.env") });
} else {
    console.log("Running in Development mode");
    config({ path: join(__dirname, "../../dev.env") });
}

export const PORT = process.env.PORT;
export const MONGODB_CONN_STRING = process.env.MONGODB_CONN_STRING;
export const FRONTEND_URL = process.env.FRONTEND_URL;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_ENV_VARIABLE = process.env.CLOUDINARY_ENV_VARIABLE;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
