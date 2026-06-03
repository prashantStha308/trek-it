export const getReciptant = (chat, currentUser) => {
    if (!chat?.participants?.length) return null;
    return chat.participants.find(participant => participant?._id !== currentUser?._id);
}


export const getChatName = (chat, currentUser) => getReciptant(chat, currentUser)?.name ?? "Unknown";


export const getDisplayPicture = (chat, currentUser) => getReciptant(chat, currentUser)?.profilePicture?.src ?? "";


export const getMessageType = (content) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(content) ? "link" : "text";
}