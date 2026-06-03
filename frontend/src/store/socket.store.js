import { create } from "zustand";
import { io } from "socket.io-client";
import { BASE } from "@/constants/config.constant";


const useSocketStore = create((set, get) => ({
	socket: null,
	isConnected: false,

	connect: () => {

		if (get().socket) return;

		const socket = io(BASE, {withCredentials: true});

		socket.on("connect", () => set({ isConnected: true }));
		socket.on("disconnect", () => set({ isConnected: false }));

		set({ socket });
	},

	disconnect: () => {
		const { socket } = get();
		if (socket) {
			socket.disconnect();
			set({ socket: null, isConnected: false });
		}
	},

	on: (event, handler) => {
		const { socket } = get();

		console.log("registering listener", event, !!socket);

		if (!socket) return () => { };

		socket.on(event, handler);

		return () => socket.off(event, handler);
	},

	emit: (event, data) => {
		const { socket } = get();
		console.log("EMIT", event, !!socket);
		
		if (socket) {
			socket.emit(event, data);
		}
	}

}));

export default useSocketStore;
