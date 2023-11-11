import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
const config = {
  fallbackLng: "en", // Default language
  debug: true, // Enable debug mode for development
  interpolation: {
    escapeValue: false, // React already escapes values by default
  },
  detection: {
    order: ["localStorage", "cookie", "navigator"],
  },
  react: {
    useSuspense: false, // Disable Suspense for React
  },
};
i18n.use(initReactI18next).use(Backend).init(config);

export default i18n;
