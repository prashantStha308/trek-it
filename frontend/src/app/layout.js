import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocketClient from "@/api/socket/SocketClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Trek-It",
    template: "%s | Trek-It"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <SocketClient />
        {children}
      </body>
    </html>
  );
}