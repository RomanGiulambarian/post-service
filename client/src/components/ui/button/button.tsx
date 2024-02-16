import { FC, PropsWithChildren, ButtonHTMLAttributes, memo } from "react";
import styles from "./Button.module.scss";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  onClick,
  ...rest
}) => {
  return (
    <button className={styles.Button} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default memo(Button);
