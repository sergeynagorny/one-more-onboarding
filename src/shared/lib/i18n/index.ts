import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n.use(detector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {},
            },
            ru: {
                translation: {},
            },
        },
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export { useTranslation };
