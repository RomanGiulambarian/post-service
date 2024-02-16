import { ChangeEvent, FC, TextareaHTMLAttributes, useState } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

type TypeTextAreaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextAreaProps;

const TextArea: FC<TypeTextAreaPropsField> = ({ label, value, setValue }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles["textarea-box"]}>
      <label className={styles.label}>{label}</label>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
