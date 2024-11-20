import { createContext } from "react";
import { IUserContext } from "../store/interface";

export const UserContext = createContext<IUserContext>({});