import { createContext } from "react";
import { localizedTexts } from "../Localization";

export const LocalizationContext = createContext<(name: keyof typeof localizedTexts) => JSX.Element>(() => <div/>)