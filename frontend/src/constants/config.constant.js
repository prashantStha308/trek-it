export const BASE = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_API_URL 
    : "http://localhost:4000"

export const BASE_API = BASE + "/api"