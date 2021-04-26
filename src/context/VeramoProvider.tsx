import * as React from "react";
import { agent } from "../services/VeramoService";

// typescript hack to get around having to initialize the object
// @ts-ignore
export const VeramoContext = React.createContext<agent>({});
