const fieldsValidationMessage = {
    emptyField: "заполните поле",
    emptyName: "укажите имя пользователя",
    maxLength: (length: number) => `должно быть не более ${length} символов`,
    minLength: (length: number) => `должно быть не менее ${length} символов`,
}

export default fieldsValidationMessage
