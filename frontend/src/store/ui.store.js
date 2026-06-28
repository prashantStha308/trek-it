import { create } from "zustand";

const useUIStore = create((set) => ({
    
    isToastOpen: false,
    setIsToastOpen: (status) => set({ isToastOpen: status }),

    toastData: {},
    setToastData: ({ title = "", message = "" } = {}) => set({ toastData: { title, message } }),

    isNotificationOpen: true,
    setIsNotificationOpen: (state)=> set({ isNotificationOpen: state }),
    toggleNotificationOpen: () => set( state => ({ isNotificationOpen: !state.isNotificationOpen }) ),

    showToast: ({ title = "Success", message = "" } = {}) => {
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

export const toggleNotification = useUIStore.getState().toggleNotificationOpen;