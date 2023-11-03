import { useState } from "react";

import styles from "./signIn-form.module.scss";
import FormInput from "../../blocks/form-input/form-input";

import { logInProfile } from "../../../services/api/profile";

const SignInForm = ({setIsAuthenticated}: {setIsAuthenticated: (value: boolean) => void}) => {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValidationMessage, setNameValidationMessage] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
  
  const handleSubmit = async (e: any) => {
    const response = await logInProfile(nameValue, passwordValue)
    if (response?.errors) setServerValidation(response.errors)
    if (response.success) setIsAuthenticated(true)
  }
  
  const setServerValidation = (errors: {[key: string]: string}) => {
    errors?.name && setNameValidationMessage(errors.name)
    errors?.password && setPasswordValidationMessage(errors.password)
  }
  
  return (
    <form className={styles["signIn-form"]}>
      <h1 className={styles.title}> welcome</h1>
      <div className={styles["input-wrapper"]}>
        <FormInput
          value={nameValue}
          onChange={({target:{value}})=> {
            setNameValue(value)
            setNameValidationMessage('')
          }}
          name="name"
          type="text"
          placeholder="введите имя пользователя"
          validationMessage={nameValidationMessage}
          required
          // pattern={emailValidationPattern}
        />
      </div>
      <div className={styles["input-wrapper"]}>
        <FormInput
          value={passwordValue}
          onChange={({target:{value}})=> {
              setPasswordValue(value)
              setPasswordValidationMessage('')
          }}
          name="password"
          type="password"
          placeholder="введите пароль"
          validationMessage={passwordValidationMessage}
          required
          minLength={6}
          maxLength={40}
        />
      </div>
      <input
        type="submit"
        value="Login"
        className={styles["input-submit"]}
        onClick={(e) => {
          e.preventDefault()
            handleSubmit(e)
        }}
      />
    </form>
  );
};

export default SignInForm;
