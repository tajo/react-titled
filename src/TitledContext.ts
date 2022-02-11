import { createContext } from 'react';

type TitledContext = {
  updateParent: (titles: Array<(currentTitle: string) => string>) => void;
  resetHeight?: () => void;
};

/**
 * TitledContext is how Titled components track and update their parents.
 */
export const TitledContext = createContext<TitledContext | undefined>(
  undefined
);
