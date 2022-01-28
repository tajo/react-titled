import { useContext } from 'react';
import { TitledContext } from './TitledContext';

export function useTitled() {
  const context = useContext(TitledContext);
  if (context === undefined) {
    throw new Error('useTitled must be used within a TitleProvider');
  }
  return context;
}
