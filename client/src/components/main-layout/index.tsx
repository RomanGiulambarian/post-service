import { FC, memo } from 'react';
import styles from './Wrapper.module.scss';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = () => {
  return (
    <div className={styles.MainLayout}>
      <Outlet />
    </div>
  );
};

export default memo(MainLayout);
