import styles from "./password-checkbox-view.module.scss";

const PasswordCheckboxView = ({
  setInputType,
  type,
}: {
    setInputType: (value: string) => void;
  type: string | undefined;
}) => {
    const checked = type === "password";
  const onChangeCheckbox = () => {
    if (checked) setInputType("text");
    else setInputType("password");
  };
  return (
    <label className={styles["label"]}>
      <input
        type="checkbox"
        className={styles["checkbox-password-input"]}
        checked={type==='password'}
        onChange={onChangeCheckbox}
      />
      <div
        className={`${styles["checkbox-password"]} ${
          checked
            ? styles["checkbox-password--no-view"]
            : styles["checkbox-password--view"]
        }`}
      ></div>
    </label>
  );
};

export default PasswordCheckboxView;
