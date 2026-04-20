import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    login, logout,
    register
} from "@/api/auth.api.js";


// remove all logs after finalizing

export const useAuthStore = create(persist((set, get) => {

    const withLoading = async (func) => {
        set({ loading: true });
        try {
            await func();
        } catch (err) {
            throw err;
        } finally {
            set({ loading: false });
        }
    };

    return {
        isLoggedIn: false,
        user: {},
        loading: false,

        login: async (body) => withLoading(async () => {
            const res = await login(body);
            set({ isLoggedIn: true, user: res.data });
        }),

        logout: async () => withLoading(async () => {
            await logout();
            set({ isLoggedIn: false, user: {} });
        }),

        register: async (body, role = "tourist") => withLoading(async () => {
            const res = await register(body, role);
            set({ isLoggedIn: true, user: res.data });
        }),
    }
}, {
    name: "auth-store",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn })
}
))