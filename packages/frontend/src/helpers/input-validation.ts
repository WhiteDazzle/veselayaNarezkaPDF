import {emailValidationPattern} from './vars/patterns'

export const validateEmail = (value:string) => {
    if (value.length < 1) return 'обязательно поле'
    if(!value.toLowerCase()
        .match(
            emailValidationPattern
        )) return 'несуществующий email'
    return ''
}

export const validatePassword = (value:string) => {
    if (value.length < 1) return 'обязательно поле'
    if (value.length < 6) return 'пароль должен содержать не меньше 6 символов'
    if (value.length > 40) return 'пароль должен содержать не боее 40 символов'
    return ''
}