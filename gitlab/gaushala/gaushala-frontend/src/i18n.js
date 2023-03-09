import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import tEn from "../src/utils/locales/en/translation.json";
import thi from "../src/utils/locales/hi/translation.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    resources: {
      en: {
        translation: tEn,
      },
      hi: {
        translation: thi,
      },
    },
    debug: true,
    lng: localStorage.getItem("i18nextLng") || "hi",
    fallbackLng: ["hi"],
  });

export default i18n;
