import React, {
  createContext,
  ReactDOM,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from 'react';

interface ContextProviderProps {
  children: ReactNode;
}

interface AppContextType {
  notificationData: object;
  setNotificationData: Dispatch<SetStateAction<object>>;
}
const defaultValues: AppContextType = {
  notificationData: {},
  setNotificationData: () => {},
};
export const AppContext = createContext(defaultValues);

const ContextProvider = ({children}: ContextProviderProps) => {
  const [notificationData, setNotificationData] = useState<object>({});

  return (
    <AppContext.Provider
      value={{
        notificationData,
        setNotificationData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
