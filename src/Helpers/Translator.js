import EnglishTranslations from 'Data/TranslationsEn.json';
import FrenchTranslations from 'Data/TranslationsFr.json';
import {useAuthStore} from "Context/authContext";
const Translator = (word="") => {
    const authStore = useAuthStore();
    const language = authStore.language;
    let translation = word.toLowerCase();
    switch(language) {
        case "en":
            translation = EnglishTranslations[translation];
            break;
        case "fr":
            translation = FrenchTranslations[translation];
            break;
        default:
            translation = word;
            break;
    }
    return translation === "" || translation == null ? word : translation;
}
export default Translator;