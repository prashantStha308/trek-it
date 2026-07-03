import { create } from "zustand";
import { io } from "socket.io-client";
import { BASE } from "@/constants/config.constants";


const useSocketStore = create((set, get) => ({
	socket: null,
	isConnected: false,

	connect: () => {
		if (get().socket) return;

		const socket = io(BASE, {withCredentials: true});

		socket.on("connect", () => set({ isConnected: true }));
		socket.on("disconnect", () => set({ isConnected: false }));

		set({ socket });

		console.log("Socket connected");
	},

	disconnect: () => {
		const { socket } = get();
		if (socket) {
			socket.disconnect();
			set({ socket: null, isConnected: false });
		}

		console.log("Socket disconnected");
	},

	on: (event, handler) => {
		const { socket } = get();

		if (!socket) return () => { };

		socket.on(event, handler);

		return () => socket.off(event, handler);
	},

	onAny: (handler) => {
	    const { socket } = get();
	    if (!socket) return () => {};

	    const wrapper = (eventName, ...args) => handler(eventName, ...args);
	    socket.onAny(wrapper);

	    return () => socket.offAny(wrapper);
	},

	emit: (event, data) => {
		const { socket } = get();		
		if (socket) {
			socket.emit(event, data);
		}
	}

}));

export default useSocketStore;
