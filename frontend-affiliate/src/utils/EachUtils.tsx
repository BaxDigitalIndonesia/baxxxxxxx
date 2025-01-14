import { Children, ReactNode } from "react";

interface EachUtilsProps<T> {
  of: T[];
  render: (item: T, index: number) => ReactNode;
}

const EachUtils = <T,>({ render, of }: EachUtilsProps<T>) => {
  if (!Array.isArray(of)) {
    return null;
  }
  return Children.toArray(of.map((item, index) => render(item, index)));
};

export default EachUtils;
