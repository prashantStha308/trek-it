// io: as in input output for socket.

// This folder will act as a global container for io, as it's needed for notification, and it's can't be bothered to painstakenly pass down io in each and every service functions.

let _io;

export const setIo = (io) => _io = io;
export const getIo = () => _io;