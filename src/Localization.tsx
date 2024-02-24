import { PropsWithChildren, useState} from 'react'
import { LocalizationContext } from './context/context'

export const localizedTexts = {
    "leaderboardHeaders" : {
        "finnish":
        <thead>
        <tr>
          <th>Nimi</th>
          <th>Kilta</th>
          <th>Aika</th>
        </tr>
      </thead>,
        "english": 
        <thead>
        <tr>
          <th>Name</th>
          <th>Guild</th>
          <th>Time</th>
        </tr>
      </thead>
    },
    "rootPageText": {
        "finnish":
            <div>
                <p>
                    Tervetuloa Ylikellotukseen - Fantasian lumoavaan maailmaan! 
                    <br/><br/>
                    Oletko valmiina heittäytymään maagiseen seikkailuun? TiK:in fuksibileet tarjoaa unohtumattoman illanvieton täynnä taikaa, seikkailua ja loistavaa seuraa!<br/><br/>
                    Luvassa on maaginen ilta täynnä yllätyksiä ja tietenkin mahtavaa musiikkia. Tule ystäviesi kanssa tai tutustu uusiin kasvoihin rennossa Ylikellotuksen porukassa. Lipun hinta on vain 8€, mutta jos mielit VIP-kohtelua, nappaa VIP-lippu hintaan 35€! VIP-lippu sisältää mahtavia etuja. Ole nopea, VIP-lippuja on rajoitettu määrä! 
                    <br/><br/>
                    Nähdään 28. helmikuuta, kun Smökissä fantasia herää eloon! Ota kaverisi mukaan ja uppoudu fantasiamaailman syvyyksiin! 
                    <br/><br/><br/>
                    TL:DR <br/>
                    Mitä: BILEET <br/>
                    Missä: Smökki <br/>
                    Päivämäärä: 28. helmikuuta <br/>
                    Hinta (sisältää haalarimerkin): 8€ / 35€ VIP <br/>
                    DC: Fantasia (tai haalarit) <br/>

                    <a href="https://t.me/ylikellotustiedotus" target='blank' className='app-logo'>
                        <img src="tgLogo.svg"/>
                    </a>
                    <a href="https://kide.app/events/3635cc2f-6d53-4120-8c24-05bf70c4f512" target='blank' className='app-logo'>
                        <img src="kideLogo.png"/>
                    </a>
                </p>
            </div>,
        "english": 
            <div>
                <p>
                    Welcome to Ylikellotus - the magical world of fantasy! 
                    <br/><br/>
                    Ready for a magical adventure? Computer science guild's fuksi party offers an unforgettable evening filled with magic, adventure, and great company!
                    <br/><br/>
                    Expect a night full of surprises and, of course, fantastic music. Come with your friends or meet new faces in the relaxed atmosphere of Ylikellotus. The ticket price is only €8, but if you desire VIP treatment, grab a VIP ticket with fantastic perks for €35! But be quick, as VIP tickets are limited! 
                    <br/><br/>
                    See you on February 28th when fantasy comes to life at Smökki! Bring your friends and immerse yourself in the depths of the fantasy world! 
                    <br/><br/><br/>
                    TL:DR <br/>
                    What: PARTY  <br/>
                    Where: Smökki <br/>
                    When: February 28th  <br/>
                    Price (includes an overall patch): 8€ / 35€ VIP  <br/>
                    DC: Fantasy (or overalls) <br/>
        
                    <a href="https://t.me/ylikellotustiedotus" target='blank' className='app-logo'>
                        <img src="tgLogo.svg"/>
                    </a>
                    <a href="https://kide.app/events/3635cc2f-6d53-4120-8c24-05bf70c4f512" target='blank' className='app-logo'>
                        <img src="kideLogo.png"/>
                    </a>
                </p>
        </div>
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