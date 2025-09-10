import { createContext, useContext, useState } from 'react';

const TOCContext = createContext();

export const useTOC = () => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error('useTOC must be used within a TOCProvider');
  }
  return context;
};

export const TOCProvider = ({ children }) => {
  const [tocData, setTocData] = useState([]);

  const updateTOC = (tocTexts) => {
    setTocData(tocTexts);
  };

  const clearTOC = () => {
    setTocData([]);
  };

  return (
    <TOCContext.Provider value={{ tocData, updateTOC, clearTOC }}>
      {children}
    </TOCContext.Provider>
  );
};
