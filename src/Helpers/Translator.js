import EnglishTranslations from 'Data/TranslationsEn.json';
import FrenchTranslations from 'Data/TranslationsFr.json';
import {useAuthStore} from "Context/authContext";
const Translator = (word) => {
    const authStore = useAuthStore();
    const language = authStore.language;
    switch(language) {
        case "en":
            return EnglishTranslations[word.toLowerCase()];
        case "fr":
            return FrenchTranslations[word.toLowerCase()];
        default:
            return word;
    }
}
export default Translator;