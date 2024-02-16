import { forwardRef, useState } from "react";
import styles from "./Field.module.scss";
import passwordHiddenIcon from "../../../assets/img/password-hidden-icon.svg";
import passwordVisibleIcon from "../../../assets/img/password-visible-icon.svg";
import { FieldError } from "react-hook-form";
import { InputHTMLAttributes } from "react";

export interface FieldProps {
  label: string;
  error?: FieldError;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & FieldProps;

export interface IField extends TypeInputPropsField {}

const Field = forwardRef<HTMLInputElement, IField>(
  ({ type, label, error, ...rest }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const toggleVisible = () => {
      setPasswordVisible(!passwordVisible);
    };

    return (
      <>
        {error && <div className={styles.error}>{error.message}</div>}
        <div className={styles.inputBox}>
          <label>{label}</label>
          <input ref={ref} type={passwordVisible ? "text" : type} {...rest} />

          {type === "password" && (
            <img
              className={styles.icon}
              src={passwordVisible ? passwordHiddenIcon : passwordVisibleIcon}
              alt="Иконка видимости пароля"
              onClick={toggleVisible}
            />
          )}
        </div>
      </>
    );
  }
);

Field.displayName = "Field";

export default Field;
