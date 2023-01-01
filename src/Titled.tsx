import * as React from 'react';
import { TitledContext } from './TitledContext';
import { TitledProvider } from './TitledProvider';

type Props = React.PropsWithChildren<{
  title: string | ((currentTitle: string) => string);
  onChange?: (title: string) => void;
}>;

export const Titled = ({ title, ...otherProps }: Props) => {
  return (
    <TitledContext.Consumer>
      {(value) => (
        <TitledProvider
          title={typeof title === 'string' ? () => title : title}
          {...otherProps}
          resetHeight={value?.resetHeight}
          updateParent={value?.updateParent}
        />
      )}
    </TitledContext.Consumer>
  );
};
