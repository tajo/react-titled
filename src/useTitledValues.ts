import { useEffect, useRef } from 'react';

type TitlerFn = (title: string) => string;

type Props = React.PropsWithChildren<{
  title: TitlerFn;
  onChange?: (title: string) => void;
  updateParent?: (titles: TitlerFn[]) => void;
  resetHeight?: () => void;
}>;

export function useTitledValues({
  title,
  onChange,
  updateParent,
  resetHeight
}: Props) {
  const heightRef = useRef(0);

  function handleUpdateTitle(titles: TitlerFn[]) {
    const finalTitleStr = titles.reduceRight(
      (titleStr, titleFn) => titleFn(titleStr),
      ''
    );
    if (document?.title !== finalTitleStr) {
      document.title = finalTitleStr;
    }
    onChange?.(finalTitleStr);
  }

  function handleUpdateParent(titles: TitlerFn[]) {
    const nextTitles = titles.concat([title]);
    if (updateParent) {
      updateParent(nextTitles);
    } else if (heightRef.current <= nextTitles.length) {
      heightRef.current = nextTitles.length;
      handleUpdateTitle(nextTitles);
    }
  }

  function handleResetHeight() {
    heightRef.current = 0;
    resetHeight?.();
  }

  function componentDid() {
    if (updateParent) {
      updateParent([title]);
    } else if (heightRef.current <= 1) {
      handleUpdateTitle([title]);
    }
  }

  useEffect(() => {
    componentDid();

    return handleResetHeight;
  });

  return {
    updateParent: handleUpdateParent,
    resetHeight: handleResetHeight
  };
}
