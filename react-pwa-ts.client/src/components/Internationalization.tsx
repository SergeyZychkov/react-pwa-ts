import {useState} from 'react'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    "Example of translations": "Welcome to React and react-i18next"
                }
            },
            esp: {
                translation: {
                    "Example of translations": "Bienvenido a React y react-i18next"
                }
            },
            pol: {
                translation: {
                    "Example of translations": "Witamy w React i react-i18next"
                }
            }
        },
        lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

const Internationalization = () => {

    const { t, i18n } = useTranslation();

    const [lang, setLang] = useState('en');

    function handleLangChange(event: any) {
        setLang(event.target.value);
        i18n.changeLanguage(event.target.value);
    }

    return (
        <div>
            <p>Select language</p>
            <select value={lang} onChange={handleLangChange}>
                <option value="en">English</option>
                <option value="esp">Spanish</option>
                <option value="pol">Polish</option>
            </select>
            
            <h2>{t('Example of translations')}</h2>
        </div>
    );
};

export default Internationalization;