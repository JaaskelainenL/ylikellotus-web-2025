import { PropsWithChildren, useState} from 'react'
import { LocalizationContext } from './context/context'
import {Link} from "react-router-dom";

export const localizedTexts = {
    "rootPageText": {
        "finnish":
            <div>
                <p>
                    Suomeksi<br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sed quia ullam repellat fugit magni excepturi consequuntur laborum.
                    Aspernatur ad ipsum sit culpa earum adipisci dolorem, nisi perferendis fugit facilis!
                </p>
                <Link to={"/leaderboard"}>Kellotuksen huipputulokset</Link>
            </div>,
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
            <div className="languageChoices">
                <button onClick={() => {
                    setLanguage("finnish")
                }} className={"langButton"}>
                    <img src="/fi.svg" alt="Finnish" />
                </button>
                <button onClick={() => {
                    setLanguage("english")
                }} className={"langButton"}>
                  <img src="/gb.svg" alt="English"/>
                </button>
            </div>
            <LocalizationContext.Provider value={getLocalizedString}>
                {props.children}
            </LocalizationContext.Provider>
        </div>
    )
}

export default Localization
