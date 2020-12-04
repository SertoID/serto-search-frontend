import * as React from "react";
import { PhonebookService } from "../services/PhonebookService";

// typescript hack to get around having to initialize the object
// @ts-ignore
export const PhonebookContext = React.createContext<PhonebookService>({});
