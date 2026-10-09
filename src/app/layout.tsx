import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Beehive Academy · Discover · Learn · Enjoy",
    template: "%s · Beehive Academy",
  },
  description:
    "Preescolar y primaria en Masaya, Nicaragua. Educación integral e inclusiva. Plataforma para familias y docentes.",
  applicationName: "Beehive Academy",
};

export const viewport: Viewport = {
  themeColor: "#2B2C6E",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${fredoka.variable} ${nunito.variable}`}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
