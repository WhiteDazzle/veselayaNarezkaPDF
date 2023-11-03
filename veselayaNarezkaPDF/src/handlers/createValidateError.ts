export const createValidateError = (...ars: Array<{[key: string]: string} | false>) => {
    return {
        errors: ars.reduce((errors, currentValue) => {
            if (currentValue === false) return errors
            return {...errors, ...currentValue}
        }, {})
    }
}
