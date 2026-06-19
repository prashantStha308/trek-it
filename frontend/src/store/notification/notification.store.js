import { create } from "zustand";
import notificationEventsSlice from "./notificationEvents.slice.js";
import notificationHelperSlice from "./notificationHelper.slice.js";


const useNotificationStore = create((set, get)=>({

    isNotificationOpen: false,
    setIsNotificationOpen: (state)=> set({ isNotificationOpen: state }),
    toggleNotificationOpen: () => set( state => ({ isNotificationOpen: !state.isNotificationOpen }) ),

	notifications: [],
	setNotifications: (notifArray) => set({ notifications: notifArray }),


	...notificationEventsSlice(set, get),
	...notificationHelperSlice(set,get),

}))

export default useNotificationStore;

export const toggleNotification = useNotificationStore.getState().toggleNotificationOpen;