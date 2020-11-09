import EnglishTranslations from 'Data/TranslationsEn.json';
import FrenchTranslations from 'Data/TranslationsFr.json';
import {useAuthStore} from "Context/authContext";
const Translator = (word) =>{
    const authStore = useAuthStore();
    const language = authStore.language;
    if(language == "en"){
        return(
            EnglishTranslations[word]
        )
    }else{ 
        return(
            FrenchTranslations[word] 
        )
    }


}
export default Translator;