"use client"

import ChatWindow from "@/components/chat/ChatWindow";
import ChatList from "@/components/chat/ChatList";
import { useState } from "react";

export default function Chat() {

    const alice = { _id: "676f1a2b3c4d5e6f7a8b9c01", name: "Alice Rai", email: "alice@example.com", role: "tourist", gender: "female", age: 25, location: { country: "nepal", state: "bagmati" }, languages: ["english", "nepali"] }
    const bob = { _id: "676f1a2b3c4d5e6f7a8b9c02", name: "Bob Tamang", email: "bob@example.com", role: "guide", gender: "male", age: 30, location: { country: "nepal", state: "koshi" }, languages: ["english", "nepali", "tibetan"] }
    const cara = { _id: "676f1a2b3c4d5e6f7a8b9c03", name: "Cara Shrestha", email: "cara@example.com", role: "tourist", gender: "female", age: 22, location: { country: "nepal", state: "gandaki" }, languages: ["english"] }

    const users = [alice, bob, cara]

    const chat1 = { _id: "676f1a2b3c4d5e6f7a8b9c10", participants: [alice, bob], type: "direct", name:"Testo ho ra" }
    const chat2 = { _id: "676f1a2b3c4d5e6f7a8b9c11", participants: [alice, bob, cara], type: "group", name: "Everest Trip Planning" }

    const chats = [chat1, chat2]

    const messages = [
        { _id: "676f1a2b3c4d5e6f7a8b9c20", chat: chat1._id, sender: alice, content: "Hey Bob, available next week?", type: "text" },
        { _id: "676f1a2b3c4d5e6f7a8b9c21", chat: chat1._id, sender: bob, content: "Yes! Which trek?", type: "text" },
        { _id: "676f1a2b3c4d5e6f7a8b9c22", chat: chat1._id, sender: alice, content: "Annapurna Base Camp", type: "text" },
        { _id: "676f1a2b3c4d5e6f7a8b9c23", chat: chat2._id, sender: alice, content: "Group trip to Everest BC, who's in?", type: "text" },
        { _id: "676f1a2b3c4d5e6f7a8b9c24", chat: chat2._id, sender: cara, content: "I'm in!", type: "text" },
        { _id: "676f1a2b3c4d5e6f7a8b9c25", chat: chat2._id, sender: bob, content: "Let's plan it out.", type: "text" },
    ]

    const [currentUser, setCurrentUser] = useState(alice) // logged in user
    const [currentChat, setCurrentChat] = useState(chat1)
    const [currentMessages, setCurrentMessages] = useState(messages.filter(m => m.chat === chat1._id))

    const handleSelectChat = (chat) => {
        setCurrentChat(chat)
        setCurrentMessages(messages.filter(m => m.chat === chat._id))
    }

    return (
        <section className="h-full w-full flex">
            <ChatList
                chats={chats}
                currentChat={currentChat}
                currentUser={currentUser}
                onSelectChat={handleSelectChat}
            />
            <ChatWindow
                chat={currentChat}
                messages={currentMessages}
                currentUser={currentUser}
            />
        </section>
    )
}