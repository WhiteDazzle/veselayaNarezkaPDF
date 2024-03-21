import fieldsValidationMessage from "../../../constants/fieldsValidationMessage";

export const NameValidation = (name: string): {name: string} | false => {
    if (!name) return { name: fieldsValidationMessage.emptyName }
    if (name.length > 10) return { name: fieldsValidationMessage.maxLength(10) }
    if (name.length < 3) return { name: fieldsValidationMessage.minLength(3) }
    return false
}

export const passwordValidation = (password: string): {password: string} | false => {
    if (!password) return { password: fieldsValidationMessage.emptyField }
    if (password.length > 20) return { password: fieldsValidationMessage.maxLength(20) }
    if (password.length < 4) return { password: fieldsValidationMessage.minLength(4) }
    return false
}
