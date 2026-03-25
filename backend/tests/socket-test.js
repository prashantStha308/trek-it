import { io } from "socket.io-client";
import fs from "fs/promises";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const testUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YmVkNzJlMDZhZjAwZjhhMDI4OTI3ZSIsInJvbGUiOiJ0b3VyaXN0IiwiaWF0IjoxNzc0NDUyNzU2LCJleHAiOjE3NzcwNDQ3NTZ9.Q6GKFqzI5mShcWWqwp-IokGDCGlGIud_-2-BxgqktP0";

const argv = yargs(hideBin(process.argv)).parse();

if (!argv.f) {
    console.error("File not passed. Use -f <path>");
    process.exit(1);
}

const pathToFile = argv.f;

(async () => {
    const socket = io("http://localhost:5000", {
        auth: { token: testUserToken }
    });

    socket.on("connect", async () => {
        console.log("Connected to server");

        const file = await fs.readFile(pathToFile);
        const filename = path.basename(pathToFile);

        socket.emit("chat:sendFile", {
            file,
            filename,
            mimetype: "application/pdf"
        });

        console.log("File sent");
    });

    socket.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
    });
})();