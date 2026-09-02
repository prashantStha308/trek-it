// API configs

export const BASE = process.env.NODE_ENV === "production" 
    ? process.env.NEXT_PUBLIC_API_URL 
     : "http://localhost:4000"

export const BASE_API = BASE + "/api"


// Query Constance

export const DEFAULT_LIMIT = 50;
export const DEFAULT_PAGE = 1;
