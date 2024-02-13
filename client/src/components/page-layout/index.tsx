import { FC, ReactNode, memo } from 'react';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return <div className={styles.PageLayout}>{children}</div>;
};

export default memo(PageLayout);
