import { PropsWithChildren, useState} from 'react'
import { LocalizationContext } from './context/context'

export const localizedTexts = {
    "rootPageText": {
        "finnish": 
            <p>
                Suomeksi<br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sed quia ullam repellat fugit magni excepturi consequuntur laborum. 
                Aspernatur ad ipsum sit culpa earum adipisci dolorem, nisi perferendis fugit facilis!
            </p>,
        "english": 
            <p>
                Englanniksi<br/>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum pariatur, eveniet ducimus, vero iusto illum iure quas eaque ea 
                consectetur labore maxime vel, animi eligendi ab quo et quae nihil.
            </p>
    }
}

function Localization(props: PropsWithChildren) {

    const [language, setLanguage] = useState<"finnish" | "english">("finnish")

    function getLocalizedString(name: keyof typeof localizedTexts): JSX.Element {
        return localizedTexts[name][language]
    }

    return (
        <div>
            <div id="languageChoices">
                <button onClick={() => {
                    setLanguage("finnish")
                }} className={"langButton"}>
                    <img src="/fi.svg" alt="Finnish flag" />
                </button>
                <button onClick={() => {
                    setLanguage("english")
                }} className={"langButton"}>
                  <img src="/gb.svg" alt="English flag"/>
                </button>
            </div>
            <LocalizationContext.Provider value={getLocalizedString}>
                {props.children}
            </LocalizationContext.Provider>
        </div>
    )
}

export default Localization
