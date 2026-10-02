import { IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://manthanos.app"),
  title: {
    default: "ManthanOS — One workspace for the work behind the work",
    template: "%s · ManthanOS",
  },
  description:
    "ManthanOS is one connected workspace for creators, freelancers and small creative teams. Manage ideas, projects, tasks, clients, meetings, content and AI-assisted work without moving between tools.",
  keywords: [
    "creative workspace software",
    "content pipeline software",
    "client project management",
    "agency CRM",
    "meeting notes for teams",
    "ManthanOS",
  ],
  openGraph: {
    title: "ManthanOS — One workspace for the work behind the work",
    description:
      "Ideas, projects, tasks, clients, meetings, content and collaboration in one connected workspace. Built for creators, freelancers and small creative teams.",
    type: "website",
    siteName: "ManthanOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "ManthanOS — One workspace for the work behind the work",
    description:
      "Ideas, projects, tasks, clients, meetings and content in one connected workspace.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
