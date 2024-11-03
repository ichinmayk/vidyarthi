import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN
    }
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false // React already protects from XSS
  }
});

export default i18n;
