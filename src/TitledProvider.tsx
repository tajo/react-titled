import * as React from 'react';
import { TitledContext } from './TitledContext';
import { useTitledValues } from './useTitledValues';

type Props = React.PropsWithChildren<{
  title: (currentTitle: string) => string;
  onChange?: (title: string) => void;
  updateParent?: (titles: Array<(currentTitle: string) => string>) => void;
  resetHeight?: () => void;
}>;

/**
 * TitledProvider is a context provider component to make useAuth() available to our app.
 */
export function TitledProvider({ children, ...props }: Props) {
  const titledValues = useTitledValues(props);

  return (
    <TitledContext.Provider value={titledValues}>
      {children}
    </TitledContext.Provider>
  );
}
