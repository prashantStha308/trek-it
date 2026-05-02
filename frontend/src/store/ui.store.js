import { create } from "zustand";

const useUIStore = create((set) => ({
    
    isToastOpen: false,
    toastData: {},
    setIsToastOpen: (status) => set({ isToastOpen: status }),
    setToastData: ({ title = "", message = "" } = {}) => set({ toastData: { title, message } }),
    showToast: ({ title = "", message = "" } = {}) => {
        set({
            isToastOpen: true,
            toastData: { title, message }
        });
    },
    closeToast: () => set({
        isToastOpen: false,
        toastData: {}
    }),

}))


export default useUIStore;

export const showToast = useUIStore.getState().showToast;
export const closeToast = useUIStore.getState().closeToast;