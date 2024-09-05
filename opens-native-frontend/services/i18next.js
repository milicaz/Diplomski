import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../locales/en.json';
import sr from '../locales/sr.json';

export const languageResources = {
    en: { translation: en },
    sr: { translation: sr },
};

i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: 'sr',
    fallbackLng: 'sr',
    resources: languageResources,
    interpolation: {
        escapeValue: false, // React already safes from xss
    },
    // pluralSeparator: '_', // Default separator for plural keys
    // contextSeparator: '_', // Default separator for context keys
    // pluralRules: {
    //     sr: (count) => {
    //         if (count === 1) return 'one';
    //         if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) return 'few';
    //         return 'other';

    //     },
    // },
    // load: 'currentOnly',
});

export default i18next;