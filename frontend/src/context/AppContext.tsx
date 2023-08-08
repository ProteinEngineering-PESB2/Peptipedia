import { createContext } from "react";

interface IAppContext {
  section: string;
  toggleSection: (section: string) => void;
}

export const defaultState: IAppContext = {
  section: "home",
  toggleSection: () => "home"
};

const AppContext = createContext<IAppContext>(defaultState);

export default AppContext;
