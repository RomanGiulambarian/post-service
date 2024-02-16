import { FC, ReactNode, memo } from 'react';
import './IndentBox.scss';

interface IndentBoxProps {
  children: ReactNode;
  marginBottom: string;
}

const IndentBox: FC<IndentBoxProps> = ({ children, marginBottom }) => {
  const IndentBoxClasses = `IndentBox-${marginBottom ? `margin-${marginBottom}` : ''}`;

  return <div className={IndentBoxClasses}>{children}</div>;
};

export default memo(IndentBox);
