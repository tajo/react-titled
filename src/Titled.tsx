import * as React from 'react';
import { TitledContext } from './TitledContext';
import { TitledProvider } from './TitledProvider';

type Props = React.PropsWithChildren<{
  title: (currentTitle: string) => string;
}>;

export const Titled = (props: Props) => {
  return (
    <TitledContext.Consumer>
      {value => (
        <TitledProvider
          {...props}
          resetHeight={value?.resetHeight}
          updateParent={value?.updateParent}
        />
      )}
    </TitledContext.Consumer>
  );
};
