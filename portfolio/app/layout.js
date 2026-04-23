import "./globals.css";
import CursorFollower from "@/components/CursorFollower";

export const metadata = {
  title: "Parth Godhani | AI & Full Stack Developer",
  description:
    "Portfolio of Parth Godhani — AI & Full Stack Developer building modern websites, apps, and landing pages.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="cursor-none">
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
