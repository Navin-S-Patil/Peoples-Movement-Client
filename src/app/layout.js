import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Peoples Movement",
  description: "Peoploes movement is weekly news letter",
  icons: {
    icon: [
      {
        url: "favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["favicon/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        {children}

        <Footer />
        <ToasterProvider
          position="top-center"
          richColors
          toastOptions={{
            className: "rounded-lg",
            style: {
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #e5e7eb",
            },
          }}
        />
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
