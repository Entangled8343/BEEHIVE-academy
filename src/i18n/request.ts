import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { schoolConfig } from "@/schools";

/**
 * Idioma por cookie (NEXT_LOCALE), limitado a los idiomas habilitados para el colegio.
 * Curie: español e inglés. Beehive: solo español.
 */
export default getRequestConfig(async () => {
  const requested = (await cookies()).get("NEXT_LOCALE")?.value;
  const locale = schoolConfig.locales.find((l) => l === requested) ?? "es";
  return {
    locale,
    timeZone: "America/Managua",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
