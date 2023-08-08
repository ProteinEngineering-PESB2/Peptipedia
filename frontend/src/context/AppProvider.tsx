import { ReactElement, useState } from "react";
import AppContext, { defaultState } from "./AppContext";

interface Props {
  children: ReactElement;
}

export default function AppProvider({ children }: Props) {
  const [section, setSection] = useState(defaultState.section);
  const toggleSection = (section: string) => {
    setSection(section);
  };
  return (
    <AppContext.Provider
      value={{
        section,
        toggleSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
