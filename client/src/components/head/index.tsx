import { FC, memo } from 'react';
import styles from './Head.module.scss';

interface HeadProps {
  title: string;
  description: string;
}

const Head: FC<HeadProps> = ({ title, description }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <p>{description}</p>
    </>
  );
};

export default memo(Head);
