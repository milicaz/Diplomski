import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locales/en.json';
import sr from '../locales/sr.json';

export const languageResources = {
    en: {translation: en},
    sr: {translation: sr},
}

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: 'sr',
    fallbackLng: 'sr',
    resources: languageResources,
});

export default i18next;