import {useRouter} from "next/navigation";

import useChatStore from "@/store/chat/chat.store.js";
import {
  useGetOrCreateDirectChat,
} from "@/queries/chat.query.js"
import {useGetMe} from "@/queries/auth.query.js";
import { showToast } from "@/store/ui.store";


import Avatar from "@/components/ui/Avatar";
import {Button} from "@/components/ui/Button";


export default function GuidePageHeader({ guide }) {
  const openDirectChat = useChatStore(store => store.openDirectChat);
  const { data:me, isLoading } = useGetMe();

  const router = useRouter();

  const handleChatWithGuide = () => {
    if(!me){
      showToast({
        title: "Cannot perform this action",
        message: "Please login to use this feature"
      });

      return;
    }

      openDirectChat(guide, () => {
          router.push('/chat');
      });
  };

  return (
    <header className="flex items-start gap-14 px-52 ">
      <Avatar src={guide?.profilePicture?.src} size={"lg"} />

      <section className="flex flex-col gap-4">
        <section className="flex flex-col gap-0.5">
          <h1 className="text-3xl text-primary font-bold font-mono">
            {" "}
            {guide?.name}{" "}
          </h1>
          <span className="capitalize text-sm text-text/60">
            {" "}
            {guide?.role}{" "}
          </span>
          {/*<span className="capitalize text-sm text-text/60" > {guide?.email} </span>*/}
        </section>

        <textarea
          className="text-sm text-text/85 resize-none w-sm outline-none caret-transparent"
          value={guide?.description || "User has not set a description"}
          readOnly
        ></textarea>
      </section>

      <Button
        variant={"primary"}
        color={"green"}
        size="md"
        className={"w-fit"}
        onClick={handleChatWithGuide}
      >
        Chat with Guide
      </Button>
    </header>
  );
}
