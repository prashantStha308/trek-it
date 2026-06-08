import {
    Smile,
    CirclePlus,
    Send,
} from "lucide-react";


const RoundedBg = ({ele})=>{
    return (
        <div
            className="rounded-full bg-accent/20 hover:bg-accent/75 dark:bg-background-dark p-1.5 cursor-pointer flex justify-center items-center"
        >
            {ele}
        </div>
    )
}

export default function ChatInput({ onSubmit }){
    return (
        <form
            id="input-chat"
            onSubmit={onSubmit}

            className="px-8 py-2 border-t border-t-accent/45 dark:border-t-accent/15 flex items-center gap-2 w-full"
        >
            <RoundedBg ele={<Smile size={25} strokeWidth={1.5} className="text-text/75" />} />
            <RoundedBg ele={<CirclePlus size={25} strokeWidth={1.5} className="text-text/75" />} />

            <div className="flex-1 rounded-lg bg-accent/20 dark:bg-background-dark px-4 py-1.5">

                <label htmlFor="message" className="sr-only" >Message</label>
                
                <textarea
                    id="message"
                    name="messageContent"
                    type="text"
                    className="w-full outline-none bg-transparent text-sm resize-none"
                    placeholder="Type a message..."
                    autoComplete="off"
                />
            </div>

            <RoundedBg
                ele={
                    <button type="submit" className="cursor-pointer" >
                        <Send size={25} strokeWidth={1.5} className="text-text/75" />
                    </button>
                }
            />

        </form>
    )
}