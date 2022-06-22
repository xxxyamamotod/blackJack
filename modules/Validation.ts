type ValidationAndResult<T> = {
    validation: () => boolean
    result: T
}

export default class Validation<T> {
    private validationAndResults: ValidationAndResult<T>[] = []

    public constructor(validationAndResults: ValidationAndResult<T>[] = []) {
        this.validationAndResults = validationAndResults
    }

    public next = (validation: () => boolean, result: T): Validation<T> =>
        new Validation(this.validationAndResults.concat({ validation, result }))

    private doesFailValidation = (target: {
        validation: () => boolean
    }): boolean => !target.validation()

    public result = (defaultResult: T): T =>
        this.validationAndResults.find(this.doesFailValidation)?.result ??
        defaultResult
}
