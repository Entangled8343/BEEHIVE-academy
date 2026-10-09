import { getRequestConfig } from "next-intl/server";

// Por ahora solo español. Para activar inglés se agrega routing por locale
// (src/i18n/routing.ts) y src/messages/en.json, sin cambiar los componentes.
export default getRequestConfig(async () => {
  const locale = "es";
  return {
    locale,
    timeZone: "America/Managua",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
