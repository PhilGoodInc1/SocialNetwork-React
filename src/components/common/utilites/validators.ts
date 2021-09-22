export type  FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'Field is required'
};

export const maxLength  = (max: number) : FieldValidatorType => (value) => {
    if (value && value.length > max) return `Must be ${max} characters or less`;
    return undefined
};