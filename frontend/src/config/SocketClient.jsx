"use client"

import useSocketStore from "@/store/socket.store";
import { useEffect } from "react";

export default function SocketClient() {
    const connect = useSocketStore(store => store.connect);
    const disconnect = useSocketStore(store => store.disconnect);

    useEffect(() => {
        connect();

        return(()=> disconnect())
    },[connect, disconnect])

    return null;
}