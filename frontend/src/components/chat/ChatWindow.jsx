import { useGetMe } from "@/queries/auth.query"
import ChatBubble from "./ChatBubble";
import { Smile } from "lucide-react";
import ChatHeader from "./ChatHeader";


function ChatSection({messages}){
    return(
        <section
            id="messages"
            className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0 pr-3"
        >
            {
                messages?.map((message, index) => (
                    <ChatBubble key={index} message={message} user={currentUser} />
                ))
            }
        </section>
    )
}

function ChatInput(){
    return (
        <form id="input-chat"
            className=" bg-accent/20 dark:bg-background-dark rounded-full px-6 py-3  border-t-4 border-t-transparent flex items-center"
        >
            <Smile size={25} strokeWidth={1.5} />
        </form>
    )
}

export default function ChatWindow({chat, messages}) {
    const { data:currentUser } = useGetMe();

    const recipitient = chat?.participants?.find(person => person._id != currentUser?._id);

    return (
        <main
            id="chat-window"
            className="flex-1 h-full w-full flex flex-col justify-between gap-1 overflow-hidden"
        >
            {
                recipitient && <ChatHeader user={recipitient} />
            }

            <section
                id="messages-window"
                className="flex flex-col flex-1 p-2 overflow-hidden bg-white/5"
            >
                {
                    recipitient ? (
                        <>
                            <ChatSection messages={messages} />
                            <ChatInput />
                        </>
                    ) :
                    <section
                        className="text-primary flex justify-center items-center h-full w-full text-3xl font-black"

                    >
                        <p className="w-6/12 text-center" >
                            Select a chat to start a conversation
                        </p>
                    </section>
                }

            </section>

        </main>
    )
}