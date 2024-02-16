import { ChangeEvent, FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  type: string;
  value: string;
  setValue: (value: string) => void;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & InputProps;

const Input: FC<TypeInputPropsField> = ({ label, type, value, setValue }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles["input-box"]}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
