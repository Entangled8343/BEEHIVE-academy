import type { Metadata, Viewport } from "next";
import { Fredoka, Newsreader, Nunito, Poppins, Quicksand, Sacramento } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { schoolConfig } from "@/schools";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", display: "swap" });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400", variable: "--font-sacramento", display: "swap" });

const fonts = {
  beehive: `${fredoka.variable} ${nunito.variable}`,
  curie: `${newsreader.variable} ${poppins.variable}`,
  montessori: `${quicksand.variable} ${nunito.variable} ${sacramento.variable}`,
};

export const metadata: Metadata = {
  title: {
    default: `${schoolConfig.name} · ${schoolConfig.tagline}`,
    template: `%s · ${schoolConfig.shortName}`,
  },
  description: `${schoolConfig.levelsLabel}. Plataforma para familias, alumnos y docentes.`,
  applicationName: schoolConfig.name,
  icons: { icon: schoolConfig.brand.icon, apple: schoolConfig.brand.appleIcon },
};

export const viewport: Viewport = {
  themeColor: schoolConfig.brand.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} data-school={schoolConfig.id} className={fonts[schoolConfig.id]}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
