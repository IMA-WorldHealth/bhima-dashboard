import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';

const resources = {
  fr: {
    translation: fr
  }
};

const languages = localStorage.getItem('I18N_LANGUAGE');

if (languages) {
  localStorage.setItem('I18N_LANGUAGE', 'fr');
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('I18N_LANGUAGE') || 'fr',
    fallbackLng: 'fr',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
