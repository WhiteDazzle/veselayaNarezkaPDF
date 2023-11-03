import styles from "./form-input.module.scss";
import React, { useState } from "react";
import PasswordCheckboxView from "../password-checkbox-view/password-checkbox-view";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  validationMessage: string;
}

const FormInput :React.FC<Props> = ({validationMessage,type,...inputProps}) => {
  const [inputType, setInputType] = useState(type)
  return (
    <label className={styles.label}>
      <input
          {...inputProps}
          type={inputType}
        className={styles.input}
      />
      <div
        className={`${styles["input-img"]} ${styles[`input-img--${inputProps.name}`]}`}
      ></div>
      <div className={styles['input-checkbox-wrapper']}>{inputProps.name === "password" && <PasswordCheckboxView type={inputType} setInputType={setInputType}/>}</div>
      <div className={styles["underline-wrapper"]}>
        <div className={styles['underline']}></div>
      </div>
      {validationMessage && (
        <div className={styles["error-message"]}>{validationMessage}</div>
      )}
    </label>
  );
};

export default FormInput;
