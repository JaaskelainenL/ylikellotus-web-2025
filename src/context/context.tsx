import { createContext } from "react";
import { localizedTexts } from "../Localization";
import React from "react";

export const LocalizationContext = createContext<(name: keyof typeof localizedTexts) => JSX.Element>(() => /* Why is </div> not working????? */ React.createElement("div"))